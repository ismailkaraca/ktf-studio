'use strict';
const CURATED={
 '9786057225924': ['Dijital baba dan mesaj var','Orhan Toker','https://orhantoker.com/kitaplar/dijital-babadan-mesaj-var','https://orhantoker.com/img-op/kitap-mesaj-var-640.webp'],
 '9786059114752': ['Dijital dunyada anne baba olmak','Orhan Toker','https://orhantoker.com/kitaplar/dijital-dunyada-anne-baba-olmak','https://orhantoker.com/img-op/kitap-anne-baba-640.webp'],
 '9786257463942': ['Dijital dedektifler 1','Orhan Toker','https://orhantoker.com/kitaplar/dijital-dedektifler-1-kamera-arkasi','https://orhantoker.com/img-op/kitap-dijital-dedektifler-1-kamera-arkasi-640.webp'],
 '9786257463959': ['Oyunun sonu','Orhan Toker','https://orhantoker.com/kitaplar/dijital-dedektifler-2-oyunun-sonu','https://orhantoker.com/img-op/kitap-dijital-dedektifler-2-oyunun-sonu-640.webp'],
 '9786257463966': ['Sosyal maskara','Orhan Toker','https://orhantoker.com/kitaplar/dijital-dedektifler-3-sosyal-maskara','https://orhantoker.com/img-op/kitap-dijital-dedektifler-3-sosyal-maskara-640.webp']
};
const imageHosts=new Set(['orhantoker.com','covers.openlibrary.org','books.google.com','books.googleusercontent.com','lh3.googleusercontent.com']);
function norm(v){return String(v||'').toLocaleLowerCase('tr-TR').replace(/[^a-z0-9\p{L}]+/gu,' ').trim().split(/\s+/).filter(x=>x.length>1)}
function matches(a,b){const w=norm(a),x=norm(b);return w.length&&x.length&&w.filter(k=>x.includes(k)).length>=Math.max(1,Math.ceil(w.length*.6))}
function authorMatch(a,b){const w=norm(a),x=norm(Array.isArray(b)?b.join(' '):b);return w.length&&x.length&&w.some(k=>x.includes(k))&&x.some(k=>w.includes(k))}
function checkIsbn(raw){const n=String(raw||'').replace(/[\s-]/g,'');if(!/^\d{13}$/.test(n))return '';const z=[...n].map(Number),v=z.slice(0,12).reduce((s,x,i)=>s+x*(i%2?3:1),0);return (10-v%10)%10===z[12]?n:''}
async function get(url,image=false){
 const allowed=image?imageHosts:new Set(['openlibrary.org','www.googleapis.com']);
 let next=new URL(url);
 for(let i=0;i<3;i++){
  if(next.protocol!=='https:'||!allowed.has(next.hostname))throw Error('Untrusted source');
  const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),6500);
  try{
   const r=await fetch(next.toString(),{redirect:'manual',signal:ctl.signal,headers:{'User-Agent':'Kutuphane-Gorsel-Atolyesi/1.1'}});
   if([301,302,303,307,308].includes(r.status)){const loc=r.headers.get('location');if(!loc)throw Error('Redirect error');next=new URL(loc,next);continue}
   if(!r.ok)throw Error('HTTP '+r.status);
   if(!image)return r.json();
   const type=(r.headers.get('content-type')||'').split(';')[0].toLowerCase();
   if(!['image/png','image/jpeg','image/webp'].includes(type))throw Error('Non-image response');
   if(+(r.headers.get('content-length')||0)>900000)throw Error('Image too large');
   const reader=r.body.getReader();let size=0;const chunks=[];
   while(true){const p=await reader.read();if(p.done)break;size+=p.value.byteLength;if(size>900000){await reader.cancel();throw Error('Image too large')}chunks.push(Buffer.from(p.value))}
   if(size<1700)throw Error('Missing image');
   const b=Buffer.concat(chunks,size);const jpg=b[0]===255&&b[1]===216, png=b[0]===137&&b[1]===80, webp=b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP';
   if(!(jpg||png||webp))throw Error('Invalid image bytes');
   return 'data:'+type+';base64,'+b.toString('base64');
  }finally{clearTimeout(timer)}
 }
 throw Error('Redirect limit');
}
async function lookup(b){
 const isbn=checkIsbn(b.isbn);if(!isbn)return {status:'not_found',reason:'ISBN-13 geçersiz veya eksik.'};
 const choices=[],fixed=CURATED[isbn];
 if(fixed&&matches(b.title,fixed[0])&&authorMatch(b.author,fixed[1]))choices.push({url:fixed[3],source:fixed[2],label:'Yazarın resmî kitap sayfası'});
 try{
  const record=await get('https://openlibrary.org/isbn/'+isbn+'.json');
  if((record.isbn_13||[]).includes(isbn)&&matches(b.title,record.title)&&record.covers?.length)choices.push({url:'https://covers.openlibrary.org/b/id/'+record.covers[0]+'-L.jpg?default=false',source:'https://openlibrary.org/isbn/'+isbn,label:'Open Library – doğrulanmış ISBN'});
 }catch(e){}
 try{
  const info=await get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn+'&maxResults=6');
  for(const x of info.items||[]){const v=x.volumeInfo||{},codes=v.industryIdentifiers||[],im=v.imageLinks||{};
   if(!codes.some(k=>String(k.identifier).replace(/[\s-]/g,'')===isbn)||!matches(b.title,v.title)||!authorMatch(b.author,v.authors))continue;
   const url=im.extraLarge||im.large||im.medium||im.small||im.thumbnail;
   if(url){choices.push({url:url.replace(/^http:/,'https:'),source:'https://books.google.com/books?id='+encodeURIComponent(x.id),label:'Google Books – ISBN / yazar / başlık doğrulandı'});break}
  }
 }catch(e){}
 for(const c of choices){try{const data=await get(c.url,true);return {status:'verified',data,source:c.source,imageUrl:c.url,label:c.label}}catch(e){}}
 return {status:'not_found',reason:'Gerçek kapak dosyasına doğrulanarak erişilemedi.'}
}
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Yalnız POST desteklenir.'});
 const books=req.body?.books;
 if(!Array.isArray(books)||books.length<1||books.length>6||books.some(b=>!b||typeof b.isbn!=='string'||b.isbn.length>40||typeof b.title!=='string'||b.title.length>250||typeof b.author!=='string'||b.author.length>200))return res.status(400).json({error:'1–6 doğrulanabilir kitap gönderin.'});
 const results=await Promise.all(books.map(b=>lookup(b).catch(()=>({status:'not_found',reason:'Kaynağa erişilemedi.'}))));
 return res.status(200).json({results});
};
module.exports._test={checkIsbn,matches,authorMatch};
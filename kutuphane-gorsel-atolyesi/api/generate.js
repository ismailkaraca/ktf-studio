const crypto = require('node:crypto');
const VALID_MODES = new Set(['caption','background']);
function safeStr(s,n=200){return String(s??'').trim().slice(0,n);}
function equalSecret(a,b){const x=Buffer.from(a||''),y=Buffer.from(b||'');return x.length===y.length&&x.length>0&&crypto.timingSafeEqual(x,y);}
module.exports = async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Yalnız POST destekleniyor.'});
 if(!process.env.OPENAI_API_KEY||!process.env.STUDIO_ACCESS_CODE)return res.status(503).json({error:'AI üretimi henüz etkinleştirilmedi. Vercel ortamına OPENAI_API_KEY ve STUDIO_ACCESS_CODE eklenmeli.'});
 if(!equalSecret(req.headers['x-studio-access-code'],process.env.STUDIO_ACCESS_CODE))return res.status(401).json({error:'Stüdyo erişim kodu yanlış.'});
 const body=req.body||{},mode=body.mode;
 if(!VALID_MODES.has(mode))return res.status(400).json({error:'Geçersiz üretim türü.'});
 const book={title:safeStr(body.book?.title,220),author:safeStr(body.book?.author,160),call:safeStr(body.book?.call,75),section:safeStr(body.book?.section,100)};
 const library=safeStr(body.library,120),note=safeStr(body.note,800),template=safeStr(body.template,30);
 if(!book.title||!book.call||!library)return res.status(400).json({error:'Kütüphane adı, kitap adı ve yer numarası gereklidir.'});
 const controller=new AbortController();const stop=setTimeout(()=>controller.abort(),105000);
 try{
 if(mode==='caption'){
 const prompt=`Aşağıdaki katalog kaydı için kütüphanenin ağzından, Türkçe, sıcak ama profesyonel, 45–70 kelimelik sosyal medya paylaşım metni hazırla. Kitabın içeriği bilinmediği için konu, olay örgüsü, ödül, yaş aralığı, etkinlik ve müsaitlik uydurma. Kitap adını ve yazarını doğru kullan. Raf yönlendirmesini tam olarak koru. Emoji ölçülü. Sadece hazır paylaşım metnini döndür.\nKütüphane: ${library}\nEser: ${book.title}\nYazar: ${book.author}\nYer numarası: ${book.call}\nBölüm: ${book.section}\nKullanıcının doğrulanmış notu: ${note||'Yok'}`;
 const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_TEXT_MODEL||'gpt-4.1-mini',input:prompt,max_output_tokens:350}),signal:controller.signal});const json=await r.json();if(!r.ok)throw Error(json.error?.message||'Metin modeli hatası');const text=json.output_text||json.output?.flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('')||'';if(!text)throw Error('Modelden metin alınamadı.');return res.status(200).json({text});}
 const prompt=`Professional, warm, whimsical and inviting illustrated editorial poster BACKGROUND ONLY, library interior full of books and magical paper flourishes. Theme: ${template==='comic'?'educational graphic novel panels and playful storytelling':template==='mindmap'?'whimsical learning diagram decorations':template==='flashcards'?'bright educational visual tiles':template==='shelf'?'library shelves and colorful books':'children and adults enjoying a welcoming public library'}. High quality hand drawn children's book inspired illustration, turquoise, cream, peach, sage accents. IMPORTANT: ZERO writing, zero typography, no letters, no logos, no watermarks, no mock book covers. Leave uncluttered space in the central parts and top for a separate HTML text overlay. Portrait 3:4 composition. Decorative background only. The book title provided is context, never print it. No specific person's likeness.`;
 const r=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_IMAGE_MODEL||'gpt-image-1',prompt,size:'1024x1536',quality:'medium',n:1,output_format:'png'}),signal:controller.signal});const json=await r.json();if(!r.ok)throw Error(json.error?.message||'Görsel modeli hatası');const b64=json.data?.[0]?.b64_json;if(!b64)throw Error('Modelden görsel alınamadı.');return res.status(200).json({image:'data:image/png;base64,'+b64});
 }catch(e){return res.status(502).json({error:e?.name==='AbortError'?'İşlem zaman aşımına uğradı.':`AI isteği başarısız: ${String(e.message||e).slice(0,250)}`});}finally{clearTimeout(stop);}
};

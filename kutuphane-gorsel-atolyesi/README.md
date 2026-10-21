# Kütüphane Görsel Atölyesi — MVP

Kütüphanelerin prompt yazmadan Koha katalog dışa aktarımlarından (CSV, Excel ve `.sxc` uzantılı CSV) kitap seçip 3:4 poster, çizgi roman, zihin haritası, bilgi kartları veya Dewey raf rehberi üretebildiği web aracı.

## Yerelde çalıştırma

`npx serve .` ile klasörde sunucu başlatın ve tarayıcıda açın. PNG üretimi için html2canvas, XLSX okuma için SheetJS CDN'e erişim gerekir. Diğer bölümler CDN yoksa CSV ile çalışabilir.

## Vercel

Kaynak klasörü doğrudan Vercel'e deploy edilebilir. Framework gerekmez. `api/generate.js` Vercel Serverless Function olarak çalışır.

### Yapay zekâyı etkinleştirmek

Vercel > Project > Settings > Environment Variables alanından en az şu değerleri ekleyin:

- `OPENAI_API_KEY`: Sunucuda saklanacak API anahtarı (tarayıcıya asla koymayın).
- `STUDIO_ACCESS_CODE`: Kütüphanelerin AI üretiminden önce gireceği erişim kodu.

İsteğe bağlı: `OPENAI_TEXT_MODEL` (varsayılan `gpt-4.1-mini`) ve `OPENAI_IMAGE_MODEL` (varsayılan `gpt-image-1`).

**Uyarı:** Paylaşılan erişim kodu temel bir korumadır; herkese açık geniş ölçekte kullanım için kütüphane bazlı kimlik doğrulama, bütçe/kota, sunucu tarafı oran sınırlaması ve işlem kaydı gereklidir. API ücretleri ChatGPT Plus aboneliğine dahil değildir.

## Dosya yapısı

- `index.html`: Kullanıcı arayüzü
- `app.js`: CSV/XLSX içe aktarımı, şablonlar ve çıktı
- `styles.css`: Arayüz ve 900 × 1200 afiş tasarımları
- `api/generate.js`: OpenAI metin ve illüstrasyon uç noktası
- `ornek-katalog.csv`: Örnek Koha kayıtları

## Veri ilkeleri

- Katalog bilgileri HTML üst katmanda, değişmez olarak gösterilir; AI bunları tekrar üretmez.
- Kitap kapakları kullanıcı tarafından dosyadan eklenir; yer yoksa açıkça `KAPAK EKLENMEDİ` görünür. Gerçek gibi kapak uydurulmaz.
- Üye kişisel verisi AI'a gönderilmez; yalnız seçili kitabın başlık/yazar/yer numarası ve kütüphane adı gönderilir.
- Dewey ana sınıfları için kullanıcı tarafından bildirilen sabit HEX renkleri kullanılır.
- Türkçe CSV (`windows-1254`) kodlaması için tarayıcıda geri dönüş çözümleme vardır.


## ChatGPT hesabıyla çalışmak (kodsuz yönlendirme)

Ekim 2026 sürümünde kullanıcılar katalogdan kitap ve şablon seçip **ChatGPT'de metin oluştur** veya **ChatGPT'de görsel oluştur** bağlantısını açabilir. Uygulama, kitap adları, yazarlar, ISBN, tam yer numaraları, Dewey HEX renkleri ve kütüphane adını içeren Türkçe istemi kendisi hazırlar. Giriş, ChatGPT'nin kendi sayfasında gerçekleşir. Kullanıcı istemi gözden geçirip **Gönder** düğmesine basar. Yanıt ChatGPT içinde oluşur; Vercel uygulamasına otomatik dönmez. Bu özellik **OpenAI OAuth / Sign in with ChatGPT değildir** ve API anahtarı gerektirmez.

OpenAI açık kaynak ChatGPT plan kullanımı (OAuth) için resmî kılavuz, yerel uygulamaları ve kullanıcı tarafından barındırılan ortamlardaki akışı tanımlar. Merkezi sunucuda çalışan Vercel uygulamalarını bu akışla otomatik yetkilendirilmiş saymaz. Ayrıca açık kaynak plan kullanımında `image_generation` desteklenmediği belgelenmiştir. Bakınız: https://developers.openai.com/siwc/token-sharing-open-source ve https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations.

Sitede doğrudan sonuç almak isteyen yönetici için `/api/generate` üzerinden mevcut server-side API ve erişim kodu yöntemi korunur. Kullanıcının ChatGPT aboneliği bu API'yi finanse etmez. Uygulama, URL'ye yalnızca seçilen katalog künyesini ve kütüphanecinin yazdığı ek notu ekler. Üye bilgisi ya da gizli veri eklemeyin; adres çubuğuna eklenen istem tarayıcı geçmişinde bulunabilir.

## ISBN ile gerçek kapak dosyasını otomatik bulma

Yeni /api/covers servisi ISBN-13 sağlama kontrolü, yazar ve kitap adı eşleşmesi yapar. Orhan Toker'in beş örnek kitabı resmî yazar sayfalarındaki kapak URL'lerine bağlanmıştır. Başka ISBN'lerde Open Library ve Google Books basım eşleşmeleri denenir. Kapak gerçekte indirilebiliyorsa JPEG/WEBP/PNG özgün baytları veri URI'si olarak tasarıma eklenir ve PNG'ye doğrudan aktarılır; AI kapağı çizmez. Bulunamayan kitapta nötr silüet kullanılır. Yeni seçenek: ChatGPT'den alınan dekoratif arka planı ayrıca yükleyip üst katmandaki gerçek kapakları korumak. Haricî servislerin kullanılabilirliği ve lisans koşulları gözden geçirilmelidir.

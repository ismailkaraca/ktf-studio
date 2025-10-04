# Kütüphane ve Teknoloji Festivali Stüdyosu

Bu proje, 3. Uluslararası Kütüphane ve Teknoloji Festivali için hazırlanmış interaktif bir web uygulamasıdır. Katılımcılar telefonlarının veya bilgisayarlarının kamerasını kullanarak fotoğraf çekebilir, seçtikleri bir roman veya karakter temasıyla yapay zekâ tarafından sanatsal bir portre oluşturabilir ve sonrasında bu portreye uygun kısa bir hikâye yazdırabilirler.

## Özellikler

- **Kamera ve Fotoğraf Yükleme:** Kullanıcılar doğrudan tarayıcı üzerinden kamera ile fotoğraf çekebilir veya cihazlarından bir fotoğraf yükleyebilirler.
- **Tema Seçimi:** Hazır öneriler arasından seçim yapılabildiği gibi kullanıcılar kendi roman karakteri veya temalarını da girebilirler.
- **Yapay Zekâ ile Portre Oluşturma:** Yüklenen fotoğraf ve seçilen tema kullanılarak Google'ın Generative Language API'sı üzerinden sanatsal bir portre üretilir. (Not: API anahtarınızı `.env` dosyasına eklemeniz gerekir.)
- **Hikâye Oluşturma:** Üretilen portreye ve festival temalarına uygun kısa bir hikâye AI yardımıyla yazdırılabilir.
- **Paylaşım ve İndirme:** Oluşturulan görsel indirilebilir, sosyal medyada paylaşılabilir ve hikâye metni panoya kopyalanabilir.

## Kurulum

Bu depo bir [Create React App](https://create-react-app.dev/) projesidir. Vercel ücerinde otomatik olarak derlenip çalıştırılabilir, ancak projeyi yerel olarak test etmek isterseniz şu adımları izleyebilirsiniz:

```bash
git clone <repo-url>
cd ktf-studio
npm install

# Gerekli API anahtarlarını .env dosyasına ekleyin
echo "REACT_APP_GEMINI_API_KEY=<YOUR_API_KEY>" > .env

# Uygulamayı geliştirme modunda başlatın
npm start
```

Ardından tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görebilirsiniz.

## Deploy

Bu projeyi Vercel ücerine dağıtmak için GitHub deposunu Vercel paneline bağlamanız yeterlidir. Vercel, `npm install` ve `npm run build` adımlarını otomatik olarak çalıştırarak `build/` klasöründen statik dosyaları yayınlar.

Eğer API anahtarınız gibi ortam değişkenleri kullanıyorsanız, Vercel projesi içerisinde **Environment Variables** bölümünä eklemeyi unutmayın. Uygulama içerisinde API anahtarları varsayılan olarak boş bırakılmıştır ve gönderiler başarısız olacaktır.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.

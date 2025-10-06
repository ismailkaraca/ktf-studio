import React, { useState, useRef, useEffect } from 'react';
import { Camera, Zap, Upload, AlertTriangle, Download, Share2, BookOpen, BrainCircuit, Sparkles, Copy, RefreshCw, Languages } from 'lucide-react';

// --- Çeviri Metinleri ---
const translations = {
    en: {
        headerTitle: "Library and Technology Festival Studio",
        headerSubtitle: "This application was developed as part of the 3rd International Library and Technology Festival.",
        headerLink: "www.kutuphaneveteknoloji.com",
        step1Title: "Step 1: Choose Your Photo",
        cameraOff: "Camera is off or waiting for a photo",
        cameraErrorPermission: "Camera permission was denied. Please refresh the page, try again, and allow camera access in your browser settings.",
        cameraErrorStart: "Could not start the camera. Please try another browser or check your device.",
        fileReadError: "The selected file could not be read. Please try another photo.",
        retakeButton: "Retake/Re-upload",
        openCameraButton: "Open Camera",
        captureButton: "Take Photo",
        uploadButton: "Upload Photo",
        bestResultsHint: "For best results, please upload a photo with only one person and a clearly visible face.",
        step2Title: "Step 2: Define Your Style",
        promptLabel: "Enter your favorite novel or character:",
        inspirationLabel: "Or choose one for inspiration:",
        promptPlaceholder: "e.g., Mysterious like Sherlock Holmes...",
        generateButton: "Create Artistic Portrait",
        generateHint: "Let's transform your photo into an artistic portrait of your chosen novel character, blending it with themes of library and technology!",
        step3Title: "Step 3: Review the Result",
        resultPlaceholder: "Your generated image will appear here.",
        downloadButton: "Download Image",
        shareButton: "Share on Social Media",
        generateStoryButton: "✨ Write a Story for This Character",
        generatingStory: "Writing Story...",
        yourStory: "Your Story:",
        copyShareTextButton: "Copy Share Text",
        copyStoryShareTextButton: "Copy Text with Story",
        copyStoryButton: "Copy Story",
        toastCopied: "Text copied to clipboard!",
        toastCopyError: "Could not copy!",
        shareModalTitle: "Share on Social Media",
        shareModalInstagram: "For Instagram:",
        shareModalInstagramHint: "You can download the image and upload it manually from the Instagram app.",
        shareModalClose: "Close",
        loadingText1: "AI is designing your portrait...",
        loadingText2: "Adjusting colors and textures...",
        loadingText3: "Adding artistic brush strokes...",
        loadingText4: "Making the final magic touches...",
        loadingText5: "The AI is summoning its muses...",
        storyLoadingText1: "Words are coming together...",
        storyLoadingText2: "Giving the character a voice...",
        storyLoadingText3: "The plot is taking shape...",
        storyLoadingText4: "Adding literary touches...",
        storyLoadingText5: "Writing the final lines of the story...",
        errorGeneric: "An unexpected error occurred. Please try again.",
        errorQuota: "API usage quota has been exceeded. Please check the billing status of your Google AI project or try again later.",
        errorSafety: "Sorry, this content could not be created due to AI safety policies. Please try a different theme.",
        errorApiKey: "The API key is invalid. Please check the application's configuration.",
        errorNoImage: "Could not get a valid image from the AI.",
        errorNoStory: "Could not get a valid story from the API.",
        errorApiStop: (reason) => `API stopped generation. Reason: ${reason}`,
        errorNeedPhoto: "Please take a photo first.",
        errorNeedImage: "You must create an image first.",
        livePhotoTaken: "Photo taken. Please enter your favorite novel character.",
        liveGeneratingImage: "Generating image…",
        liveImageGenerated: "Your image has been successfully created.",
        shareText: (prompt) => `I'm at the 3rd International Library and Technology Festival${prompt ? `, as ${prompt}!` : '.'} You can create your own AI image at www.kutuphaneveteknoloji.com. #ltf #AtTheLibraryAndTechFestival`,
        shareTextWithStory: (prompt, story) => `I'm at the 3rd International Library and Technology Festival, as the character ${prompt}. You can also create your own AI image and story at www.kutuphaneveteknoloji.com. Here is my story:\n\n${story}\n\n#ltf #AtTheLibraryAndTechFestival`,
        imageOverlayLine1: (prompt) => `I'm also at the 3rd International Library and Technology Festival${prompt ? ` as ${prompt}!` : '.'}`,
        imageOverlayLine2: "You can create your own AI image by visiting www.kutuphaneveteknoloji.com.",
        allPrompts: [
            "Mysterious and intelligent like Sherlock Holmes", "A dystopian character from the novel 1984", "Captain Ahab from Moby Dick", "Adventurous like Don Quixote", "A Ghibli film character", "Romantic like Jane Eyre", "A Cyberpunk character", "Curious like Alice in Wonderland", "A Fremen from the Dune universe", "A Steampunk inventor", "Noble and wise like an elf", "Conflicted like Raskolnikov", "Thoughtful like The Little Prince",
        ],
        apiImagePrompt: (prompt) => `Create an artistic portrait inspired by the person in this photo. The theme of the portrait should be "${prompt}". The background should combine library and technology elements. The style should be like a non-photorealistic digital art piece.`,
        apiStoryPrompt: (prompt, festivalInfo) => `You are a creative storyteller. Using the festival information I will provide, write a short (max 3 paragraphs), captivating story in English featuring the character from the user's original prompt '${prompt}' and the generated image. The story should be set at the 3rd International Library and Technology Festival. It should align with the festival's main theme of "Producing Libraries," the atmosphere of the image, and the character's mood. Here is what you need to know about the festival: ${festivalInfo}`,
    },
    tr: {
        headerTitle: "Kütüphane ve Teknoloji Festivali Stüdyosu",
        headerSubtitle: "Bu uygulama 3. Uluslararası Kütüphane ve Teknoloji Festivali kapsamında geliştirilmiştir.",
        headerLink: "www.kutuphaneveteknoloji.com",
        step1Title: "Adım 1: Fotoğrafınızı Seçin",
        cameraOff: "Kamera kapalı veya fotoğraf bekleniyor",
        cameraErrorPermission: "Kamera izni reddedildi. Lütfen sayfanızı yenileyip tekrar deneyin ve tarayıcı ayarlarınızdan kamera erişimine izin verin.",
        cameraErrorStart: "Kamera başlatılamadı. Lütfen başka bir tarayıcı deneyin veya cihazınızı kontrol edin.",
        fileReadError: "Seçilen dosya okunamadı. Lütfen başka bir fotoğraf deneyin.",
        retakeButton: "Tekrar Çek/Yükle",
        openCameraButton: "Kamera Aç",
        captureButton: "Fotoğraf Çek",
        uploadButton: "Fotoğraf Yükle",
        bestResultsHint: "En iyi sonuçlar için lütfen sadece bir kişinin olduğu ve yüzünün net bir şekilde göründüğü bir fotoğraf yükleyin.",
        step2Title: "Adım 2: Tarzınızı Belirleyin",
        promptLabel: "En sevdiğiniz roman veya karakteri girin:",
        inspirationLabel: "Veya ilham almak için birini seçin:",
        promptPlaceholder: "Örn: Sherlock Holmes gibi gizemli bir havada...",
        generateButton: "Sanatsal Portre Oluştur",
        generateHint: "Yüklediğiniz fotoğrafı, kütüphane ve teknoloji temasıyla harmanlayarak seçtiğiniz roman karakterinin sanatsal bir portresine dönüştürelim!",
        step3Title: "Adım 3: Sonucu İnceleyin",
        resultPlaceholder: "Oluşturulan görseliniz burada görünecek.",
        downloadButton: "Görseli İndir",
        shareButton: "Sosyal Medyada Paylaş",
        generateStoryButton: "✨ Bu Karaktere Bir Hikaye Yaz",
        generatingStory: "Hikaye Yazılıyor...",
        yourStory: "Hikayeniz:",
        copyShareTextButton: "Paylaşım Metnini Kopyala",
        copyStoryShareTextButton: "Metni Hikaye İle Kopyala",
        copyStoryButton: "Hikayeyi Kopyala",
        toastCopied: "Metin panoya kopyalandı!",
        toastCopyError: "Kopyalanamadı!",
        shareModalTitle: "Sosyal Medyada Paylaş",
        shareModalInstagram: "Instagram için:",
        shareModalInstagramHint: "Görseli indirip, Instagram uygulamasından manuel olarak yükleyebilirsiniz.",
        shareModalClose: "Kapat",
        loadingText1: "Yapay zeka portrenizi tasarlıyor...",
        loadingText2: "Renkler ve dokular ayarlanıyor...",
        loadingText3: "Sanatsal fırça darbeleri ekleniyor...",
        loadingText4: "Son sihirli dokunuşlar yapılıyor...",
        loadingText5: "Yapay zeka ilham perilerini çağırıyor...",
        storyLoadingText1: "Kelimeler bir araya geliyor...",
        storyLoadingText2: "Karaktere bir ses veriliyor...",
        storyLoadingText3: "Olay örgüsü şekilleniyor...",
        storyLoadingText4: "Edebi dokunuşlar ekleniyor...",
        storyLoadingText5: "Hikayenin son satırları yazılıyor...",
        errorGeneric: "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.",
        errorQuota: "API kullanım kotası aşıldı. Lütfen Google AI projenizin faturalandırma durumunu kontrol edin veya daha sonra tekrar deneyin.",
        errorSafety: "Üzgünüz, yapay zeka güvenlik politikaları nedeniyle bu içerik oluşturulamadı. Lütfen farklı bir tema deneyin.",
        errorApiKey: "API anahtarı geçersiz. Lütfen uygulamanın yapılandırmasını kontrol edin.",
        errorNoImage: "Yapay zekadan geçerli bir görsel alınamadı.",
        errorNoStory: "API'den geçerli bir hikaye alınamadı.",
        errorApiStop: (reason) => `API üretimi durdurdu. Sebep: ${reason}`,
        errorNeedPhoto: "Lütfen önce bir fotoğraf çekin.",
        errorNeedImage: "Önce bir görsel oluşturmalısınız.",
        livePhotoTaken: "Fotoğraf alındı. Lütfen favori roman karakterinizi girin.",
        liveGeneratingImage: "Görsel oluşturuluyor…",
        liveImageGenerated: "Görseliniz başarıyla oluşturuldu.",
        shareText: (prompt) => `Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim${prompt ? `, hem de ${prompt} olarak!` : '.'} Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. #ktf #kutuphaneveteknolojifestivalindeyim`,
        shareTextWithStory: (prompt, story) => `Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim, hem de ${prompt} karakteriyle. Siz de festival kapsamında kendi yapay zeka görselinizi ve hikayenizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. Benim hikayem şöyle:\n\n${story}\n\n#ktf #kutuphaneveteknolojifestivalindeyim`,
        imageOverlayLine1: (prompt) => `Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim${prompt ? ` hem de ${prompt} olarak!` : '.'}`,
        imageOverlayLine2: "Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz.",
        allPrompts: [
            "Sherlock Holmes gibi gizemli ve zeki", "1984 romanından distopik bir karakter", "Moby Dick'ten Kaptan Ahab", "Don Kişot gibi maceraperest", "Bir Ghibli film karakteri", "Jane Eyre gibi romantik", "Cyberpunk bir karakter", "Alice Harikalar Diyarında gibi meraklı", "Dune evreninden bir Fremen", "Steampunk bir mucit", "Bir elf gibi asil ve bilge", "Raskolnikov gibi çatışmalı", "Küçük Prens gibi düşünceli",
        ],
        apiImagePrompt: (prompt) => `Bu fotoğraftaki kişiden ilham alarak sanatsal bir portre oluştur. Portrenin teması "${prompt}" olmalı. Arka plan, kütüphane ve teknoloji öğelerini birleştirmeli. Stil, fotogerçekçi olmayan bir dijital sanat eseri gibi olmalı.`,
        apiStoryPrompt: (prompt, festivalInfo) => `Yaratıcı bir hikaye anlatıcısısın. Sana vereceğim festival bilgilerini kullanarak, kullanıcının orijinal istemi olan '${prompt}' ve bu istemle oluşturulan görseldeki karakterden yola çıkarak, bu karakterin 3. Uluslararası Kütüphane ve Teknoloji Festivali'nde geçen kısa (en fazla 3 paragraflık), büyüleyici ve Türkçe bir hikayesini yaz. Hikaye, festivalin "Üreten Kütüphaneler" ana temasıyla, görseldeki atmosferle ve karakterin ruh haliyle uyumlu olsun. İşte festivalle ilgili bilmen gerekenler: ${festivalInfo}`,
    }
};

// --- Global Stil ve Yardımcı Fonksiyonlar ---

const GlobalStyles = () => (
    <style>{`
        :root {
            --safe-top: env(safe-area-inset-top, 0px);
        }
        .section {
            scroll-margin-top: calc(84px + var(--safe-top));
        }
        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
        
        .loading-container-interactive {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            width: 100%;
            height: 100%;
        }

        .ai-orb {
            position: relative;
            width: 128px;
            height: 128px;
            border-radius: 9999px;
            background: radial-gradient(circle, rgba(36, 27, 198, 0.6) 0%, rgba(36, 27, 198, 0.1) 70%);
            animation: orb-pulse 4s ease-in-out infinite;
        }

        .ai-orb-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #E8E8FF;
            animation: icon-fade 4s ease-in-out infinite;
        }

        .ai-orb-icon.icon-2 {
            animation-delay: 2s;
        }

        .orbiting-particle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            background-color: #bf24c6;
            border-radius: 9999px;
            box-shadow: 0 0 8px #bf24c6, 0 0 12px #bf24c6;
            animation: orbit 6s linear infinite;
        }
        .orbiting-particle:nth-child(2) { animation-duration: 8s; animation-delay: -2s; width: 4px; height: 4px; }
        .orbiting-particle:nth-child(3) { animation-duration: 5s; animation-delay: -3s; }
        .orbiting-particle:nth-child(4) { animation-duration: 10s; animation-delay: -1s; width: 8px; height: 8px; }

        @keyframes orb-pulse {
          50% { transform: scale(1.1); }
        }

        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        @keyframes icon-fade {
          0%, 49.99%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          10%, 40% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        .story-loading-cursor {
            display: inline-block;
            width: 10px;
            height: 1.2em;
            background-color: #bf24c6;
            margin-left: 8px;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        video {
            transform: scaleX(-1);
        }

    `}</style>
);

const getScrollBehavior = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
};


// --- Bileşenler ---

const Header = ({ t, language, setLanguage }) => (
    <header className="w-full text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-white/20 relative">
        <button 
            onClick={() => setLanguage(lang => lang === 'tr' ? 'en' : 'tr')}
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-black/20 text-white rounded-lg hover:bg-black/40 transition-all text-sm"
            aria-label={`Switch to ${language === 'tr' ? 'English' : 'Turkish'}`}
        >
            <Languages size={18} />
            {language === 'tr' ? 'EN' : 'TR'}
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-transparent bg-clip-text">
            {t.headerTitle}
        </h1>
        <p className="text-sm text-gray-300 mt-2">
           {t.headerSubtitle}
        </p>
        <a href="https://www.kutuphaneveteknoloji.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">
            {t.headerLink}
        </a>
    </header>
);

const CameraView = ({ onCapture, imageSrc, t }) => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [cameraError, setCameraError] = useState(null);

    const startCamera = async () => {
        setCameraError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setStream(stream);
        } catch (err) {
            console.error("Kamera erişim hatası:", err);
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                setCameraError(t.cameraErrorPermission);
            } else {
                setCameraError(t.cameraErrorStart);
            }
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            onCapture(dataUrl);
            stopCamera();
        }
    };
    
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onCapture(e.target.result);
                stopCamera();
            };
            reader.onerror = (err) => {
                console.error("Dosya okuma hatası:", err);
                setCameraError(t.fileReadError);
            };
            reader.readAsDataURL(file);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    useEffect(() => {
        return () => stopCamera();
    }, [stream]);

    const handleRetake = () => {
        setCameraError(null);
        onCapture(null, false);
    };

    return (
        <div id="cameraSection" className="section w-full p-4 border-2 border-dashed border-[#241bc6]/50 rounded-2xl bg-black/20 flex flex-col items-center gap-4">
            <h2 tabIndex="-1" className="text-xl font-bold text-center">{t.step1Title}</h2>
            <div className="w-full aspect-[9/16] md:aspect-video bg-black rounded-lg overflow-hidden relative">
                {imageSrc ? (
                    <img src={imageSrc} alt="Selected" className="w-full h-full object-contain" />
                ) : (
                    <>
                        <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}></video>
                        {!stream && <div className="absolute inset-0 flex items-center justify-center text-gray-400">{t.cameraOff}</div>}
                    </>
                )}
            </div>
            {cameraError && (
                 <div className="w-full p-3 my-2 bg-red-500/20 text-red-300 rounded-lg text-center text-sm flex items-center justify-center gap-2">
                    <AlertTriangle size={20} />
                    <span>{cameraError}</span>
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
                {imageSrc ? (
                    <>
                        <button onClick={handleRetake} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105">
                            <RefreshCw size={20} />
                            {t.retakeButton}
                        </button>
                    </>
                ) : (
                    <>
                        {!stream ? (
                            <button onClick={startCamera} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#241bc6] text-white rounded-lg hover:bg-[#3a32d1] transition-all transform hover:scale-105">
                                <Camera size={20} />
                                {t.openCameraButton}
                            </button>
                        ) : (
                            <button onClick={captureImage} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105">
                                <Zap size={20} />
                                {t.captureButton}
                            </button>
                        )}
                        <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105">
                            <Upload size={20} />
                            {t.uploadButton}
                        </button>
                    </>
                )}
            </div>
            
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/jpeg, image/png" className="hidden" />

            <p className="text-center text-xs text-gray-400 mt-2 max-w-md">
                {t.bestResultsHint}
            </p>
        </div>
    );
};

const PromptControls = React.forwardRef(({ onGenerate, imageSrc, t }, ref) => {
    const [prompt, setPrompt] = useState("");
    const [samplePrompts, setSamplePrompts] = useState([]);

    useEffect(() => {
        const shuffled = [...t.allPrompts].sort(() => 0.5 - Math.random());
        setSamplePrompts(shuffled.slice(0, 10));
    }, [imageSrc, t.allPrompts]);

    const handleSampleClick = (sample) => {
        setPrompt(sample);
    };

    return (
        <div id="characterInputSection" className="section w-full flex flex-col gap-4 p-4 border-2 border-dashed border-purple-500/50 rounded-2xl bg-black/20">
            <h2 tabIndex="-1" className="text-xl font-bold text-center">{t.step2Title}</h2>
            <div className="flex-grow flex flex-col">
                <label htmlFor="prompt" className="mb-2 font-semibold text-gray-200">{t.promptLabel}</label>
                <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">{t.inspirationLabel}</p>
                    <div className="flex flex-wrap gap-2">
                        {samplePrompts.map((sample, index) => (
                            <button key={index} onClick={() => handleSampleClick(sample)} disabled={!imageSrc} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {sample}
                            </button>
                        ))}
                    </div>
                </div>
                <textarea id="characterInput" ref={ref} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.promptPlaceholder} className="w-full flex-grow p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-[#bf24c6] text-white resize-none" rows="3" disabled={!imageSrc}></textarea>
                <button id="btnCreateArt" onClick={() => onGenerate('character', prompt)} disabled={!imageSrc || !prompt} className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                    <Zap size={20} /> {t.generateButton}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                   {t.generateHint}
                </p>
            </div>
        </div>
    );
});

const Toast = ({ message, type, onClose }) => { useEffect(() => { const timer = setTimeout(() => { onClose(); }, 3000); return () => clearTimeout(timer); }, [onClose]); const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'; return (<div className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>{message}</div>); };

const ShareModal = ({ shareText, onClose, onCopy, story, onCopyStoryShare, t }) => {
    const pageUrl = "https://www.kutuphaneveteknoloji.com/";
    const socialLinks = [
        { name: "X", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` },
        { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}` },
        { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
        { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}` },
        { name: "Telegram", url: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}` },
    ];
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4 text-center">{t.shareModalTitle}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map(link => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-lg transition-colors">{link.name}</a>
                    ))}
                </div>
                <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300 text-center">
                    <strong>{t.shareModalInstagram}</strong> {t.shareModalInstagramHint}
                </div>
                <button onClick={onCopy} className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors">{t.copyShareTextButton}</button>
                {story && (
                     <button onClick={onCopyStoryShare} className="mt-2 w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition-colors">{t.copyStoryShareTextButton}</button>
                )}
                <button onClick={onClose} className="mt-2 w-full text-gray-400 hover:text-white py-2">{t.shareModalClose}</button>
            </div>
        </div>
    );
};


const LoadingAnimation = ({ t }) => {
    const [loadingText, setLoadingText] = useState(t.loadingText1);
    
    useEffect(() => {
        const loadingMessages = [t.loadingText2, t.loadingText3, t.loadingText4, t.loadingText5];
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setLoadingText(loadingMessages[index]);
        }, 2000);

        return () => clearInterval(intervalId);
    }, [t]);

    return (
         <div className="loading-container-interactive">
            <div className="ai-orb">
                 <div className="orbiting-particle"></div>
                 <div className="orbiting-particle"></div>
                 <div className="orbiting-particle"></div>
                 <div className="orbiting-particle"></div>
                 <BookOpen size={48} className="ai-orb-icon icon-1" />
                 <BrainCircuit size={48} className="ai-orb-icon icon-2" />
            </div>
            <p className="font-semibold text-lg text-center text-gray-200">{loadingText}</p>
        </div>
    );
};

const StoryLoadingAnimation = ({ t }) => {
    const [loadingText, setLoadingText] = useState(t.storyLoadingText1);

    useEffect(() => {
        const loadingMessages = [t.storyLoadingText2, t.storyLoadingText3, t.storyLoadingText4, t.storyLoadingText5];
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setLoadingText(loadingMessages[index]);
        }, 2500);

        return () => clearInterval(intervalId);
    }, [t]);

    return (
        <div className="mt-4 text-center text-gray-300">
            <p>{loadingText}<span className="story-loading-cursor"></span></p>
        </div>
    );
};


const ImageOutput = ({ generatedImage, isLoading, error, userPrompt, onGenerateStory, story, isGeneratingStory, t }) => {
    const canvasRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const errorRef = useRef(null);
    const [toast, setToast] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    
    useEffect(() => {
        if (generatedImage && !isLoading && downloadButtonRef.current) {
             setTimeout(() => downloadButtonRef.current.focus({ preventScroll: true }), 100);
        }
    }, [generatedImage, isLoading]);

    useEffect(() => {
        if (error && errorRef.current) {
            setTimeout(() => errorRef.current.focus({ preventScroll: true }), 100);
        }
    }, [error]);

    const shareText = t.shareText(userPrompt);

    const drawTextAndBackground = (ctx, text, yPos, canvas, options = {}) => {
        const { width } = canvas;
        const { customFontSize = null } = options;
        const padding = width * 0.05;
        const maxWidth = width - (padding * 2);
        let fontSize;
        if (customFontSize) {
            fontSize = customFontSize;
        } else {
            fontSize = Math.max(16, Math.min(30, Math.round(width / 35)));
        }
        const lineHeight = fontSize * 1.3;
        ctx.font = `bold ${fontSize}px "Inter", Arial, sans-serif`;
        ctx.textAlign = 'center';
        const x = width / 2;
        
        const words = text.split(' ');
        let line = '';
        const lines = [];
        for (const word of words) {
            const testLine = line + word + ' ';
            if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
                lines.push(line.trim());
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());
        
        const textBlockHeight = lines.length * lineHeight;
        const verticalPadding = lineHeight * 0.3; 
    
        const rectHeight = textBlockHeight + (verticalPadding * 2);
        const rectY = yPos - rectHeight; 
        const startY = rectY + verticalPadding;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, rectY, width, rectHeight);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.textBaseline = 'top';
        lines.forEach((l, index) => {
            const currentY = startY + (index * lineHeight);
            ctx.strokeText(l, x, currentY);
            ctx.fillText(l, x, currentY);
        });
        
        const gap = 15;
        return rectHeight + gap;
    };

    
    useEffect(() => {
         if (generatedImage && !isLoading && canvasRef.current) { 
             const canvas = canvasRef.current; 
             const ctx = canvas.getContext('2d'); 
             const img = new Image(); 
             img.src = generatedImage; 
             img.onload = () => { 
                canvas.width = img.width; 
                canvas.height = img.height; 
                ctx.drawImage(img, 0, 0); 

                const overlayTexts = { 
                    line1: t.imageOverlayLine1(userPrompt),
                    line2: t.imageOverlayLine2
                }; 
                const bottomMargin = canvas.height * 0.05; 
                const smallerFontSize = Math.max(10, Math.round(canvas.width / 55)); 
         
                const block2Height = drawTextAndBackground(ctx, overlayTexts.line2, canvas.height - bottomMargin, canvas, { customFontSize: smallerFontSize });
                drawTextAndBackground(ctx, overlayTexts.line1, canvas.height - bottomMargin - block2Height, canvas, {});
             }; 
        }
    }, [generatedImage, isLoading, userPrompt, t]);
    
    const handleShare = async () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error("Canvas to Blob conversion failed.");
                setToast({ message: 'Görsel paylaşılamadı.', type: 'error' });
                return;
            }

            const file = new File([blob], 'ktf-studyosu-gorsel.png', { type: 'image/png' });
            const shareData = {
                title: 'Kütüphane ve Teknoloji Festivali Stüdyosu',
                text: shareText,
                files: [file],
            };

            if (navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Paylaşım hatası:', err);
                    if (err.name !== 'AbortError') {
                       setShowShareModal(true);
                    }
                }
            } else {
                setShowShareModal(true);
            }
        }, 'image/png');
    };
    
    const copyToClipboard = (textToCopy) => {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            if (document.execCommand('copy')) {
                setToast({ message: t.toastCopied, type: 'success' });
                return true;
            }
            return false;
        } catch (err) {
            console.error('Kopyalama hatası:', err);
            setToast({ message: t.toastCopyError, type: 'error' });
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    };
    
    const handleCopyToClipboard = () => {
        copyToClipboard(shareText);
    };
    
    const handleCopyStory = () => {
        if (story) {
            copyToClipboard(story);
        }
    };

    const handleCopyStoryShareText = () => {
        const shareTextWithStory = t.shareTextWithStory(userPrompt, story);
        copyToClipboard(shareTextWithStory);
    };

    const downloadImage = () => { if (canvasRef.current) { const link = document.createElement('a'); link.href = canvasRef.current.toDataURL('image/png'); link.download = 'ktf-studio-image.png'; document.body.appendChild(link); link.click(); document.body.removeChild(link); } };


    return (
        <div id="resultSection" className="section w-full p-4 border-2 border-dashed border-[#bf24c6]/50 rounded-2xl bg-black/20 flex flex-col items-center justify-center min-h-[400px]">
            <h2 tabIndex="-1" className="text-xl font-bold text-center mb-4">{t.step3Title}</h2>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {showShareModal && <ShareModal 
                shareText={shareText} 
                onClose={() => setShowShareModal(false)} 
                onCopy={handleCopyToClipboard} 
                story={story}
                onCopyStoryShare={handleCopyStoryShareText}
                t={t}
            />}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                {isLoading && <LoadingAnimation t={t} />}
                {error && ( <div ref={errorRef} tabIndex="-1" role="alert" className="flex flex-col items-center gap-4 text-red-400 p-4"> <AlertTriangle size={48} /> <p className="text-center">{error}</p> </div> )}
                {generatedImage && !isLoading && ( <canvas ref={canvasRef} className="w-full h-full object-contain" /> )}
                {!isLoading && !error && !generatedImage && ( <div className="text-gray-400 text-center"> <p>{t.resultPlaceholder}</p> </div> )}
            </div>
             {generatedImage && !isLoading && (
                <div className="mt-4 flex flex-col items-center gap-4 w-full">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button ref={downloadButtonRef} onClick={downloadImage} className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105">
                            <Download size={20} /> {t.downloadButton}
                        </button>
                        <button onClick={handleShare} aria-label={t.shareButton} className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all transform hover:scale-105">
                            <Share2 size={20} /> {t.shareButton}
                        </button>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-2 justify-center max-w-md px-4 sm:px-0">
                        <button onClick={handleCopyToClipboard} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all text-sm flex-1">
                            <Copy size={16} /> {t.copyShareTextButton}
                        </button>
                        {story && (
                            <button onClick={handleCopyStoryShareText} className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all text-sm flex-1">
                                <Copy size={16} /> {t.copyStoryShareTextButton}
                            </button>
                        )}
                    </div>
                    
                    <button onClick={onGenerateStory} disabled={isGeneratingStory} className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait transform hover:scale-105">
                        <Sparkles size={20} className="text-yellow-300" /> 
                        {isGeneratingStory ? t.generatingStory : t.generateStoryButton}
                    </button>

                    {story && !isGeneratingStory && (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg w-full max-w-lg prose prose-invert prose-p:text-gray-300 relative">
                             <h4 className="font-bold text-lg text-white mb-2">{t.yourStory}</h4>
                             <p className="text-sm whitespace-pre-wrap">{story}</p>
                              <button onClick={handleCopyStory} className="absolute top-2 right-2 p-1.5 bg-gray-700/50 hover:bg-gray-600 rounded-md text-gray-300 hover:text-white transition-colors" aria-label={t.copyStoryButton}>
                                <Copy size={16} />
                            </button>
                        </div>
                    )}
                    {isGeneratingStory && <StoryLoadingAnimation t={t}/>}
                </div>
            )}
        </div>
    );
};


// --- Ana Uygulama ---

// Data URI'ı Blob'a dönüştürmek için yardımcı fonksiyon
function dataURItoBlob(dataURI) {
    // base64 verisini string olarak tutulan ham ikili verilere dönüştür
    const byteString = atob(dataURI.split(',')[1]);

    // mime bileşenini ayır
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // string'in baytlarını bir ArrayBuffer'a yaz
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}


export default function App() {
    const [language, setLanguage] = useState('tr');
    const [t, setT] = useState(translations.tr);
    
    const [imageSrc, setImageSrc] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [liveRegionText, setLiveRegionText] = useState("");
    const [story, setStory] = useState("");
    const [isGeneratingStory, setIsGeneratingStory] = useState(false);

    const promptInputRef = useRef(null);

    useEffect(() => {
        const userLang = navigator.language || navigator.userLanguage;
        const initialLang = userLang.startsWith('tr') ? 'tr' : 'en';
        setLanguage(initialLang);
    }, []);

    useEffect(() => {
        setT(translations[language]);
    }, [language]);

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileDevice = matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleCapture = (dataUrl, shouldScroll = true) => {
        setImageSrc(dataUrl);
        setGeneratedImage(null);
        setError(null);
        setStory("");

        if (isMobile && dataUrl && shouldScroll && promptInputRef.current) {
             const promptSection = document.getElementById('characterInputSection');
            if (promptSection) {
                setLiveRegionText(t.livePhotoTaken);
                setTimeout(() => {
                    promptSection.scrollIntoView({
                        behavior: getScrollBehavior(),
                        block: 'start'
                    });
                    setTimeout(() => {
                        promptInputRef.current.focus({ preventScroll: true });
                    }, 400); 
                }, 100);
            }
        }
    };

    const handleGenerateImage = async (mode, prompt) => {
        if (!imageSrc) { setError(t.errorNeedPhoto); return; }
        
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.scrollIntoView({
                behavior: getScrollBehavior(),
                block: 'start'
            });
        }
        
        setLiveRegionText(t.liveGeneratingImage);
        setUserPrompt(prompt);
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setStory("");

        // OpenRouter API Anahtarını Vercel Environment Variables'tan alır.
        // Vercel'de `REACT_APP_OPENROUTER_API_KEY` olarak tanımlanmalıdır.
        const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY || "";
        
        if (!apiKey) {
             handleApiError(new Error("API key not valid"), "Configuration");
             setIsLoading(false);
             return;
        }

        const apiUrl = `https://openrouter.ai/api/v1/images/edits`;
        
        const imageBlob = dataURItoBlob(imageSrc);
        const formData = new FormData();
        formData.append('image', imageBlob, 'input.jpg');
        // OpenRouter'da image-to-image destekleyen bir model seçin.
        // Örnek: 'stabilityai/stable-diffusion-xl-base-1.0'
        // Bu modelin OpenRouter projeniz için etkinleştirildiğinden emin olun.
        formData.append('model', 'stabilityai/stable-diffusion-xl-base-1.0');
        formData.append('prompt', t.apiImagePrompt(prompt));
        formData.append('response_format', 'b64_json');

        try {
            const response = await fetch(apiUrl, { 
                method: 'POST', 
                headers: { 
                    'Authorization': `Bearer ${apiKey}`,
                    // FormData kullandığımızda Content-Type tarayıcı tarafından otomatik eklenir.
                }, 
                body: formData 
            });

            if (!response.ok) { 
                const errorData = await response.json(); 
                throw new Error(errorData.error?.message || response.statusText);
            }
            const result = await response.json();
            
            const base64Data = result?.data?.[0]?.b64_json;

            if (base64Data) { 
                setGeneratedImage(`data:image/png;base64,${base64Data}`); 
                setLiveRegionText(t.liveImageGenerated); 
            } else { 
                console.error("OpenRouter response:", result);
                throw new Error(t.errorNoImage); 
            }
        } catch (err) {
            handleApiError(err, "Image Generation");
        } finally {
            setIsLoading(false);
        }
    };

     const handleGenerateStory = async () => {
        if (!generatedImage || !userPrompt) {
            setToast({ message: t.errorNeedImage, type: 'error' });
            return;
        }

        setIsGeneratingStory(true);
        setStory("");
        setError(null);

        // OpenRouter API Anahtarını Vercel Environment Variables'tan alır.
        // Vercel'de `REACT_APP_OPENROUTER_API_KEY` olarak tanımlanmalıdır.
        const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY || "";
        
        if (!apiKey) {
             handleApiError(new Error("API key not valid"), "Configuration");
             setIsGeneratingStory(false);
             return;
        }

        const apiUrl = `https://openrouter.ai/api/v1/chat/completions`;
        
        const festivalInfo = `The 3rd International Library and Technology Festival will be held between March 30 - April 5, 2026, at the Rami Library in Istanbul with the main theme of "Producing Libraries." The festival brings together technology and AI-based service producers, entrepreneurs, academics, and thousands of young people. The concept of a "producing library" aims to transform libraries into dynamic production centers that support the social, cultural, and technological development of individuals.`;

        const storyPrompt = t.apiStoryPrompt(userPrompt, festivalInfo);

        const payload = { 
            model: "google/gemini-flash-1.5", // OpenRouter'da bulunan hızlı bir model
            messages: [{ role: "user", content: storyPrompt }] 
        };

        try {
            const response = await fetch(apiUrl, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }, 
                body: JSON.stringify(payload) 
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || response.statusText);
            }
            const result = await response.json();
            const storyText = result.choices?.[0]?.message?.content;
            if (storyText) {
                setStory(storyText);
            } else {
                console.error("OpenRouter response:", result);
                throw new Error(t.errorNoStory);
            }
        } catch (err) {
            handleApiError(err, "Story Generation");
        } finally {
            setIsGeneratingStory(false);
        }
    };


    return (
        <div className="min-h-screen w-full bg-gray-900 text-white font-sans flex flex-col items-center gap-8 p-4">
            <GlobalStyles />
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {liveRegionText}
            </div>
            <Header t={t} language={language} setLanguage={setLanguage} />
            <main className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <CameraView onCapture={handleCapture} imageSrc={imageSrc} t={t} />
                    <PromptControls ref={promptInputRef} onGenerate={handleGenerateImage} imageSrc={imageSrc} t={t} />
                </div>
                <div className="flex flex-col">
                    <ImageOutput 
                        generatedImage={generatedImage} 
                        isLoading={isLoading} 
                        error={error} 
                        userPrompt={userPrompt}
                        onGenerateStory={handleGenerateStory}
                        story={story}
                        isGeneratingStory={isGeneratingStory}
                        t={t}
                     />
                </div>
            </main>
        </div>
    );
}


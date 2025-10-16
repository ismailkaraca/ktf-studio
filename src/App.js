import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Zap, Upload, AlertTriangle, Download, Share2, BookOpen, BrainCircuit, Sparkles, Copy, RefreshCw, Languages } from 'lucide-react';

// --- I18n Translations ---
const translations = {
  en: {
    appTitle: "Library and Technology Festival Studio",
    appSubtitle_part1: "This application was developed as part of the ",
    appSubtitle_link: "3rd International Library and Technology Festival",
    appSubtitle_part2: ".",
    appWebsite: "www.kutuphaneveteknoloji.com",
    languageToggle: "Türçe'ye Geç",
    step1Title: "Step 1: Choose Your Photo",
    cameraOff: "Camera is off or waiting for a photo",
    cameraPermissionError: "Camera permission denied. Please refresh the page, try again, and allow camera access in your browser settings.",
    cameraStartError: "Could not start camera. Please try another browser or check your device.",
    fileReadError: "Could not read the selected file. Please try another photo.",
    openCamera: "Open Camera",
    takePhoto: "Take Photo",
    uploadPhoto: "Upload Photo",
    retake: "Retake/Re-upload",
    photoTip: "For best results, please upload a photo of only one person with a clear view of their face.",
    step2Title: "Step 2: Define Your Style",
    promptLabel: "Enter your favorite novel or character:",
    promptInspiration: "Or choose one for inspiration:",
    promptPlaceholder: "e.g., Mysterious and atmospheric like Sherlock Holmes...",
    generateButton: "Create Artistic Portrait",
    generateTip: "Let's transform your photo into an artistic portrait of your chosen novel character, blending it with the theme of library and technology!",
    step3Title: "Step 3: Review Your Result",
    resultPlaceholder: "Your generated image will appear here.",
    downloadImage: "Download Image",
    shareOnSocial: "Share Image on Social Media",
    yourStory: "Behold, Your Legend!",
    copyStory: "Copy Story",
    copyImageShareText: "Copy Share Text",
    copyStoryShareText: "Copy Story Text",
    loadingImage: "AI is designing your portrait...",
    loadingImageMessages: ["Adjusting colors and textures...","Adding artistic brush strokes...","Making final magical touches...","The AI is summoning its muses..."],
    loadingStory: "Please wait... Writing a story for your character...",
    autoStoryLoadingMessages: ["Are you curious what your character would feel at the festival?","A literary universe is being created...","The final lines are being penned..."],
    errorPrefix: "An error occurred: ",
    imageGenerationError: "The AI could not create this image. Please try a different theme or a clearer photo.",
    safetyError: "Sorry, the AI has restrictions on creating realistic images involving people. Your request could not be processed. Please try a more artistic theme.",
    invalidResponseError: "Could not get a valid image from the AI.",
    noImageError: "The AI could not detect a clear face in this photo. Please try a different or clearer photo.",
    storyGenerationError: "Sorry, a special story for this character could not be written. Please try again.",
    storyNeedsImageError: "You must create an image first.",
    imageGeneratedSuccess: "Your image has been successfully created.",
    generateStoryPrompt: "Curious what this character would feel at the festival?",
    generateStoryButton: "Create Their Story",
    textCopied: "Text copied to clipboard!",
    copyError: "Could not copy!",
    shareModalTitle: "Share on Social Media",
    instagramTip: "For Instagram: Download the image and upload it manually from the Instagram app.",
    copyShareText: "Copy Share Text",
    copyShareTextWithStory: "Copy Share Text with Story",
    close: "Close",
    shareText: "I'm at the 3rd International Library and Technology Festival, as \"{prompt}\". Visit www.kutuphaneveteknoloji.com to create your own AI image for the festival. #ktf #kutuphaneveteknolojifest",
    shareTextWithStory: "\"{prompt}\" (Generated image). Visit www.kutuphaneveteknoloji.com to create your own AI image and story for the festival. #ktf #kutuphaneveteknolojifest\n\nHere is my story:\n{story}",
    canvasLine1: "I'm at the 3rd Int'l Library & Technology Festival, as {prompt}!",
    canvasLine2: "Create your own AI image for the festival at www.kutuphaneveteknoloji.com",
    imagePrompt: `Create an artistic portrait of a character inspired by {prompt}. The character should be in a library with technology elements like glowing books, floating data streams, digital displays. Style: digital fantasy art, vibrant, non-photorealistic, highly detailed.`,
    storyPrompt: `You are a creative storyteller. Using the festival information I will provide, write a short (max 3 paragraphs), captivating story in English about the character from the generated image, based on the user's original prompt: '{prompt}'. The story should take place at the 3rd International Library and Technology Festival. The story must be consistent with the festival's main theme of "Producing Libraries", the atmosphere of the image, and the character's mood. Here's what you need to know about the festival: {festivalInfo}`,
    samplePrompts: ["Mysterious and clever like Sherlock Holmes", "A dystopian character from the novel 1984", "Captain Ahab from Moby Dick", "Adventurous like Don Quixote", "A Ghibli film character", "Romantic like Jane Eyre", "A Cyberpunk character", "Curious like Alice in Wonderland", "A Fremen from the Dune universe", "A Steampunk inventor", "Noble and wise like an elf", "Conflicted like Raskolnikov", "Thoughtful like The Little Prince"],
  },
  tr: {
    appTitle: "Kütüphane ve Teknoloji Festivali Stüdyosu",
    appSubtitle_part1: "Bu uygulama ",
    appSubtitle_link: "3. Uluslararası Kütüphane ve Teknoloji Festivali",
    appSubtitle_part2: " kapsamında geliştirilmiştir.",
    appWebsite: "www.kutuphaneveteknoloji.com",
    languageToggle: "Switch to English",
    step1Title: "Adım 1: Fotoğrafınızı Seçin",
    cameraOff: "Kamera kapalı veya fotoğraf bekleniyor",
    cameraPermissionError: "Kamera izni reddedildi. Lütfen sayfanızı yenileyip tekrar deneyin ve tarayıcı ayarlarınızdan kamera erişimine izin verin.",
    cameraStartError: "Kamera başlatılamadı. Lütfen başka bir tarayıcı deneyin veya cihazınızı kontrol edin.",
    fileReadError: "Seçilen dosya okunamadı. Lütfen başka bir fotoğraf deneyin.",
    openCamera: "Kamera Aç",
    takePhoto: "Fotoğraf Çek",
    uploadPhoto: "Fotoğraf Yükle",
    retake: "Tekrar Çek/Yükle",
    photoTip: "En iyi sonuçlar için lütfen sadece bir kişinin olduğu ve yüzünün net bir şekilde göründüğü bir fotoğraf yükleyin.",
    step2Title: "Adım 2: Tarzınızı Belirleyin",
    promptLabel: "En sevdiğiniz roman veya karakteri girin:",
    promptInspiration: "Veya ilham almak için birini seçin:",
    promptPlaceholder: "Örn: Sherlock Holmes gibi gizemli bir havada...",
    generateButton: "Sanatsal Portre Oluştur",
    generateTip: "Yüklediğiniz fotoğrafı, kütüphane ve teknoloji temasıyla harmanlayarak seçtiğiniz roman karakterinin sanatsal bir portresine dönüştürelim!",
    step3Title: "Adım 3: Sonucu İnceleyin",
    resultPlaceholder: "Oluşturulan görseliniz burada göründecek.",
    downloadImage: "Görseli İndir",
    shareOnSocial: "Görseli Sosyal Medyada Paylaş",
    yourStory: "İşte Senin Efsanen!",
    copyStory: "Hikayeyi Kopyala",
    copyImageShareText: "Paylaşım Metnini Kopyala",
    copyStoryShareText: "Hikaye Metnini Kopyala",
    loadingImage: "Yapay zeka portrenizi tasarlıyor...",
    loadingImageMessages: ["Renkler ve dokular ayarlanıyor...","Sanatsal fırça darbeleri ekleniyor...","Son sihirli dokunuşlar yapılıyor...","Yapay zeka ilham perilerini çağırıyor..."],
    loadingStory: "Lütfen bekleyin... Karakterinize hikaye yazılıyor...",
    autoStoryLoadingMessages: ["Karakterinizin festivale katılsa neler hissedebileceğini merak ediyor musunuz?", "Edebi bir evren yaratılıyor...", "Son satırlar kaleme alınıyor..."],
    errorPrefix: "Bir hata oluştu: ",
    imageGenerationError: "Yapay zeka bu görseli oluşturamadı. Lütfen farklı bir tema veya daha net bir fotoğraf deneyin.",
    safetyError: "Üzgünüz, yapay zeka insan içeren gerçekçi görseller oluşturma konusunda kısıtlamalara sahip. Bu nedenle isteğiniz işlenemedi. Lütfen daha sanatsal bir tema deneyin.",
    invalidResponseError: "Yapay zekadan geçerli bir görsel alınamadı.",
    noImageError: "Yapay zeka bu fotoğrafta net bir yüz algılayamadı. Lütfen farklı veya daha net bir fotoğraf deneyin.",
    storyGenerationError: "Üzgünüz, bu karaktere özel bir hikaye yazılamadı. Lütfen tekrar deneyin.",
    storyNeedsImageError: "Önce bir görsel oluşturmalısınız.",
    imageGeneratedSuccess: "Görseliniz başarıyla oluşturuldu.",
    generateStoryPrompt: "Bu karakterin festivalde neler hissedebileceğini merak ediyor musun?",
    generateStoryButton: "Hikayesini Oluştur",
    textCopied: "Metin panoya kopyalandı!",
    copyError: "Kopyalanamadı!",
    shareModalTitle: "Sosyal Medyada Paylaş",
    instagramTip: "Instagram için: Görseli indirip, Instagram uygulamasından manuel olarak yükleyebilirsiniz.",
    copyShareText: "Paylaşım Metnini Kopyala",
    copyShareTextWithStory: "Paylaşım Metnini Hikaye İle Kopyala",
    close: "Kapat",
    shareText: "Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim, hem de \"{prompt}\". Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. #ktf #kutuphaneveteknolojifest",
    shareTextWithStory: "\"{prompt}\" (Oluşturulan görsel). Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. #ktf #kutuphaneveteknolojifest\n\nİşte benim hikayem:\n{story}",
    canvasLine1: "Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim. Hem de {prompt} olarak!",
    canvasLine2: "Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz.",
    imagePrompt: `{prompt} karakterinin sanatsal portresi. Kütüphane ve teknoloji öğeleri olan ortamda. Stil: dijital fantezi sanat, canlı, fotogerçekçi olmayan, çok detaylı.`,
    storyPrompt: `Yaratıcı bir hikaye anlatıcısısın. Sana vereceğim festival bilgilerini kullanarak, kullanıcının orijinal istemi olan '{prompt}' ve bu istemle oluşturulan görseldeki karakterden yola çıkarak, bu karakterin 3. Uluslararası Kütüphane ve Teknoloji Festivali'nde geçen kısa (en fazla 3 paragraflık), büyüleyici ve Türkçe bir hikayesini yaz. Hikaye, festivalin "Üreten Kütüphaneler" ana temasıyla, görseldeki atmosferle ve karakterin ruh haliyle uyumlu olsun. İşte festivalle ilgili bilmen gerekenler: {festivalInfo}`,
    samplePrompts: ["Sherlock Holmes gibi gizemli ve zeki", "1984 romanından distopik bir karakter", "Moby Dick'ten Kaptan Ahab", "Don Quixote gibi maceraperest", "Bir Ghibli film karakteri", "Jane Eyre gibi romantik", "Cyberpunk bir karakter", "Alice Harikalar Diyarında gibi meraklı", "Dune evreninden bir Fremen", "Steampunk bir mucit", "Bir elf gibi asil ve bilge", "Raskolnikov gibi çatışmalı", "Küçük Prens gibi düşünceli"],
  }
};

const GlobalStyles = () => (
    <style>{`
        :root { --safe-top: env(safe-area-inset-top, 0px); }
        .section { scroll-margin-top: calc(84px + var(--safe-top)); }
        .loading-container-interactive { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; width: 100%; height: 100%; }
        .spinner {
            width: 64px;
            height: 64px;
            border: 8px solid rgba(255, 255, 255, 0.2);
            border-top-color: #bf24c6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        video { transform: scaleX(-1); }
    `}</style>
);

const getScrollBehavior = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
};

const Header = ({ t, toggleLanguage }) => (
    <header className="w-full text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-white/20 relative">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-transparent bg-clip-text">
            {t('appTitle')}
        </h1>
        <p className="text-sm text-gray-300 mt-2">
           {t('appSubtitle_part1')}<a href="https://www.kutuphaneveteknoloji.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">{t('appSubtitle_link')}</a>{t('appSubtitle_part2')}
        </p>
        <a href="https://www.kutuphaneveteknoloji.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">
            {t('appWebsite')}
        </a>
        <button onClick={toggleLanguage} className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-lg text-xs hover:bg-white/20 transition-colors">
            <Languages size={14}/> {t('languageToggle')}
        </button>
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
            if (videoRef.current) { videoRef.current.srcObject = stream; }
            setStream(stream);
        } catch (err) {
            console.error("Kamera erişim hatası:", err);
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") { setCameraError(t('cameraPermissionError'));
            } else { setCameraError(t('cameraStartError')); }
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            onCapture(dataUrl); stopCamera();
        }
    };
    
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1280;
                    const MAX_HEIGHT = 720;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round(height * (MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round(width * (MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                    onCapture(dataUrl);
                    stopCamera();
                };
                img.onerror = () => {
                    setCameraError(t('fileReadError'));
                };
                img.src = e.target.result;
            };
            reader.onerror = (err) => { console.error("Dosya okuma hatası:", err); setCameraError(t('fileReadError')); };
            reader.readAsDataURL(file);
        }
    };

    const stopCamera = () => { if (stream) { stream.getTracks().forEach(track => track.stop()); setStream(null); } };
    useEffect(() => { return () => stopCamera(); }, [stream]);
    const handleRetake = () => { setCameraError(null); onCapture(null); };

    return (
        <div id="cameraSection" className="section w-full p-4 border-2 border-dashed border-[#241bc6]/50 rounded-2xl bg-black/20 flex flex-col items-center gap-4">
            <h2 tabIndex="-1" className="text-xl font-bold text-center">{t('step1Title')}</h2>
            <div className="w-full aspect-[9/16] md:aspect-video bg-black rounded-lg overflow-hidden relative">
                {imageSrc ? <img src={imageSrc} alt="Seçilen Fotoğraf" className="w-full h-full object-contain" /> : (<><video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}></video>{!stream && <div className="absolute inset-0 flex items-center justify-center text-gray-400">{t('cameraOff')}</div>}</>)}
            </div>
            {cameraError && <div className="w-full p-3 my-2 bg-red-500/20 text-red-300 rounded-lg text-center text-sm flex items-center justify-center gap-2"><AlertTriangle size={20} /><span>{cameraError}</span></div>}
            <div className="flex flex-col sm:flex-row gap-4">
                {imageSrc ? (<button onClick={handleRetake} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105"><RefreshCw size={20} />{t('retake')}</button>) : (<>{!stream ? (<button onClick={startCamera} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#241bc6] text-white rounded-lg hover:bg-[#3a32d1] transition-all transform hover:scale-105"><Camera size={20} />{t('openCamera')}</button>) : (<button onClick={captureImage} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105"><Zap size={20} />{t('takePhoto')}</button>)}<button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105"><Upload size={20} />{t('uploadPhoto')}</button></>)}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/jpeg, image/png" className="hidden" />
            <p className="text-center text-xs text-gray-400 mt-2 max-w-md">{t('photoTip')}</p>
        </div>
    );
};

const PromptControls = React.forwardRef(({ onGenerate, imageSrc, t, language }, ref) => {
    const [prompt, setPrompt] = useState("");
    const [samplePrompts, setSamplePrompts] = useState([]);
    
    useEffect(() => {
        const allPrompts = translations[language].samplePrompts;
        const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
        setSamplePrompts(shuffled.slice(0, 10));
    }, [imageSrc, language]);

    const handleSampleClick = (sample) => { setPrompt(sample); };

    return (
        <div id="characterInputSection" className="section w-full flex flex-col gap-4 p-4 border-2 border-dashed border-purple-500/50 rounded-2xl bg-black/20">
            <h2 tabIndex="-1" className="text-xl font-bold text-center">{t('step2Title')}</h2>
            <div className="flex-grow flex flex-col">
                <label htmlFor="characterInput" className="mb-2 font-semibold text-gray-200">{t('promptLabel')}</label>
                <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">{t('promptInspiration')}</p>
                    <div className="flex flex-wrap gap-2">
                        {samplePrompts.map((sample, index) => (<button key={index} onClick={() => handleSampleClick(sample)} disabled={!imageSrc} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{sample}</button>))}
                    </div>
                </div>
                <textarea id="characterInput" ref={ref} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t('promptPlaceholder')} className="w-full flex-grow p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-[#bf24c6] text-white resize-none" rows="3" disabled={!imageSrc}></textarea>
                <button id="btnCreateArt" onClick={() => onGenerate('character', prompt)} disabled={!imageSrc || !prompt} className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"><Zap size={20} /> {t('generateButton')}</button>
                <p className="text-center text-xs text-gray-400 mt-3">{t('generateTip')}</p>
            </div>
        </div>
    );
});

const Toast = ({ message, type, onClose }) => { useEffect(() => { const timer = setTimeout(() => { onClose(); }, 3000); return () => clearTimeout(timer); }, [onClose]); const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'; return (<div className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>{message}</div>); };

const LoadingAnimation = ({ t, language, step }) => {
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        const messagesKey = step === 'story' ? 'autoStoryLoadingMessages' : 'loadingImageMessages';
        const initialText = step === 'story' ? t('loadingStory') : t('loadingImage');
        const loadingMessages = translations[language][messagesKey];
        
        setLoadingText(initialText);
        let index = 0;
        const intervalId = setInterval(() => {
            setLoadingText(loadingMessages[index]);
            index = (index + 1) % loadingMessages.length;
        }, 2500);
        return () => clearInterval(intervalId);
    }, [language, t, step]);

    return (
        <div className="loading-container-interactive">
            <div className="spinner"></div>
            <p className="font-semibold text-lg text-center text-gray-200">{loadingText}</p>
        </div>
    );
};

const ImageOutput = ({ generatedImage, isLoading, isStoryLoading, onGenerateStory, error, userPrompt, story, t, language, generationStep }) => {
    const canvasRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const errorRef = useRef(null);
    const [toast, setToast] = useState(null);
    
    useEffect(() => { if (generatedImage && !isLoading && downloadButtonRef.current) { setTimeout(() => downloadButtonRef.current.focus({ preventScroll: true }), 100); } }, [generatedImage, isLoading]);
    useEffect(() => { if (error && errorRef.current) { setTimeout(() => errorRef.current.focus({ preventScroll: true }), 100); } }, [error]);

    const handleRetry = () => {
        const cameraSection = document.getElementById('cameraSection');
        if (cameraSection) {
            cameraSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
        }
    }

    const copyToClipboard = (textToCopy) => {
        const textArea = document.createElement("textarea"); textArea.value = textToCopy; textArea.style.position = "fixed"; textArea.style.top = "-9999px"; textArea.style.left = "-9999px"; document.body.appendChild(textArea); textArea.focus(); textArea.select();
        try { if (document.execCommand('copy')) { setToast({ message: t('textCopied'), type: 'success' }); return true; } return false;
        } catch (err) { console.error('Kopyalama hatası:', err); setToast({ message: t('copyError'), type: 'error' }); return false;
        } finally { document.body.removeChild(textArea); }
    };
    
    const downloadImage = () => { if (canvasRef.current) { const link = document.createElement('a'); link.href = canvasRef.current.toDataURL('image/png'); link.download = 'ktf-studyosu-gorsel.png'; document.body.appendChild(link); link.click(); document.body.removeChild(link); } };

    return (
        <div id="resultSection" className="section w-full p-4 border-2 border-dashed border-[#bf24c6]/50 rounded-2xl bg-black/20 flex flex-col items-center justify-center min-h-[400px]">
            <h2 tabIndex="-1" className="text-xl font-bold text-center mb-4">{t('step3Title')}</h2>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                {isLoading && <LoadingAnimation t={t} language={language} step={generationStep} />}
                {error && (<div ref={errorRef} tabIndex="-1" role="alert" className="flex flex-col items-center gap-4 text-red-400 p-4">
                    <AlertTriangle size={48} />
                    <p className="text-center font-bold">{error.message}</p>
                    <p className="text-center text-sm text-gray-400">API Response: {error.details}</p>
                    {error.type === 'noImage' && (
                        <>
                            <p className="text-center text-sm text-gray-300 mt-2 bg-black/20 p-3 rounded-lg">{t('photoTip')}</p>
                            <button onClick={handleRetry} className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all">
                                <RefreshCw size={20} /> {t('retake')}
                            </button>
                        </>
                    )}
                </div>)}
                {generatedImage && !isLoading && (<img src={generatedImage} alt="Generated Portrait" className="w-full h-full object-contain" />)}
                {!isLoading && !error && !generatedImage && (<div className="text-gray-400 text-center"><p>{t('resultPlaceholder')}</p></div>)}
            </div>
             {generatedImage && !isLoading && (
                <div className="mt-4 flex flex-col items-center gap-4 w-full">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button ref={downloadButtonRef} onClick={downloadImage} className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105"><Download size={20} /> {t('downloadImage')}</button>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full max-w-md">
                        <button onClick={() => copyToClipboard(t('shareText', { prompt: userPrompt }))} className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity transform hover:scale-105">
                            <Copy size={20}/> {t('copyImageShareText')}
                        </button>
                    </div>

                    {!story && !isStoryLoading && !error && (
                        <div className="mt-6 flex flex-col items-center gap-3 text-center p-4 bg-black/20 rounded-lg w-full max-w-lg">
                             <p className="text-gray-300 font-semibold">{t('generateStoryPrompt')}</p>
                             <button onClick={onGenerateStory} className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity transform hover:scale-105">
                                 <Sparkles size={20}/> {t('generateStoryButton')}
                             </button>
                        </div>
                    )}

                    {isStoryLoading && (
                         <div className="mt-4 p-4 w-full max-w-lg flex flex-col items-center justify-center">
                            <LoadingAnimation t={t} language={language} step="story" />
                        </div>
                    )}

                    {story && !isStoryLoading && (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg w-full max-w-lg relative">
                            <h4 className="font-bold text-lg text-white mb-2">{t('yourStory')}</h4>
                            <p className="text-sm text-gray-300 whitespace-pre-wrap">{story}</p>
                            <button onClick={() => copyToClipboard(story)} className="absolute top-2 right-2 p-1.5 bg-gray-700/50 hover:bg-gray-600 rounded-md text-gray-300 hover:text-white transition-colors" aria-label={t('copyStory')}>
                                <Copy size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isStoryLoading, setIsStoryLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [liveRegionText, setLiveRegionText] = useState("");
    const [story, setStory] = useState("");
    const [language, setLanguage] = useState('tr');
    const [generationStep, setGenerationStep] = useState(null);
    
    const promptInputRef = useRef(null);

    useEffect(() => { const browserLang = navigator.language || navigator.userLanguage; if (browserLang.startsWith('tr')) { setLanguage('tr'); } else { setLanguage('en'); } }, []);
    
    const t = useCallback((key, replacements = {}) => { let text = (translations[language] && translations[language][key]) || key; for (const placeholder in replacements) { text = text.replace(`{${placeholder}}`, replacements[placeholder]); } return text; }, [language]);

    const toggleLanguage = () => { setLanguage(prevLang => prevLang === 'tr' ? 'en' : 'tr'); };

    const handleGenerateStory = useCallback(async (promptForStory) => {
        if (!promptForStory) return;

        const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
        const apiUrl = `https://openrouter.ai/api/v1/chat/completions`;
        const festivalInfo = `3. Uluslararası Kütüphane ve Teknoloji Festivali, 30 Mart – 5 Nisan 2026 tarihleri arasında İstanbul Rami Kütüphanesi'nde "Üreten Kütüphaneler" ana temasıyla gerçekleştirilecektir.`;
        const storyPrompt = t('storyPrompt', { prompt: promptForStory, festivalInfo });
        
        try {
            const response = await fetch(apiUrl, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }, 
                body: JSON.stringify({
                    model: 'google/gemini-2.5-flash-preview-09-2025',
                    messages: [{ role: 'user', content: storyPrompt }],
                    max_tokens: 1000
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json(); 
                console.error("Story API error:", errorData); 
                throw new Error(t('storyGenerationError')); 
            }
            
            const result = await response.json(); 
            const storyText = result.choices?.[0]?.message?.content;
            if (storyText) { 
                setStory(storyText); 
            } else { 
                throw new Error(t('invalidResponseError')); 
            }
        } catch (err) {
            console.error(err);
            setError({ message: err.message || t('storyGenerationError'), type: 'generic', details: err.toString() });
        }
    }, [t]);

    const onGenerateStory = async () => {
        if (!generatedImage || !userPrompt) {
            setError({ message: t('storyNeedsImageError'), type: 'user' });
            return;
        }
        setLiveRegionText(t('loadingStory'));
        setIsStoryLoading(true);
        setStory('');
        setError(null);

        try {
            await handleGenerateStory(userPrompt);
        } catch (e) {
            console.error(e);
        } finally {
            setIsStoryLoading(false);
        }
    };

    const handleCapture = (dataUrl) => {
        setImageSrc(dataUrl); setGeneratedImage(null); setError(null); setStory("");
    };
    
    const handleGenerateImage = async (mode, prompt) => {
        if (!imageSrc) { setError({ message: t('photoTip'), type: 'user' }); return; }
        
        const resultSection = document.getElementById('resultSection');
        if (resultSection) { resultSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' }); }
        
        setLiveRegionText(t('loadingImage')); 
        setUserPrompt(prompt); 
        setIsLoading(true);
        setGenerationStep('image');
        setError(null); 
        setGeneratedImage(null); 
        setStory("");
        
        const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
        const fullPrompt = t('imagePrompt', { prompt });
        
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }, 
                body: JSON.stringify({
                    model: 'openai/dall-e-3',
                    messages: [{ role: 'user', content: fullPrompt }],
                    max_tokens: 1024
                })
            });
            
            if (!response.ok) { 
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw { message: t('imageGenerationError'), type: 'generic', details: errorText }; 
            }
            
            const result = await response.json();
            const content = result.choices?.[0]?.message?.content;
            
            if (content && typeof content === 'string' && content.includes('http')) {
                setGeneratedImage(content);
                setLiveRegionText(t('imageGeneratedSuccess'));
            } else {
                console.log("API Response:", content);
                throw { message: t('imageGenerationError'), type: 'generic', details: content || 'No image URL returned' };
            }
        } catch (err) {
            console.error('Image generation error:', err);
            const errorMessage = err.message || t('imageGenerationError');
            setError({ message: errorMessage, type: 'generic', details: err.details || err.toString() });
            setLiveRegionText(`${t('errorPrefix')}${errorMessage}`);
        } finally {
            setIsLoading(false);
            setGenerationStep(null);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white font-sans flex flex-col items-center gap-8 p-4">
            <GlobalStyles />
            <div className="sr-only" aria-live="polite" aria-atomic="true">{liveRegionText}</div>
            <Header t={t} toggleLanguage={toggleLanguage} />
            <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <CameraView onCapture={handleCapture} imageSrc={imageSrc} t={t} />
                <PromptControls ref={promptInputRef} onGenerate={handleGenerateImage} imageSrc={imageSrc} t={t} language={language} />
                <ImageOutput 
                    generatedImage={generatedImage} 
                    isLoading={isLoading} 
                    isStoryLoading={isStoryLoading}
                    onGenerateStory={onGenerateStory}
                    error={error} 
                    userPrompt={userPrompt} 
                    story={story} 
                    t={t} 
                    language={language}
                    generationStep={generationStep}
                />
            </main>
        </div>
    );
}

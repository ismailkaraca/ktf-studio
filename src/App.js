import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Zap, Upload, AlertTriangle, Download, Share2, BookOpen, BrainCircuit, Sparkles, Copy, RefreshCw, Languages, Play } from 'lucide-react';

// --- I18n Translations ---
const translations = {
  en: {
    appTitle: "Library and Technology Festival Studio",
    appSubtitle_part1: "This application was developed as part of the ",
    appSubtitle_link: "3rd International Library and Technology Festival",
    appSubtitle_part2: ".",
    appWebsite: "www.kutuphaneveteknoloji.com",
    languageToggle: "Türkçe'ye Geç",
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
    generateButton: "Create Artistic Video",
    generateTip: "Let's transform your photo into an artistic video portrait of your chosen novel character, blending it with the theme of library and technology!",
    step3Title: "Step 3: Review Your Result",
    resultPlaceholder: "Your generated video will appear here.",
    downloadVideo: "Download Video",
    shareOnSocial: "Share Video on Social Media",
    yourStory: "Behold, Your Legend!",
    copyStory: "Copy Story",
    copyVideoShareText: "Copy Share Text",
    copyStoryShareText: "Copy Story Text",
    loadingVideo: "AI is creating your video...",
    loadingVideoMessages: ["Generating key frames...","Adding transitions and effects...","Composing motion sequences...","The AI is weaving magic...","Finalizing your cinematic moment..."],
    loadingStory: "Please wait... Writing a story for your character...",
    autoStoryLoadingMessages: ["Are you curious what your character would feel at the festival?","A literary universe is being created...","The final lines are being penned..."],
    errorPrefix: "An error occurred: ",
    videoGenerationError: "The AI could not create this video. Please try a different theme or a clearer photo.",
    safetyError: "Sorry, the AI has restrictions on creating content involving people. Your request could not be processed. Please try a more artistic theme.",
    invalidResponseError: "Could not get a valid video from the AI.",
    noImageError: "The AI could not detect a clear face in this photo. Please try a different or clearer photo.",
    storyGenerationError: "Sorry, a special story for this character could not be written. Please try again.",
    storyNeedsVideoError: "You must create a video first.",
    videoGeneratedSuccess: "Your video has been successfully created.",
    generateStoryPrompt: "Curious what this character would feel at the festival?",
    generateStoryButton: "Create Their Story",
    textCopied: "Text copied to clipboard!",
    copyError: "Could not copy!",
    shareModalTitle: "Share on Social Media",
    instagramTip: "For Instagram: Download the video and upload it manually from the Instagram app.",
    copyShareText: "Copy Share Text",
    copyShareTextWithStory: "Copy Share Text with Story",
    close: "Close",
    shareText: "I'm at the 3rd International Library and Technology Festival, as \"{prompt}\". Visit www.kutuphaneveteknoloji.com to create your own AI video for the festival. #ktf #kutuphaneveteknolojifest",
    shareTextWithStory: "\"{prompt}\" (Generated video). Visit www.kutuphaneveteknoloji.com to create your own AI video and story for the festival. #ktf #kutuphaneveteknolojifest\n\nHere is my story:\n{story}",
    videoPrompt: `Create an artistic video portrait inspired by the character concept: "{prompt}". The video should:
- Feature dramatic, cinematic cinematography with smooth camera movements
- Incorporate library and technology elements in the background or setting
- Use artistic, non-photorealistic digital art style with rich colors and textures
- Show the character in a contemplative or action pose with subtle movements
- Duration: 5 seconds
- Aspect ratio: 16:9
- Style: Ethereal, magical, and inspiring - suitable for a cultural festival
Make it visually stunning and emotionally resonant.`,
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
    photoTip: "En iyi sonuçlar için lütfen sadece bir kişinin olduğu ve yüzünün net bir şekilde görüldüğü bir fotoğraf yükleyin.",
    step2Title: "Adım 2: Tarzınızı Belirleyin",
    promptLabel: "En sevdiğiniz roman veya karakteri girin:",
    promptInspiration: "Veya ilham almak için birini seçin:",
    promptPlaceholder: "Örn: Sherlock Holmes gibi gizemli bir havada...",
    generateButton: "Sanatsal Video Oluştur",
    generateTip: "Yüklediğiniz fotoğrafı, kütüphane ve teknoloji temasıyla harmanlayarak seçtiğiniz roman karakterinin sanatsal bir video portresine dönüştürelim!",
    step3Title: "Adım 3: Sonucu İnceleyin",
    resultPlaceholder: "Oluşturulan videonuz burada görünecek.",
    downloadVideo: "Videoyu İndir",
    shareOnSocial: "Videoyu Sosyal Medyada Paylaş",
    yourStory: "İşte Senin Efsanen!",
    copyStory: "Hikayeyi Kopyala",
    copyVideoShareText: "Paylaşım Metnini Kopyala",
    copyStoryShareText: "Hikaye Metnini Kopyala",
    loadingVideo: "Yapay zeka videonuzu oluşturuyor...",
    loadingVideoMessages: ["Anahtar kareler üretiliyor...","Geçişler ve efektler ekleniyor...","Hareket dizileri oluşturuluyor...","Yapay zeka sihir dokuyuyor...","Sinematik anınız finalize ediliyor..."],
    loadingStory: "Lütfen bekleyin... Karakterinize hikaye yazılıyor...",
    autoStoryLoadingMessages: ["Karakterinizin festivale katılsa neler hissedebileceğini merak ediyor musunuz?", "Edebi bir evren yaratılıyor...", "Son satırlar kaleme alınıyor..."],
    errorPrefix: "Bir hata oluştu: ",
    videoGenerationError: "Yapay zeka bu videoyu oluşturamadı. Lütfen farklı bir tema veya daha net bir fotoğraf deneyin.",
    safetyError: "Üzgünüz, yapay zeka insan içeren içerik oluşturma konusunda kısıtlamalara sahip. Bu nedenle isteğiniz işlenemedi. Lütfen daha sanatsal bir tema deneyin.",
    invalidResponseError: "Yapay zekadan geçerli bir video alınamadı.",
    noImageError: "Yapay zeka bu fotoğrafta net bir yüz algılayamadı. Lütfen farklı veya daha net bir fotoğraf deneyin.",
    storyGenerationError: "Üzgünüz, bu karaktere özel bir hikaye yazılamadı. Lütfen tekrar deneyin.",
    storyNeedsVideoError: "Önce bir video oluşturmalısınız.",
    videoGeneratedSuccess: "Videonuz başarıyla oluşturuldu.",
    generateStoryPrompt: "Bu karakterin festivalde neler hissedebileceğini merak ediyor musun?",
    generateStoryButton: "Hikayesini Oluştur",
    textCopied: "Metin panoya kopyalandı!",
    copyError: "Kopyalanamadı!",
    shareModalTitle: "Sosyal Medyada Paylaş",
    instagramTip: "Instagram için: Videoyu indirip, Instagram uygulamasından manuel olarak yükleyebilirsiniz.",
    copyShareText: "Paylaşım Metnini Kopyala",
    copyShareTextWithStory: "Paylaşım Metnini Hikaye İle Kopyala",
    close: "Kapat",
    shareText: "Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim, hem de \"{prompt}\". Festival kapsamında kendi yapay zeka videonuzu oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. #ktf #kutuphaneveteknolojifest",
    shareTextWithStory: "\"{prompt}\" (Oluşturulan video). Festival kapsamında kendi yapay zeka videonuzu oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. #ktf #kutuphaneveteknolojifest\n\nİşte benim hikayem:\n{story}",
    videoPrompt: `Şu karakter konseptinden ilham alarak sanatsal bir video portresi oluştur: "{prompt}". Video şunları içermeli:
- Dramatik, sinematik sinemotografi ve pürüzsüz kamera hareketleri
- Arka planda veya ortamda kütüphane ve teknoloji öğeleri
- Zengin renkler ve dokularla sanatsal, fotogerçekçi olmayan dijital sanat stili
- Karakterin düşünceye dalmış veya aksiyon pozunda zarif hareketleriyle gösterilmesi
- Süre: 5 saniye
- En-boy oranı: 16:9
- Stil: Sihirli, ilahi ve esin verici - kültürel festival için uygun
Görsel olarak muhteşem ve duygusal olarak etkileyici olsun.`,
    samplePrompts: ["Sherlock Holmes gibi gizemli ve zeki", "1984 romanından distopik bir karakter", "Moby Dick'ten Kaptan Ahab", "Don Quixote gibi maceraperest", "Bir Ghibli film karakteri", "Jane Eyre gibi romantik", "Cyberpunk bir karakter", "Alice Harikalar Diyarında gibi meraklı", "Dune evreninden bir Fremen", "Steampunk bir mucit", "Bir elf gibi asil ve bilge", "Raskolnikov gibi çatışmalı", "Küçük Prens gibi düşünceli"],
  }
};


// --- Global Stil ve Yardımcı Fonksiyonlar ---

const GlobalStyles = () => (
    <style>{`
        :root { --safe-top: env(safe-area-inset-top, 0px); }
        .section { scroll-margin-top: calc(84px + var(--safe-top)); }
        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto !important; }
        }
        .loading-container-interactive { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; width: 100%; height: 100%; }
        .spinner {
            width: 64px;
            height: 64px;
            border: 8px solid rgba(255, 255, 255, 0.2);
            border-top-color: #bf24c6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        video { transform: scaleX(-1); }
    `}</style>
);

const getScrollBehavior = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
};


// --- Bileşenler ---

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
                {imageSrc ? <img src={imageSrc} alt="Seçilen Fotoğraf" className="w-full h-full object-contain" /> : (<> <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}></video> {!stream && <div className="absolute inset-0 flex items-center justify-center text-gray-400">{t('cameraOff')}</div>} </>)}
            </div>
            {cameraError && <div className="w-full p-3 my-2 bg-red-500/20 text-red-300 rounded-lg text-center text-sm flex items-center justify-center gap-2"><AlertTriangle size={20} /><span>{cameraError}</span></div>}
            <div className="flex flex-col sm:flex-row gap-4">
                {imageSrc ? (<button onClick={handleRetake} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105"><RefreshCw size={20} />{t('retake')}</button>) : (<> {!stream ? (<button onClick={startCamera} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#241bc6] text-white rounded-lg hover:bg-[#3a32d1] transition-all transform hover:scale-105"><Camera size={20} />{t('openCamera')}</button>) : (<button onClick={captureImage} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105"><Zap size={20} />{t('takePhoto')}</button>)} <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105"><Upload size={20} />{t('uploadPhoto')}</button> </>)}
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
                <button id="btnCreateArt" onClick={() => onGenerate('video', prompt)} disabled={!imageSrc || !prompt} className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"><Zap size={20} /> {t('generateButton')}</button>
                <p className="text-center text-xs text-gray-400 mt-3">{t('generateTip')}</p>
            </div>
        </div>
    );
});

const Toast = ({ message, type, onClose }) => { useEffect(() => { const timer = setTimeout(() => { onClose(); }, 3000); return () => clearTimeout(timer); }, [onClose]); const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'; return (<div className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>{message}</div>); };

const ShareModal = ({ shareText, onClose, onCopy, story, onCopyStoryShare, t }) => {
    const pageUrl = "https://www.kutuphaneveteknoloji.com/";
    const socialLinks = [ { name: "X", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` }, { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}` }, { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` }, { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}` }, { name: "Telegram", url: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}` }, ];
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4 text-center">{t('shareModalTitle')}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map(link => (<a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-lg transition-colors">{link.name}</a>))}
                </div>
                <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300 text-center"><strong>Instagram:</strong> {t('instagramTip')}</div>
                <button onClick={onCopy} className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors">{t('copyVideoShareText')}</button>
                {story && (<button onClick={onCopyStoryShare} className="mt-2 w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition-colors">{t('copyStoryShareText')}</button>)}
                <button onClick={onClose} className="mt-2 w-full text-gray-400 hover:text-white py-2">{t('close')}</button>
            </div>
        </div>
    );
};


const LoadingAnimation = ({ t, language, step }) => {
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        const messagesKey = step === 'story' ? 'autoStoryLoadingMessages' : 'loadingVideoMessages';
        const initialText = step === 'story' ? t('loadingStory') : t('loadingVideo');
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


const VideoOutput = ({ generatedVideo, isLoading, isStoryLoading, onGenerateStory, error, userPrompt, story, t, language, generationStep }) => {
    const videoRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const errorRef = useRef(null);
    const [toast, setToast] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    
    useEffect(() => { if (generatedVideo && !isLoading && downloadButtonRef.current) { setTimeout(() => downloadButtonRef.current.focus({ preventScroll: true }), 100); } }, [generatedVideo, isLoading]);
    useEffect(() => { if (error && errorRef.current) { setTimeout(() => errorRef.current.focus({ preventScroll: true }), 100); } }, [error]);

    const handleRetry = () => {
        const cameraSection = document.getElementById('cameraSection');
        if (cameraSection) {
            cameraSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
        }
    }
    
    const handleShare = async () => {
        if (!videoRef.current) return;
        const shareText = t('shareText', { prompt: userPrompt });
        const title = t('appTitle');
        
        try {
            const response = await fetch(generatedVideo);
            const blob = await response.blob();
            const file = new File([blob], 'ktf-studyosu-video.mp4', { type: 'video/mp4' });
            
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file], title: title, text: shareText });
            } else {
                throw new Error("Cannot share files on this browser.");
            }
        } catch (error) {
            console.warn("Web Share API failed or not supported, falling back to modal:", error);
            setShowShareModal(true);
        }
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
                setToast({ message: t('textCopied'), type: 'success' });
                return true;
            }
            return false;
        } catch (err) {
            console.error('Kopyalama hatası:', err);
            setToast({ message: t('copyError'), type: 'error' });
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    };
    
    const handleCopyToClipboard = () => { copyToClipboard(t('shareText', { prompt: userPrompt })); };
    const handleCopyStory = () => { if (story) { copyToClipboard(story); } };
    const handleCopyStoryShareText = () => { copyToClipboard(t('shareTextWithStory', { prompt: userPrompt, story: story })); };
    
    const downloadVideo = () => {
        const link = document.createElement('a');
        link.href = generatedVideo;
        link.download = 'ktf-studyosu-video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id="resultSection" className="section w-full p-4 border-2 border-dashed border-[#bf24c6]/50 rounded-2xl bg-black/20 flex flex-col items-center justify-center min-h-[400px]">
            <h2 tabIndex="-1" className="text-xl font-bold text-center mb-4">{t('step3Title')}</h2>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {showShareModal && <ShareModal shareText={t('shareText', { prompt: userPrompt })} onClose={() => setShowShareModal(false)} onCopy={handleCopyToClipboard} story={story} onCopyStoryShare={handleCopyStoryShareText} t={t} />}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                {isLoading && <LoadingAnimation t={t} language={language} step={generationStep} />}
                {error && (<div ref={errorRef} tabIndex="-1" role="alert" className="flex flex-col items-center gap-4 text-red-400 p-4">
                    <AlertTriangle size={48} />
                    <p className="text-center font-bold">{error.message}</p>
                    {error.type === 'noImage' && (
                        <>
                            <p className="text-center text-sm text-gray-300 mt-2 bg-black/20 p-3 rounded-lg">{t('photoTip')}</p>
                            <button onClick={handleRetry} className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all">
                                <RefreshCw size={20} /> {t('retake')}
                            </button>
                        </>
                    )}
                </div>)}
                {generatedVideo && !isLoading && (
                    <video ref={videoRef} src={generatedVideo} className="w-full h-full object-contain" controls />
                )}
                {!isLoading && !error && !generatedVideo && (<div className="text-gray-400 text-center"><p>{t('resultPlaceholder')}</p></div>)}
            </div>
             {generatedVideo && !isLoading && (
                <div className="mt-4 flex flex-col items-center gap-4 w-full">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button ref={downloadButtonRef} onClick={downloadVideo} className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105"><Download size={20} /> {t('downloadVideo')}</button>
                        <button onClick={handleShare} aria-label={t('shareOnSocial')} className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all transform hover:scale-105"><Share2 size={20} /> {t('shareOnSocial')}</button>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full max-w-md">
                        <button onClick={handleCopyToClipboard} className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity transform hover:scale-105">
                            <Copy size={20}/> {t('copyVideoShareText')}
                        </button>
                        {story && !isStoryLoading && (
                             <button onClick={handleCopyStoryShareText} className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity transform hover:scale-105">
                                <Copy size={20}/> {t('copyStoryShareText')}
                            </button>
                        )}
                    </div>

                    {isStoryLoading && (
                         <div className="mt-4 p-4 w-full max-w-lg flex flex-col items-center justify-center">
                            <LoadingAnimation t={t} language={language} step="story" />
                        </div>
                    )}

                    {!story && !isStoryLoading && !error && (
                        <div className="mt-6 flex flex-col items-center gap-3 text-center p-4 bg-black/20 rounded-lg w-full max-w-lg">
                             <p className="text-gray-300 font-semibold">{t('generateStoryPrompt')}</p>
                             <button onClick={onGenerateStory} className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity transform hover:scale-105">
                                 <Sparkles size={20}/> {t('generateStoryButton')}
                             </button>
                        </div>
                    )}

                    {story && !isStoryLoading && (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg w-full max-w-lg prose prose-invert prose-p:text-gray-300 relative">
                            <h4 className="font-bold text-lg text-white mb-2">{t('yourStory')}</h4>
                            <p className="text-sm whitespace-pre-wrap">{story}</p>
                            <button onClick={handleCopyStory} className="absolute top-2 right-2 p-1.5 bg-gray-700/50 hover:bg-gray-600 rounded-md text-gray-300 hover:text-white transition-colors" aria-label={t('copyStory')}>
                                <Copy size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


// --- Ana Uygulama ---
export default function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const [generatedVideo, setGeneratedVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isStoryLoading, setIsStoryLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [liveRegionText, setLiveRegionText] = useState("");
    const [story, setStory] = useState("");
    const [language, setLanguage] = useState('tr');
    const [generationStep, setGenerationStep] = useState(null);
    
    const promptInputRef = useRef(null);

    useEffect(() => { const browserLang = navigator.language || navigator.userLanguage; if (browserLang.startsWith('tr')) { setLanguage('tr'); } else { setLanguage('en'); } }, []);
    
    const t = useCallback((key, replacements = {}) => { let text = (translations[language] && translations[language][key]) || key; for (const placeholder in replacements) { text = text.replace(`{${placeholder}}`, replacements[placeholder]); } return text; }, [language]);

    const toggleLanguage = () => { setLanguage(prevLang => prevLang === 'tr' ? 'en' : 'tr'); };

    const handleGenerateStory = useCallback(async (promptForStory, videoForStory) => {
        if (!videoForStory || !promptForStory) return;

        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const festivalInfo = `3. Uluslararası Kütüphane ve Teknoloji Festivali, 30 Mart – 5 Nisan 2026 tarihleri arasında İstanbul Rami Kütüphanesi'nde "Üreten Kütüphaneler" ana temasıyla gerçekleştirilecektir. Festival, teknoloji ve yapay zeka temelli hizmetler üreten girişimcileri, akademisyenleri ve binlerce genci bir araya getirir. "Üreten kütüphane" kavramı, kütüphaneleri bireylerin sosyal, kültürel ve teknolojik gelişimlerini destekleyen dinamik üretim merkezleri hâline getirmeyi hedefler.`;
        const storyPrompt = t('storyPrompt', { prompt: promptForStory, festivalInfo });
        const payload = { contents: [{ parts: [{ text: storyPrompt }] }] };
        
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) { const errorData = await response.json(); console.error("Hikaye oluşturma API hatası:", errorData); throw new Error(t('storyGenerationError')); }
            const result = await response.json(); const storyText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (storyText) { setStory(storyText); } else { throw new Error(t('invalidResponseError')); }
        } catch (err) {
            console.error(err);
            setError({ message: err.message || t('storyGenerationError'), type: 'generic' });
            setLiveRegionText(`${t('errorPrefix')}${err.message}`);
            throw err; 
        }
    }, [t]);

    const onGenerateStory = async () => {
        if (!generatedVideo || !userPrompt) {
            setError({ message: t('storyNeedsVideoError'), type: 'user' });
            return;
        }
        setLiveRegionText(t('loadingStory'));
        setIsStoryLoading(true);
        setStory('');
        setError(null);

        try {
            await handleGenerateStory(userPrompt, generatedVideo);
        } catch (e) {
            // error is set inside handleGenerateStory
        } finally {
            setIsStoryLoading(false);
        }
    };

    useEffect(() => {
        const checkIsMobile = () => { setIsMobile(matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)); };
        checkIsMobile(); window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleCapture = (dataUrl) => {
        setImageSrc(dataUrl); setGeneratedVideo(null); setError(null); setStory("");
        if (isMobile && dataUrl && promptInputRef.current) {
             const promptSection = document.getElementById('characterInputSection');
            if (promptSection) {
                setLiveRegionText(t('photoTip'));
                setTimeout(() => {
                    promptSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
                    setTimeout(() => { promptInputRef.current.focus({ preventScroll: true }); }, 400); 
                }, 100);
            }
        }
    };
    
    const handleGenerateVideo = async (mode, prompt) => {
        if (!imageSrc) { setError({ message: t('photoTip'), type: 'user' }); return; }
        
        const resultSection = document.getElementById('resultSection');
        if (resultSection) { resultSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' }); }
        
        setLiveRegionText(t('loadingVideo')); 
        setUserPrompt(prompt); 
        setIsLoading(true);
        setGenerationStep('video');
        setError(null); 
        setGeneratedVideo(null); 
        setStory("");
        
        const falApiKey = process.env.REACT_APP_FAL_API_KEY;
        const apiUrl = 'https://fal.run/fal-ai/kling-video/v2.5-turbo/pro/text-to-video';
        
        // Enhanced prompt for video generation
        const enhancedPrompt = t('videoPrompt', { prompt });
        
        const payload = {
            prompt: enhancedPrompt,
            duration: "5",
            aspect_ratio: "16:9",
            negative_prompt: "blur, distort, low quality, static, boring",
            cfg_scale: 0.7
        };
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${falApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Hatası:", errorData);
                throw { message: t('videoGenerationError'), type: 'generic' };
            }
            
            const result = await response.json();
            const videoUrl = result?.video?.url;
            
            if (videoUrl) {
                setGeneratedVideo(videoUrl);
                setLiveRegionText(t('videoGeneratedSuccess'));
            } else {
                console.error("Yanıt formatı beklenmedik:", result);
                throw { message: t('invalidResponseError'), type: 'generic' };
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.message || t('videoGenerationError');
            const errorType = err.type || 'generic';
            setError({ message: errorMessage, type: errorType });
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
                <PromptControls ref={promptInputRef} onGenerate={handleGenerateVideo} imageSrc={imageSrc} t={t} language={language} />
                <VideoOutput 
                    generatedVideo={generatedVideo} 
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

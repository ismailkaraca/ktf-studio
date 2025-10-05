import React, { useState, useRef, useEffect } from 'react';
import { Camera, Zap, Upload, AlertTriangle, Download, Share2, BookOpen, BrainCircuit, Sparkles, Copy, RefreshCw } from 'lucide-react';

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

const Header = () => (
    <header className="w-full text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-white/20">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-transparent bg-clip-text">
            Kütüphane ve Teknoloji Festivali Stüdyosu
        </h1>
        <p className="text-sm text-gray-300 mt-2">
            Bu uygulama <a href="https://www.kutuphaneveteknoloji.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">3. Uluslararası Kütüphane ve Teknoloji Festivali</a> kapsamında geliştirilmiştir.
        </p>
        <a href="https://www.kutuphaneveteknoloji.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">
            www.kutuphaneveteknoloji.com
        </a>
    </header>
);

const CameraView = ({ onCapture, imageSrc }) => {
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
                setCameraError("Kamera izni reddedildi. Lütfen sayfanızı yenileyip tekrar deneyin ve tarayıcı ayarlarınızdan kamera erişimine izin verin.");
            } else {
                setCameraError("Kamera başlatılamadı. Lütfen başka bir tarayıcı deneyin veya cihazınızı kontrol edin.");
            }
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            // Ayna yansımasını düzeltmek için
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
                stopCamera(); // If camera was open, close it
            };
            reader.onerror = (err) => {
                console.error("Dosya okuma hatası:", err);
                setCameraError("Seçilen dosya okunamadı. Lütfen başka bir fotoğraf deneyin.");
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
        // Clean up stream when component unmounts
        return () => stopCamera();
    }, [stream]);

    const handleRetake = () => {
        setCameraError(null);
        onCapture(null, false); // Clear the current image, do not trigger scroll
    };

    return (
        <div id="cameraSection" className="section w-full p-4 border-2 border-dashed border-[#241bc6]/50 rounded-2xl bg-black/20 flex flex-col items-center gap-4">
            <h2 tabIndex="-1" className="text-xl font-bold text-center">Adım 1: Fotoğrafınızı Seçin</h2>
            <div className="w-full aspect-[9/16] md:aspect-video bg-black rounded-lg overflow-hidden relative">
                {imageSrc ? (
                    <img src={imageSrc} alt="Seçilen Fotoğraf" className="w-full h-full object-contain" />
                ) : (
                    <>
                        <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}></video>
                        {!stream && <div className="absolute inset-0 flex items-center justify-center text-gray-400">Kamera kapalı veya fotoğraf bekleniyor</div>}
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
                            Tekrar Çek/Yükle
                        </button>
                    </>
                ) : (
                    <>
                        {!stream ? (
                            <button onClick={startCamera} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#241bc6] text-white rounded-lg hover:bg-[#3a32d1] transition-all transform hover:scale-105">
                                <Camera size={20} />
                                Kamera Aç
                            </button>
                        ) : (
                            <button onClick={captureImage} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105">
                                <Zap size={20} />
                                Fotoğraf Çek
                            </button>
                        )}
                        <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105">
                            <Upload size={20} />
                            Fotoğraf Yükle
                        </button>
                    </>
                )}
            </div>
            
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/jpeg, image/png" className="hidden" />

            <p className="text-center text-xs text-gray-400 mt-2 max-w-md">
                En iyi sonuçlar için lütfen sadece bir kişinin olduğu ve yüzünün net bir şekilde göründüğü bir fotoğraf yükleyin.
            </p>
        </div>
    );
};

const PromptControls = React.forwardRef(({ onGenerate, imageSrc }, ref) => {
    const [prompt, setPrompt] = useState("");
    const [samplePrompts, setSamplePrompts] = useState([]);

    const allPrompts = [
        "Sherlock Holmes gibi gizemli ve zeki",
        "1984 romanından distopik bir karakter",
        "Moby Dick'ten Kaptan Ahab",
        "Don Kişot gibi maceraperest",
        "Bir Ghibli film karakteri",
        "Jane Eyre gibi romantik",
        "Cyberpunk bir karakter",
        "Alice Harikalar Diyarında gibi meraklı",
        "Dune evreninden bir Fremen",
        "Steampunk bir mucit",
        "Bir elf gibi asil dan bilge",
        "Raskolnikov gibi çatışmalı",
        "Küçük Prens gibi düşünceli",
    ];

    useEffect(() => {
        const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
        setSamplePrompts(shuffled.slice(0, 10));
    }, [imageSrc]);

    const handleSampleClick = (sample) => {
        setPrompt(sample);
    };

    return (
        <div id="characterInputSection" className="section w-full flex flex-col gap-4 p-4 border-2 border-dashed border-purple-500/50 rounded-2xl bg-black/20">
            <h2 tabIndex="-1" className="text-xl font-bold text-center">Adım 2: Tarzınızı Belirleyin</h2>
            <div className="flex-grow flex flex-col">
                <label htmlFor="prompt" className="mb-2 font-semibold text-gray-200">En sevdiğiniz roman veya karakteri girin:</label>
                <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">Veya ilham almak için birini seçin:</p>
                    <div className="flex flex-wrap gap-2">
                        {samplePrompts.map((sample, index) => (
                            <button key={index} onClick={() => handleSampleClick(sample)} disabled={!imageSrc} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {sample}
                            </button>
                        ))}
                    </div>
                </div>
                <textarea id="characterInput" ref={ref} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Örn: Sherlock Holmes gibi gizemli bir havada..." className="w-full flex-grow p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-[#bf24c6] text-white resize-none" rows="3" disabled={!imageSrc}></textarea>
                <button id="btnCreateArt" onClick={() => onGenerate('character', prompt)} disabled={!imageSrc || !prompt} className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                    <Zap size={20} /> Sanatsal Portre Oluştur
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                    Yüklediğiniz fotoğrafı, kütüphane ve teknoloji temasıyla harmanlayarak seçtiğiniz roman karakterinin sanatsal bir portresine dönüştürelim!
                </p>
            </div>
        </div>
    );
});

const Toast = ({ message, type, onClose }) => { useEffect(() => { const timer = setTimeout(() => { onClose(); }, 3000); return () => clearTimeout(timer); }, [onClose]); const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'; return (<div className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>{message}</div>); };

const ShareModal = ({ shareText, onClose, onCopy, story, onCopyStoryShare }) => {
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
                <h3 className="text-xl font-bold mb-4 text-center">Sosyal Medyada Paylaş</h3>
                <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map(link => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-lg transition-colors">{link.name}</a>
                    ))}
                </div>
                <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300 text-center">
                    <strong>Instagram için:</strong> Görseli indirip, Instagram uygulamasından manuel olarak yükleyebilirsiniz.
                </div>
                <button onClick={onCopy} className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors">Paylaşım Metnini Kopyala</button>
                {story && (
                     <button onClick={onCopyStoryShare} className="mt-2 w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition-colors">Paylaşım Metnini Hikaye İle Kopyala</button>
                )}
                <button onClick={onClose} className="mt-2 w-full text-gray-400 hover:text-white py-2">Kapat</button>
            </div>
        </div>
    );
};


const LoadingAnimation = () => {
    const [loadingText, setLoadingText] = useState("Yapay zeka portrenizi tasarlıyor...");
    const loadingMessages = [
        "Renkler ve dokular ayarlanıyor...",
        "Sanatsal fırça darbeleri ekleniyor...",
        "Son sihirli dokunuşlar yapılıyor...",
        "Yapay zeka ilham perilerini çağırıyor...",
    ];

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setLoadingText(loadingMessages[index]);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

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

const StoryLoadingAnimation = () => {
    const [loadingText, setLoadingText] = useState("Kelimeler bir araya geliyor...");
    const loadingMessages = [
        "Karaktere bir ses veriliyor...",
        "Olay örgüsü şekilleniyor...",
        "Edebi dokunuşlar ekleniyor...",
        "Hikayenin son satırları yazılıyor...",
    ];

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % loadingMessages.length;
            setLoadingText(loadingMessages[index]);
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="mt-4 text-center text-gray-300">
            <p>{loadingText}<span className="story-loading-cursor"></span></p>
        </div>
    );
};


const ImageOutput = ({ generatedImage, isLoading, error, mode, userPrompt, onGenerateStory, story, isGeneratingStory }) => {
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

    const shareText = `Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim${userPrompt ? `, hem de ${userPrompt} olarak!` : '.'} Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. #ktf #kutuphaneveteknolojifestivalindeyim`;

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
                
                let line1Text = `Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim.`;
                if (userPrompt) {
                    line1Text += ` Hem de ${userPrompt} olarak!`;
                }

                const overlayTexts = { 
                    line1: line1Text,
                    line2: "Festival kapsamında kendi yapay zeka görselinizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz." 
                }; 
                const bottomMargin = canvas.height * 0.05; 
                const smallerFontSize = Math.max(10, Math.round(canvas.width / 55)); 
         
                const block2Height = drawTextAndBackground(ctx, overlayTexts.line2, canvas.height - bottomMargin, canvas, { customFontSize: smallerFontSize });
                drawTextAndBackground(ctx, overlayTexts.line1, canvas.height - bottomMargin - block2Height, canvas, {});
         
             }; 
        }
    }, [generatedImage, isLoading, userPrompt]);
    
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

            // Check if Web Share API is supported and can share files
            if (navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Paylaşım hatası:', err);
                    // Fallback to modal if user cancels or there's an error
                    if (err.name !== 'AbortError') {
                       setShowShareModal(true);
                    }
                }
            } else {
                // Fallback for browsers that don't support Web Share API
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
            const successful = document.execCommand('copy');
            if (successful) {
                setToast({ message: 'Metin panoya kopyalandı!', type: 'success' });
                return true;
            }
            return false;
        } catch (err) {
            console.error('Kopyalama hatası:', err);
            setToast({ message: 'Kopyalanamadı!', type: 'error' });
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
        const shareTextWithStory = `Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim, hem de ${userPrompt} karakteriyle. Siz de festival kapsamında kendi yapay zeka görselinizi ve hikayenizi oluşturmak için www.kutuphaneveteknoloji.com adresini ziyaret edebilirsiniz. Benim hikayem şöyle:\n\n${story}\n\n#ktf #kutuphaneveteknolojifestivalindeyim`;
        copyToClipboard(shareTextWithStory);
    };

    const downloadImage = () => { if (canvasRef.current) { const link = document.createElement('a'); link.href = canvasRef.current.toDataURL('image/png'); link.download = 'ktf-studyosu-gorsel.png'; document.body.appendChild(link); link.click(); document.body.removeChild(link); } };


    return (
        <div id="resultSection" className="section w-full p-4 border-2 border-dashed border-[#bf24c6]/50 rounded-2xl bg-black/20 flex flex-col items-center justify-center min-h-[400px]">
            <h2 tabIndex="-1" className="text-xl font-bold text-center mb-4">Adım 3: Sonucu İnceleyin</h2>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {showShareModal && <ShareModal 
                shareText={shareText} 
                onClose={() => setShowShareModal(false)} 
                onCopy={handleCopyToClipboard} 
                story={story}
                onCopyStoryShare={handleCopyStoryShareText}
            />}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                {isLoading && <LoadingAnimation />}
                {error && ( <div ref={errorRef} tabIndex="-1" role="alert" className="flex flex-col items-center gap-4 text-red-400 p-4"> <AlertTriangle size={48} /> <p className="text-center">{error}</p> </div> )}
                {generatedImage && !isLoading && ( <canvas ref={canvasRef} className="w-full h-full object-contain" /> )}
                {!isLoading && !error && !generatedImage && ( <div className="text-gray-400 text-center"> <p>Oluşturulan görseliniz burada görünecek.</p> </div> )}
            </div>
             {generatedImage && !isLoading && (
                <div className="mt-4 flex flex-col items-center gap-4 w-full">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button ref={downloadButtonRef} onClick={downloadImage} className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105">
                            <Download size={20} /> Görseli İndir
                        </button>
                        <button onClick={handleShare} aria-label="Sosyal Medyada Paylaş" className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all transform hover:scale-105">
                            <Share2 size={20} /> Sosyal Medyada Paylaş
                        </button>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-2 justify-center max-w-md px-4 sm:px-0">
                        <button onClick={handleCopyToClipboard} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all text-sm flex-1">
                            <Copy size={16} /> Paylaşım Metnini Kopyala
                        </button>
                        {story && (
                            <button onClick={handleCopyStoryShareText} className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all text-sm flex-1">
                                <Copy size={16} /> Paylaşım Metnini  Hikaye İle Kopyala
                            </button>
                        )}
                    </div>
                    
                    <button onClick={onGenerateStory} disabled={isGeneratingStory} className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait transform hover:scale-105">
                        <Sparkles size={20} className="text-yellow-300" /> 
                        {isGeneratingStory ? 'Hikaye Yazılıyor...' : '✨ Bu Karaktere Bir Hikaye Yaz'}
                    </button>

                    {story && !isGeneratingStory && (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg w-full max-w-lg prose prose-invert prose-p:text-gray-300 relative">
                             <h4 className="font-bold text-lg text-white mb-2">Hikayeniz:</h4>
                             <p className="text-sm whitespace-pre-wrap">{story}</p>
                              <button onClick={handleCopyStory} className="absolute top-2 right-2 p-1.5 bg-gray-700/50 hover:bg-gray-600 rounded-md text-gray-300 hover:text-white transition-colors" aria-label="Hikayeyi Kopyala">
                                <Copy size={16} />
                            </button>
                        </div>
                    )}
                    {isGeneratingStory && <StoryLoadingAnimation />}
                </div>
            )}
        </div>
    );
};


// --- Ana Uygulama ---

export default function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generationMode, setGenerationMode] = useState(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [liveRegionText, setLiveRegionText] = useState("");
    const [story, setStory] = useState("");
    const [isGeneratingStory, setIsGeneratingStory] = useState(false);

    const promptInputRef = useRef(null);

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
                setLiveRegionText("Fotoğraf alındı. Lütfen favori roman karakterinizi girin.");
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

    const handleApiError = (err, context) => {
        console.error(`${context} hatası:`, err);
        let userMessage = `Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.`;
        if (typeof err.message === 'string') {
            if (err.message.includes("Quota exceeded")) {
                userMessage = "API kullanım kotası aşıldı. Lütfen Google AI projenizin faturalandırma durumunu kontrol edin veya daha sonra tekrar deneyin.";
            } else if (err.message.includes("SAFETY")) {
                userMessage = "Üzgünüz, yapay zeka güvenlik politikaları nedeniyle bu içerik oluşturulamadı. Lütfen farklı bir tema deneyin.";
            } else if (err.message.includes("API key not valid")) {
                userMessage = "API anahtarı geçersiz. Lütfen uygulamanın yapılandırmasını kontrol edin.";
            }
        }
        setError(userMessage);
        setLiveRegionText(`Bir hata oluştu: ${userMessage}`);
    };

    const handleGenerateImage = async (mode, prompt) => {
        if (!imageSrc) { setError("Lütfen önce bir fotoğraf çekin."); return; }
        
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.scrollIntoView({
                behavior: getScrollBehavior(),
                block: 'start'
            });
        }
        
        setLiveRegionText("Görsel oluşturuluyor…");
        setGenerationMode(mode);
        setUserPrompt(prompt);
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setStory("");

        // DİKKAT: API anahtarınızı buraya güvenli bir şekilde eklemelisiniz.
        // Bu örnekte, bir ortam değişkeninden alınmaktadır.
        // Gerçek bir uygulamada, bu anahtarı istemci tarafında tutmak GÜVENLİ DEĞİLDİR.
        // Genellikle bir arka uç sunucusu üzerinden istek yapılır.
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
        
        if (!apiKey) {
             const err = new Error("API key not valid");
             handleApiError(err, "Yapılandırma");
             setIsLoading(false);
             return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
        const base64ImageData = imageSrc.split(',')[1];

        const fullPrompt = `Bu fotoğraftaki kişiden ilham alarak sanatsal bir portre oluştur. Portrenin teması "${prompt}" olmalı. Arka plan, kütüphane ve teknoloji öğelerini birleştirmeli. Stil, fotogerçekçi olmayan bir dijital sanat eseri gibi olmalı.`;

        const payload = { contents: [{ parts: [ { text: fullPrompt }, { inlineData: { mimeType: "image/jpeg", data: base64ImageData } } ] }], generationConfig: { responseModalities: ['IMAGE'] }, };

        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) { 
                const errorData = await response.json(); 
                const errorMessage = errorData.error?.message || response.statusText;
                throw new Error(errorMessage);
            }
            const result = await response.json();
            const candidate = result?.candidates?.[0];
            const problematicFinishReasons = ['NO_IMAGE', 'SAFETY', 'IMAGE_OTHER', 'RECITATION'];
            if (!candidate || problematicFinishReasons.includes(candidate.finishReason)) {
                const reason = candidate?.finishReason || "unknown";
                throw new Error(`API üretimi durdurdu. Sebep: ${reason}`);
            }
            const base64Data = candidate?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (base64Data) { 
                setGeneratedImage(`data:image/png;base64,${base64Data}`); 
                setLiveRegionText("Görseliniz başarıyla oluşturuldu."); 
            } else { 
                throw new Error("Yapay zekadan geçerli bir görsel alınamadı."); 
            }
        } catch (err) {
            handleApiError(err, "Görsel oluşturma");
        } finally {
            setIsLoading(false);
        }
    };

     const handleGenerateStory = async () => {
        if (!generatedImage || !userPrompt) {
            setToast({ message: 'Önce bir görsel oluşturmalısınız.', type: 'error' });
            return;
        }

        setIsGeneratingStory(true);
        setStory("");
        setError(null);

        const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
        
        if (!apiKey) {
             const err = new Error("API key not valid");
             handleApiError(err, "Yapılandırma");
             setIsGeneratingStory(false);
             return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const festivalInfo = `
        3. Uluslararası Kütüphane ve Teknoloji Festivali, 30 Mart – 5 Nisan 2026 tarihleri arasında İstanbul Rami Kütüphanesi’nde “Üreten Kütüphaneler” ana temasıyla gerçekleştirilecektir.
        Festival, teknoloji ve yapay zekâ temelli hizmetler üretenleri, girişimcileri, akademisyenleri ve binlerce genci bir araya getirir.
        "Üreten kütüphane" kavramı, kütüphaneleri bireylerin sosyal, kültürel ve teknolojik gelişimlerini destekleyen dinamik üretim merkezleri hâline getirmeyi hedefler.
        `;

        const storyPrompt = `Yaratıcı bir hikaye anlatıcısısın. Sana vereceğim festival bilgilerini kullanarak, kullanıcının orijinal istemi olan '${userPrompt}' ve bu istemle oluşturulan görseldeki karakterden yola çıkarak, bu karakterin 3. Uluslararası Kütüphane ve Teknoloji Festivali'nde geçen kısa (en fazla 3 paragraflık), büyüleyici ve Türkçe bir hikayesini yaz. Hikaye, festivalin "Üreten Kütüphaneler" ana temasıyla, görseldeki atmosferle ve karakterin ruh haliyle uyumlu olsun. İşte festivalle ilgili bilmen gerekenler: ${festivalInfo}`;

        const payload = {
            contents: [{
                parts: [
                    { text: storyPrompt }
                ]
            }]
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || response.statusText;
                throw new Error(errorMessage);
            }

            const result = await response.json();
            const storyText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (storyText) {
                setStory(storyText);
            } else {
                throw new Error("API'den geçerli bir hikaye alınamadı.");
            }
        } catch (err) {
            handleApiError(err, "Hikaye oluşturma");
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
            <Header />
            <main className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <CameraView onCapture={handleCapture} imageSrc={imageSrc} />
                    <PromptControls ref={promptInputRef} onGenerate={handleGenerateImage} imageSrc={imageSrc} />
                </div>
                <div className="flex flex-col">
                    <ImageOutput 
                        generatedImage={generatedImage} 
                        isLoading={isLoading} 
                        error={error} 
                        mode={generationMode} 
                        userPrompt={userPrompt}
                        onGenerateStory={handleGenerateStory}
                        story={story}
                        isGeneratingStory={isGeneratingStory}
                     />
                </div>
            </main>
        </div>
    );
}


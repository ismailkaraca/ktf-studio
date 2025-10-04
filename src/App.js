// This file contains the entire React application for the
// Kütüphane ve Teknoloji Festivali Stüdyosu.  It mirrors the
// implementation provided by the user, broken down into a handful
// of components for camera capture, prompt controls, result display
// and UI feedback such as toasts and modals.  Iconography is
// supplied via the lucide-react package and Tailwind utility
// classes are used for layout and styling.  The Tailwind CSS
// stylesheet is loaded from the CDN in public/index.html.

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Zap,
  Upload,
  AlertTriangle,
  Download,
  Share2,
  BookOpen,
  BrainCircuit,
  Sparkles,
  Copy,
  RefreshCw,
} from 'lucide-react';

// --- Global styles and helper functions ---

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

// --- Components ---

const Header = () => (
  <header className="w-full text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-white/20">
    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-transparent bg-clip-text">
      Kütüphane ve Teknoloji Festivali Stüdyosu
    </h1>
    <p className="text-sm text-gray-300 mt-2">
      Bu uygulama{' '}
      <a
        href="https://www.kutuphaneveteknoloji.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-white hover:underline"
      >
        3. Uluslararası Kütüphane ve Teknoloji Festivali
      </a>{' '}
      kapsamında geliştirilmiştir.
    </p>
    <a
      href="https://www.kutuphaneveteknoloji.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-gray-400 hover:text-white transition-colors"
    >
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStream(stream);
    } catch (err) {
      console.error('Kamera erişim hatası:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError(
          'Kamera izni reddedildi. Lütfen sayfanızı yenileyip tekrar deneyin ve tarayıcı ayarlarınızdan kamera erişimine izin verin.'
        );
      } else {
        setCameraError(
          'Kamera başlatılamadı. Lütfen başka bir tarayıcı deneyin veya cihazınızı kontrol edin.'
        );
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
        stopCamera();
      };
      reader.onerror = (err) => {
        console.error('Dosya okuma hatası:', err);
        setCameraError('Seçilen dosya okunamadı. Lütfen başka bir fotoğraf deneyin.');
      };
      reader.readAsDataURL(file);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    // Clean up stream when component unmounts
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);

  const handleRetake = () => {
    setCameraError(null);
    onCapture(null);
  };

  return (
    <div
      id="cameraSection"
      className="section w-full p-4 border-2 border-dashed border-[#241bc6]/50 rounded-2xl bg-black/20 flex flex-col items-center gap-4"
    >
      <h2 tabIndex="-1" className="text-xl font-bold text-center">
        Adım 1: Fotoğrafınızı Seçin
      </h2>
      <div className="w-full aspect-[9/16] md:aspect-video bg-black rounded-lg overflow-hidden relative">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Seçilen Fotoğraf"
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}
            ></video>
            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Kamera kapalı veya fotoğraf bekleniyor
              </div>
            )}
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
          <button
            onClick={handleRetake}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105"
          >
            <RefreshCw size={20} />
            Tekrar Çek/Yükle
          </button>
        ) : (
          <>
            {!stream ? (
              <button
                onClick={startCamera}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#241bc6] text-white rounded-lg hover:bg-[#3a32d1] transition-all transform hover:scale-105"
              >
                <Camera size={20} />
                Kamera Aç
              </button>
            ) : (
              <button
                onClick={captureImage}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#bf24c6] text-white rounded-lg hover:bg-[#d435d1] transition-all transform hover:scale-105"
              >
                <Zap size={20} />
                Fotoğraf Çek
              </button>
            )}
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105"
            >
              <Upload size={20} />
              Fotoğraf Yükle
            </button>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg, image/png"
        className="hidden"
      />
      <p className="text-center text-xs text-gray-400 mt-2 max-w-md">
        En iyi sonuçlar için lütfen sadece bir kişinin olduğu ve yüzünün net bir şekilde göründüğü bir fotoğraf yükleyin.
      </p>
    </div>
  

// eslint-disable-next-line react/display-name
const PromptControls = React.forwardRef(({ onGenerate, imageSrc }, ref) => {
  const [prompt, setPrompt] = useState('');
  const [samplePrompts, setSamplePrompts] = useState([]);

  const allPrompts = [
    'Sherlock Holmes gibi gizemli ve zeki',
    '1984 romanından distopik bir karakter',
    "Moby Dick'ten Kaptan Ahab",
    'Don Kışot gibi maceraperest',
    'Bir Ghibli film karakteri',
    'Jane Eyre gibi romantik',
    'Cyberpunk bir karakter',
    'Alice Harikalar Diyarında gibi meraklı',
    'Dune evreninden bir Fremen',
    'Steampunk bir mucit',
    'Bir elf gibi asil ve bilge',
    'Raskolnikov gibi çatışmalı',
    'Küçük Prens gibi düşünceli',
  ];

  useEffect(() => {
    const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
    setSamplePrompts(shuffled.slice(0, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  const handleSampleClick = (sample) => {
    setPrompt(sample);
  };

  return (
    <div
      id="characterInputSection"
      className="section w-full flex flex-col gap-4 p-4 border-2 border-dashed border-purple-500/50 rounded-2xl bg-black/20"
    >
      <h2 tabIndex="-1" className="text-xl font-bold text-center">
        Adım 2: Tarzınızı Belirleyin
      </h2>
      <div className="flex-grow flex flex-col">
        <label htmlFor="prompt" className="mb-2 font-semibold text-gray-200">
          En sevdiğiniz roman veya karakteri girin:
        </label>
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">
            Veya ilham almak için birini seçin:
          </p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample)}
                disabled={!imageSrc}
                className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
        <textarea
          id="characterInput"
          ref={ref}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Örn: Sherlock Holmes gibi gizemli bir havada..."
          className="w-full flex-grow p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-[#bf24c6] text-white resize-none"
          rows="3"
          disabled={!imageSrc}
        ></textarea>
        <button
          id="btnCreateArt"
          onClick={() => onGenerate('character', prompt)}
          disabled={!imageSrc || !prompt}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <Zap size={20} /> Sanatsal Portre Oluştur
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Yüklediğiniz fotoğrafı, kütüphane ve teknoloji temasıyla harmanlayarak
          seçtiğiniz roman karakterinin sanatsal bir portresine dönüştürelim!
        </p>
      </div>
    </div>
  );
});

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}
    >
      {message}
    </div>
  );
};

const ShareModal = ({ shareText, onClose, onCopy, story, onCopyStoryShare }) => {
  const pageUrl = 'https://www.kutuphaneveteknoloji.com/';
  const socialLinks = [
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pageUrl
      )}`,
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`,
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(
        pageUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
  ];
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 text-center">Sosyal Medyada Paylaş</h3>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.name}
              className="bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300 text-center">
          <strong>Instagram için:</strong> Görseli indirip, Instagram uygulamasından
          manuel olarak yükleyebilirsiniz.
        </div>
        <button
          onClick={onCopy}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors"
        >
          Paylaşım Metnini Kopyala
        </button>
        {story && (
          <button
            onClick={onCopyStoryShare}
            className="mt-2 w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg transition-colors"
          >
            Paylaşım Metnini Hikaye İle Kopyala
          </button>
        )}
        <button
          onClick={onClose}
          className="mt-2 w-full text-gray-400 hover:text-white py-2"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};);
};

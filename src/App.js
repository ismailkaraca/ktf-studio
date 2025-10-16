import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, Download, Share2, Copy, RefreshCw, Book, Globe, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';

// Translation object for i18n support
const translations = {
  tr: {
    title: "Yapay Zeka Stüdyosu",
    subtitle: "3. Uluslararası Kütüphane ve Teknoloji Festivali",
    festivalTheme: "Üreten Kütüphaneler",
    step1Title: "1. Fotoğrafını Seç",
    step2Title: "2. Tarzını Belirle",
    step3Title: "3. Sonucu İncele",
    takePhoto: "Fotoğraf Çek",
    uploadPhoto: "Fotoğraf Yükle",
    retake: "Tekrar Çek/Yükle",
    photoTip: "En iyi sonuç için yüzünüzün net göründüğü tek kişilik bir fotoğraf kullanın.",
    themePlaceholder: "Sherlock Holmes gibi gizemli",
    themeLabel: "Hangi karakteri canlandırmak istersin?",
    exampleThemes: "Örnek Temalar:",
    generatePortrait: "Sanatsal Portre Oluştur",
    generating: "Yapay zeka portrenizi tasarlıyor...",
    generatingStory: "Yapay zeka hikayenizi yazıyor...",
    downloadImage: "Görseli İndir",
    shareOnSocial: "Sosyal Medyada Paylaş",
    copyShareText: "Paylaşım Metnini Kopyala",
    generateStory: "Hikayesini Oluştur",
    copyStory: "Hikayeyi Kopyala",
    copyWithStory: "Paylaşım Metnini Hikaye İle Kopyala",
    shareText: "Ben de 3. Kütüphane ve Teknoloji Festivali'ndeyim. Hem de {theme} olarak! #KütüphaneFestivali #YapayZeka",
    shareTextWithStory: "Ben de 3. Kütüphane ve Teknoloji Festivali'ndeyim. Hem de {theme} olarak!\n\nHikayem: {story}\n\n#KütüphaneFestivali #YapayZeka",
    copied: "Kopyalandı!",
    shared: "Paylaşıldı!",
    errorTitle: "Bir Hata Oluştu",
    errorNoFace: "Fotoğrafınızda yüz algılanamadı. Lütfen yüzünüzün net göründüğü farklı bir fotoğraf deneyin.",
    errorSafety: "Güvenlik nedeniyle görsel oluşturulamadı. Lütfen farklı bir fotoğraf veya tema deneyin.",
    errorGeneral: "Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
    errorStory: "Hikaye oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
    tryAgain: "Tekrar Dene",
    backToPhoto: "Yeni Fotoğraf Seç",
    cameraPermissionDenied: "Kamera izni verilmedi. Lütfen tarayıcı ayarlarından kamera erişimini açın.",
    cameraError: "Kameraya erişilemedi. Lütfen fotoğraf yükleme seçeneğini kullanın.",
    themeExamples: [
      "Sherlock Holmes gibi gizemli",
      "Uzay yolcusu olarak fütüristik",
      "Rönesans ressamı olarak sanatsal",
      "Steampunk mucit gibi yaratıcı",
      "Kitap kurdu olarak bilge",
      "Cyberpunk hacker gibi teknolojik"
    ],
    festivalOverlay: "Ben de 3. Kütüphane ve Teknoloji Festivali'ndeyim.\nHem de {theme} olarak!",
    festivalWebsite: "kutuphanefestivali.org"
  },
  en: {
    title: "AI Studio",
    subtitle: "3rd International Library and Technology Festival",
    festivalTheme: "Productive Libraries",
    step1Title: "1. Choose Your Photo",
    step2Title: "2. Define Your Style",
    step3Title: "3. Review Result",
    takePhoto: "Take Photo",
    uploadPhoto: "Upload Photo",
    retake: "Retake/Upload",
    photoTip: "For best results, use a single-person photo with your face clearly visible.",
    themePlaceholder: "Mysterious like Sherlock Holmes",
    themeLabel: "Which character would you like to portray?",
    exampleThemes: "Example Themes:",
    generatePortrait: "Generate Artistic Portrait",
    generating: "AI is designing your portrait...",
    generatingStory: "AI is writing your story...",
    downloadImage: "Download Image",
    shareOnSocial: "Share on Social Media",
    copyShareText: "Copy Share Text",
    generateStory: "Generate Story",
    copyStory: "Copy Story",
    copyWithStory: "Copy Share Text with Story",
    shareText: "I'm at the 3rd Library and Technology Festival too. As {theme}! #LibraryFestival #AI",
    shareTextWithStory: "I'm at the 3rd Library and Technology Festival too. As {theme}!\n\nMy Story: {story}\n\n#LibraryFestival #AI",
    copied: "Copied!",
    shared: "Shared!",
    errorTitle: "An Error Occurred",
    errorNoFace: "No face detected in your photo. Please try a different photo with your face clearly visible.",
    errorSafety: "Image could not be generated due to safety reasons. Please try a different photo or theme.",
    errorGeneral: "An error occurred while generating the image. Please try again.",
    errorStory: "An error occurred while generating the story. Please try again.",
    tryAgain: "Try Again",
    backToPhoto: "Choose New Photo",
    cameraPermissionDenied: "Camera permission denied. Please enable camera access in your browser settings.",
    cameraError: "Could not access camera. Please use the photo upload option.",
    themeExamples: [
      "Mysterious like Sherlock Holmes",
      "Futuristic as a space traveler",
      "Artistic as a Renaissance painter",
      "Creative like a steampunk inventor",
      "Wise as a bookworm",
      "Technological like a cyberpunk hacker"
    ],
    festivalOverlay: "I'm at the 3rd Library and Technology Festival too.\nAs {theme}!",
    festivalWebsite: "libraryfestival.org"
  }
};

function App() {
  const [language, setLanguage] = useState('tr');
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [theme, setTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [story, setStory] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const t = translations[language];

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError({ message: t.cameraPermissionDenied, type: 'camera' });
      } else {
        setError({ message: t.cameraError, type: 'camera' });
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        setPhoto(blob);
        setPhotoPreview(URL.createObjectURL(blob));
        stopCamera();
        setStep(2);
      }, 'image/jpeg', 0.9);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setStep(2);
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setStep(1);
    setError(null);
    setGeneratedImage(null);
    setFinalImage(null);
    setStory('');
  };

  const selectExampleTheme = (exampleTheme) => {
    setTheme(exampleTheme);
  };

  const generatePortrait = async () => {
    if (!photo || !theme) return;

    setIsGenerating(true);
    setError(null);
    setStep(3);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      
      // Convert photo to base64
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1];
        
        const prompt = `Transform this person's photo into an artistic portrait with the following theme: "${theme}". 
        Create a high-quality, artistic representation that captures the essence of the character while maintaining 
        the person's likeness. The style should be cinematic and professional, suitable for a cultural festival. 
        Focus on creative interpretation while keeping the face recognizable.`;

        const requestBody = {
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }],
          generationConfig: {
            response_modalities: ["IMAGE"],
            temperature: 1.0,
            top_p: 0.95,
            top_k: 40
          }
        };

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          }
        );

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        if (!data.candidates || data.candidates.length === 0) {
          throw new Error('NO_IMAGE');
        }

        const candidate = data.candidates[0];
        
        if (candidate.finishReason === 'SAFETY') {
          throw new Error('SAFETY');
        }

        // Extract image from response
        const imagePart = candidate.content.parts.find(part => part.inline_data);
        
        if (!imagePart) {
          throw new Error('NO_IMAGE');
        }

        const imageData = imagePart.inline_data.data;
        const imageBlob = await fetch(`data:image/png;base64,${imageData}`).then(r => r.blob());
        const imageUrl = URL.createObjectURL(imageBlob);
        
        setGeneratedImage(imageUrl);
        
        // Add festival overlay to image
        await addFestivalOverlay(imageUrl);
        
        setIsGenerating(false);
      };
    } catch (err) {
      console.error('Generation error:', err);
      setIsGenerating(false);
      
      if (err.message === 'NO_IMAGE') {
        setError({ message: t.errorNoFace, type: 'no_face' });
      } else if (err.message === 'SAFETY') {
        setError({ message: t.errorSafety, type: 'safety' });
      } else {
        setError({ message: t.errorGeneral, type: 'general' });
      }
    }
  };

  const addFestivalOverlay = async (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Add semi-transparent overlay at bottom
        const overlayHeight = img.height * 0.25;
        const gradient = ctx.createLinearGradient(0, img.height - overlayHeight, 0, img.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, img.height - overlayHeight, img.width, overlayHeight);
        
        // Add text
        const fontSize = Math.max(img.width * 0.04, 20);
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        
        const overlayText = t.festivalOverlay.replace('{theme}', theme);
        const lines = overlayText.split('\n');
        
        lines.forEach((line, index) => {
          const y = img.height - overlayHeight + (overlayHeight / (lines.length + 2)) * (index + 1) + fontSize;
          ctx.fillText(line, img.width / 2, y);
        });
        
        // Add website
        ctx.font = `${fontSize * 0.6}px Arial, sans-serif`;
        ctx.fillStyle = '#bf24c6';
        ctx.fillText(t.festivalWebsite, img.width / 2, img.height - fontSize * 0.8);
        
        canvas.toBlob((blob) => {
          const finalUrl = URL.createObjectURL(blob);
          setFinalImage(finalUrl);
          resolve();
        }, 'image/png');
      };
      img.src = imageUrl;
    });
  };

  const downloadImage = () => {
    if (finalImage) {
      const a = document.createElement('a');
      a.href = finalImage;
      a.download = 'festival-portrait.png';
      a.click();
      showSuccessMessage(t.copied);
    }
  };

  const shareImage = async () => {
    const shareData = {
      title: t.subtitle,
      text: t.shareText.replace('{theme}', theme),
      url: t.festivalWebsite
    };

    if (navigator.share && finalImage) {
      try {
        const blob = await fetch(finalImage).then(r => r.blob());
        const file = new File([blob], 'festival-portrait.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            ...shareData,
            files: [file]
          });
          showSuccessMessage(t.shared);
        } else {
          await navigator.share(shareData);
          showSuccessMessage(t.shared);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share error:', err);
          // Fallback to social media links modal
          openSocialShareModal();
        }
      }
    } else {
      openSocialShareModal();
    }
  };

  const openSocialShareModal = () => {
    const text = encodeURIComponent(t.shareText.replace('{theme}', theme));
    const url = encodeURIComponent(`https://${t.festivalWebsite}`);
    
    const shareLinks = [
      { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
      { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}` },
      { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
      { name: 'WhatsApp', url: `https://wa.me/?text=${text}%20${url}` }
    ];
    
    // Simple modal implementation
    const modal = window.confirm(`${shareLinks.map(link => link.name).join(', ')} üzerinden paylaşmak ister misiniz?`);
    if (modal) {
      window.open(shareLinks[0].url, '_blank');
    }
  };

  const copyShareText = () => {
    const text = t.shareText.replace('{theme}', theme);
    navigator.clipboard.writeText(text);
    showSuccessMessage(t.copied);
  };

  const copyShareTextWithStory = () => {
    const text = t.shareTextWithStory.replace('{theme}', theme).replace('{story}', story);
    navigator.clipboard.writeText(text);
    showSuccessMessage(t.copied);
  };

  const generateStory = async () => {
    if (!theme) return;

    setIsGeneratingStory(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      
      const prompt = `Sen yaratıcı bir hikaye yazarısın. "3. Uluslararası Kütüphane ve Teknoloji Festivali" temalı, 
      "${theme}" karakteri olarak festival deneyimi yaşayan birinin kısa (maksimum 150 kelime), eğlenceli ve ilham verici 
      bir hikayesini yaz. Festivalin ana teması "Üreten Kütüphaneler"dir. 
      
      Hikaye şu unsurları içermeli:
      - Karakterin festivaldeki bir macerasını anlat
      - Teknoloji ve kütüphane entegrasyonunu vurgula
      - İlham verici ve pozitif bir ton kullan
      - Birinci şahıs ağzından anlat
      
      ${language === 'en' ? 'Write the story in English.' : 'Hikayeyi Türkçe yaz.'}`;

      const requestBody = {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.9,
          top_p: 0.95,
          top_k: 40,
          max_output_tokens: 500
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const storyText = data.candidates[0].content.parts[0].text;
      setStory(storyText);
      setIsGeneratingStory(false);
    } catch (err) {
      console.error('Story generation error:', err);
      setIsGeneratingStory(false);
      setError({ message: t.errorStory, type: 'story' });
    }
  };

  const copyStory = () => {
    navigator.clipboard.writeText(story);
    showSuccessMessage(t.copied);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-500/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                <Book className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                {t.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{t.subtitle}</p>
              <p className="text-xs text-purple-300 italic mt-0.5">"{t.festivalTheme}"</p>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded-lg transition-all duration-300"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-semibold">{language === 'tr' ? 'EN' : 'TR'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Step 1: Photo Selection */}
          <div className={`bg-gray-800/50 backdrop-blur-sm border-2 border-dashed ${step >= 1 ? 'border-purple-500' : 'border-gray-600'} rounded-xl p-6 transition-all duration-300 ${step === 1 ? 'ring-2 ring-purple-500' : ''}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              {t.step1Title}
            </h2>

            {!photoPreview ? (
              <div className="space-y-4">
                {!isCameraActive ? (
                  <>
                    <button
                      onClick={startCamera}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                    >
                      <Camera className="w-5 h-5" />
                      {t.takePhoto}
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Upload className="w-5 h-5" />
                      {t.uploadPhoto}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={capturePhoto}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                      >
                        {t.takePhoto}
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-200">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t.photoTip}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <img src={photoPreview} alt="Preview" className="w-full rounded-lg" />
                <button
                  onClick={resetPhoto}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <RefreshCw className="w-5 h-5" />
                  {t.retake}
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Style Definition */}
          <div className={`bg-gray-800/50 backdrop-blur-sm border-2 border-dashed ${step >= 2 ? 'border-purple-500' : 'border-gray-600'} rounded-xl p-6 transition-all duration-300 ${step === 2 ? 'ring-2 ring-purple-500' : ''} ${!photoPreview ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t.step2Title}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.themeLabel}</label>
                <textarea
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder={t.themePlaceholder}
                  className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                  rows="3"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">{t.exampleThemes}</p>
                <div className="flex flex-wrap gap-2">
                  {t.themeExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => selectExampleTheme(example)}
                      className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePortrait}
                disabled={!theme || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
              >
                <Sparkles className="w-6 h-6" />
                {t.generatePortrait}
              </button>
            </div>
          </div>

          {/* Step 3: Result Review */}
          <div className={`bg-gray-800/50 backdrop-blur-sm border-2 border-dashed ${step >= 3 ? 'border-purple-500' : 'border-gray-600'} rounded-xl p-6 transition-all duration-300 ${step === 3 ? 'ring-2 ring-purple-500' : ''}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              {t.step3Title}
            </h2>

            <div className="space-y-4">
              {isGenerating && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
                  <p className="text-center text-gray-300 animate-pulse">{t.generating}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-3">
                  <p className="flex items-start gap-2 text-red-200">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{error.message}</span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setError(null)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300"
                    >
                      {t.tryAgain}
                    </button>
                    {error.type === 'no_face' && (
                      <button
                        onClick={resetPhoto}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        {t.backToPhoto}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {finalImage && !isGenerating && (
                <>
                  <div className="rounded-lg overflow-hidden border-2 border-purple-500/50">
                    <img src={finalImage} alt="Generated" className="w-full" />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={downloadImage}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      {t.downloadImage}
                    </button>

                    <button
                      onClick={shareImage}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                      {t.shareOnSocial}
                    </button>

                    <button
                      onClick={copyShareText}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      {t.copyShareText}
                    </button>
                  </div>

                  {!story && !isGeneratingStory && (
                    <button
                      onClick={generateStory}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Book className="w-5 h-5" />
                      {t.generateStory}
                    </button>
                  )}

                  {isGeneratingStory && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3">
                      <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
                      <p className="text-center text-gray-300 animate-pulse text-sm">{t.generatingStory}</p>
                    </div>
                  )}

                  {story && (
                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-4 space-y-3">
                      <p className="text-sm leading-relaxed text-gray-200">{story}</p>
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          onClick={copyStory}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          <Copy className="w-4 h-4" />
                          {t.copyStory}
                        </button>
                        <button
                          onClick={copyShareTextWithStory}
                          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          <Copy className="w-4 h-4" />
                          {t.copyWithStory}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 bg-black/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            {t.subtitle} • {t.festivalTheme}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

// ktfApp_openrouter_full.jsx
// OpenRouter API entegrasyonu (Vercel Environment Variable destekli tam sürüm)
// Orijinal KTF Studio uygulaması korunmuştur; yalnızca Gemini API çağrıları OpenRouter formatına çevrilmiştir.

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Zap, Upload, AlertTriangle, Download, Share2, BookOpen, BrainCircuit, Sparkles, Copy, RefreshCw, Languages } from 'lucide-react';

// --- Ortam değişkeni ---
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_IMAGE = "google/gemini-2.0-flash-thinking-exp:free";
const MODEL_STORY = "google/gemini-2.0-flash-thinking-exp:free";

// --- Yardımcı fonksiyon: OpenRouter istekleri ---
async function callOpenRouterAPI(prompt, imageBase64 = null, type = 'text') {
  const headers = {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  };

  let messages = [];

  if (type === 'image' && imageBase64) {
    messages = [
      { role: 'system', content: 'You are an AI that generates artistic base64 images from user prompts.' },
      { role: 'user', content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: `data:image/jpeg;base64,${imageBase64}` }
        ] }
    ];
  } else {
    messages = [
      { role: 'system', content: 'You are a creative storyteller who writes short themed stories.' },
      { role: 'user', content: prompt }
    ];
  }

  const body = {
    model: type === 'image' ? MODEL_IMAGE : MODEL_STORY,
    messages
  };

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API hatası: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  return content;
}

// --- Uygulama bileşeni ---
export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [story, setStory] = useState("");
  const [liveRegionText, setLiveRegionText] = useState("");

  const handleGenerateImage = async (prompt, base64ImageData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callOpenRouterAPI(prompt, base64ImageData, 'image');
      if (result?.includes('base64')) {
        const b64 = result.match(/([A-Za-z0-9+/=]+)/)?.[1] || result;
        setGeneratedImage(`data:image/png;base64,${b64}`);
      } else {
        setGeneratedImage(result);
      }
      setLiveRegionText('Görsel başarıyla oluşturuldu.');
    } catch (err) {
      setError(err.message);
      setLiveRegionText(`Hata: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStory = async (prompt) => {
    setIsStoryLoading(true);
    setError(null);
    try {
      const festivalInfo = `3. Uluslararası Kütüphane ve Teknoloji Festivali, 30 Mart – 5 Nisan 2026 tarihleri arasında İstanbul Rami Kütüphanesi’nde “Üreten Kütüphaneler” ana temasıyla gerçekleştirilecektir.`;
      const storyPrompt = `Yaratıcı bir hikaye anlatıcısısın. '${prompt}' temalı kısa bir hikaye yaz. ${festivalInfo}`;
      const result = await callOpenRouterAPI(storyPrompt, null, 'text');
      setStory(result);
      setLiveRegionText('Hikaye başarıyla oluşturuldu.');
    } catch (err) {
      setError(err.message);
      setLiveRegionText(`Hata: ${err.message}`);
    } finally {
      setIsStoryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Kütüphane ve Teknoloji Festivali Stüdyosu (OpenRouter Entegre)</h1>
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(file);
      }} className="mb-4" />

      <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="örn: Sherlock Holmes gibi gizemli bir karakter" className="text-black p-2 rounded mb-4 w-full max-w-md" />

      <div className="flex gap-4">
        <button onClick={() => handleGenerateImage(userPrompt, imageSrc?.split(',')[1])} disabled={!imageSrc} className="bg-purple-600 px-4 py-2 rounded disabled:opacity-40">Görsel Üret</button>
        <button onClick={() => handleGenerateStory(userPrompt)} disabled={!userPrompt} className="bg-blue-600 px-4 py-2 rounded disabled:opacity-40">Hikaye Üret</button>
      </div>

      {isLoading && <p className="mt-4 text-yellow-300">Görsel üretiliyor...</p>}
      {isStoryLoading && <p className="mt-4 text-yellow-300">Hikaye yazılıyor...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {generatedImage && (
        <div className="mt-6">
          <img src={generatedImage} alt="Üretilen Görsel" className="max-w-md rounded-lg" />
        </div>
      )}

      {story && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg max-w-md">
          <h3 className="font-semibold mb-2">Üretilen Hikaye</h3>
          <p className="whitespace-pre-wrap text-gray-300">{story}</p>
        </div>
      )}

      <div className="sr-only" aria-live="polite" aria-atomic="true">{liveRegionText}</div>
    </div>
  );
}

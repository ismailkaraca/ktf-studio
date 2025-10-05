<!DOCTYPE html>
<html lang="tr" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uluslararası Kütüphane ve Teknoloji Festivali 2026</title>
    <link rel="icon" type="image/x-icon" href="https://www.kutuphaneveteknoloji.com/wp-content/uploads/ktbfavicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        // Tailwind CSS için karanlık mod yapılandırması
        tailwind.config = {
            darkMode: 'class',
        }
    </script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        /* Custom Styles */
        :root {
            --primary-color: #9c27b0;
            --secondary-color: #0693e3;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: 'Inter', sans-serif;
        }
        #hero-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        /* Scroll Animation */
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-animate.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        .gemini-loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #9c27b0;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes wiggle {
            0%, 100% { transform: rotate(-1.5deg); }
            50% { transform: rotate(1.5deg); }
        }
        .animate-wiggle-continuous {
            animation: wiggle 2s ease-in-out infinite;
        }
    </style>
</head>
<body class="antialiased bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">

    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm relative">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#home" class="flex items-center space-x-2">
                <span class="text-xl font-bold tracking-tight" style="line-height: 1.2;" data-lang="tr">3. Kütüphane ve Teknoloji Festivali</span>
                <span class="text-xl font-bold tracking-tight hidden" style="line-height: 1.2;" data-lang="en">3rd Library and Technology Festival</span>
            </a>
            <div class="hidden md:flex items-center space-x-8">
                <a href="#ktf-studio-cta" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium inline-flex items-center">
                    <i data-lucide="sparkles" class="w-4 h-4 mr-2"></i>
                    <span data-lang="tr">KTF Stüdyo</span>
                    <span data-lang="en" class="hidden">LTF Studio</span>
                </a>
                <a href="#vision" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Vizyon</a>
                <a href="#vision" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Vision</a>
                <a href="#video-gallery" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Videolar</a>
                <a href="#video-gallery" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Videos</a>
                <a href="#archive" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Arşiv</a>
                <a href="#archive" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Archive</a>
                <a href="#program" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Program</a>
                <a href="#program" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Program</a>
                <a href="#participation" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Kayıt Ol</a>
                <a href="#participation" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Participation</a>
          
                <a href="#articles" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Makaleler</a>
                <a href="#articles" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Articles</a>
                <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">İletişim</a>
                <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Contact</a>
                <div class="relative calendar-wrapper">
                    <button type="button" class="calendar-button text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium inline-flex items-center">
                        <span data-lang="tr">Takvime Ekle</span>
                        <span data-lang="en" class="hidden">Add to Calendar</span>
                        <i data-lucide="chevron-down" class="ml-1 h-4 w-4"></i>
                    </button>
                    <div class="calendar-dropdown origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden z-10">
                         <div class="py-1" role="none">
                            <a href="#" target="_blank" rel="noopener noreferrer" class="google-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Google Calendar</a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="outlook-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Outlook Calendar</a>
                            <a href="#" class="ics-download-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="download" class="w-4 h-4 mr-2"></i>Apple Calendar (.ics)</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-full text-sm">
                    <button id="lang-tr" class="px-3 py-1 rounded-full bg-purple-600 text-white">TR</button>
                    <button id="lang-en" class="px-3 py-1 rounded-full">EN</button>
                </div>
                <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <i data-lucide="sun" class="block dark:hidden"></i>
                    <i data-lucide="moon" class="hidden dark:block"></i>
                </button>
                <button id="mobile-menu-button" class="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                    <i data-lucide="menu" id="menu-icon"></i>
                    <i data-lucide="x" id="close-icon" class="hidden"></i>
                </button>
            </div>
        </nav>
        <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-md">
            <div class="flex flex-col space-y-4 p-6">
                
                <a href="#ktf-studio-cta" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium inline-flex items-center">
                    <i data-lucide="sparkles" class="w-4 h-4 mr-2"></i>
                    <span data-lang="tr">KTF Stüdyo</span>
                    <span data-lang="en" class="hidden">LTF Studio</span>
                </a>
                <a href="#vision" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Vizyon</a>
                <a href="#vision" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Vision</a>
                <a href="#video-gallery" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Videolar</a>
                <a href="#video-gallery" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Videos</a>
                <a href="#archive" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Arşiv</a>
                <a href="#archive" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Archive</a>
                <a href="#program" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Program</a>
                <a href="#program" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Program</a>
                <a href="#participation" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Kayıt Ol</a>
                <a href="#participation" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Participation</a>
                
                <a href="#articles" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">Makaleler</a>
                <a href="#articles" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Articles</a>
                <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium" data-lang="tr">İletişim</a>
                <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium hidden" data-lang="en">Contact</a>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div class="relative calendar-wrapper">
                         <button type="button" class="calendar-button text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium inline-flex items-center w-full">
                            <span data-lang="tr">Takvime Ekle</span>
                            <span data-lang="en" class="hidden">Add to Calendar</span>
                            <i data-lucide="chevron-down" class="ml-auto h-4 w-4"></i>
                        </button>
                         <div class="calendar-dropdown mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden z-10">
                             <div class="py-1" role="none">
                                <a href="#" target="_blank" rel="noopener noreferrer" class="google-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Google Calendar</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" class="outlook-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Outlook Calendar</a>
                                <a href="#" class="ics-download-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="download" class="w-4 h-4 mr-2"></i>Apple Calendar (.ics)</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section id="home" class="relative py-20 md:py-32 overflow-hidden">
        <canvas id="hero-canvas"></canvas>
        <div class="relative z-10 container mx-auto px-6 text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400" data-lang="tr" style="line-height: 1.18;">Geleceğin Kütüphanesi, Bugünün Teknolojisiyle</h1>
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 hidden text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400" data-lang="en" style="line-height: 1.18;">The Library of the Future, with Today's Technology</h1>
            
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8" data-lang="tr">3. Uluslararası Kütüphane ve Teknoloji Festivali</p>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 hidden" data-lang="en">3rd International Library and Technology Festival</p>

            <div class="mt-[-1rem] mb-8 text-sm text-gray-600 dark:text-gray-400">
                <p data-lang="tr">T.C. Kültür ve Turizm Bakanlığı Kütüphaneler ve Yayımlar Genel Müdürlüğü tarafından organize edilmektedir.</p>
                <p class="hidden" data-lang="en">Organized by the Republic of Turkiye Ministry of Culture and Tourism, General Directorate of Libraries and Publications.</p>
            </div>

            <div class="mb-12 flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
                <a href="#ktf-studio-cta" class="animate-wiggle-continuous w-full inline-flex items-center justify-center px-6 py-4 font-semibold text-white bg-gradient-to-r from-[#bf24c6] to-[#241bc6] hover:from-[#bf24c6]/90 hover:to-[#241bc6]/90 rounded-xl shadow-lg">
                    <i data-lucide="sparkles" class="w-5 h-5 mr-3"></i>
                    <span data-lang="tr">Festivale Özel Yapay Zeka Görselini Oluştur</span>
                    <span data-lang="en" class="hidden">Create Your Festival AI Image</span>
                </a>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <a href="#participation" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto" data-lang="tr">Kayıt Ol</a>
                    <a href="#participation" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto hidden" data-lang="en">Join Us</a>
                    
                    <div class="relative inline-block text-left w-full sm:w-auto calendar-wrapper">
                        <div>
                            <button type="button" class="calendar-button inline-flex justify-center w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-3 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-purple-500">
                                <i data-lucide="calendar-plus" class="mr-2 -ml-1 h-5 w-5"></i>
                                <span data-lang="tr">Takvime Ekle</span>
                                <span data-lang="en" class="hidden">Add to Calendar</span>
                                <i data-lucide="chevron-down" class="ml-2 -mr-1 h-5 w-5"></i>
                            </button>
                        </div>
                        <div class="calendar-dropdown origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden z-10" role="menu">
                            <div class="py-1" role="none">
                                <a href="#" target="_blank" rel="noopener noreferrer" class="google-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Google Calendar</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" class="outlook-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Outlook Calendar</a>
                                <a href="#" class="ics-download-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem"><i data-lucide="download" class="w-4 h-4 mr-2"></i>Apple Calendar (.ics)</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="countdown" class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div class="text-center p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <span id="days" class="block text-4xl md:text-6xl font-bold text-purple-600 dark:text-purple-400">0</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300" data-lang="tr">Gün</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300 hidden" data-lang="en">Days</span>
                </div>
                <div class="text-center p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <span id="hours" class="block text-4xl md:text-6xl font-bold text-purple-600 dark:text-purple-400">0</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300" data-lang="tr">Saat</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300 hidden" data-lang="en">Hours</span>
                </div>
                <div class="text-center p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <span id="minutes" class="block text-4xl md:text-6xl font-bold text-purple-600 dark:text-purple-400">0</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300" data-lang="tr">Dakika</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300 hidden" data-lang="en">Minutes</span>
                </div>
                <div class="text-center p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <span id="seconds" class="block text-4xl md:text-6xl font-bold text-purple-600 dark:text-purple-400">0</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300" data-lang="tr">Saniye</span>
                    <span class="text-sm md:text-base text-gray-700 dark:text-gray-300 hidden" data-lang="en">Seconds</span>
                </div>
            </div>
            <p class="mt-6 font-semibold text-lg" data-lang="tr">30 Mart – 5 Nisan 2026</p>
            <p class="mt-6 font-semibold text-lg hidden" data-lang="en">March 30 – April 5, 2026</p>
        </div>
    </section>

    <!-- ========= GÜNCELLENMİŞ KTF STÜDYO TANITIM BÖLÜMÜ BAŞLANGICI ========= -->
    <section id="ktf-studio-cta" class="bg-gray-900 text-gray-300 py-20 sm:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
                
                <!-- Sol Sütun -->
                <div class="md:col-span-2 space-y-8">
                    <!-- Rozet -->
                    <div class="inline-flex items-center space-x-2 text-sm font-semibold bg-[#241bc6]/20 text-[#bf24c6] px-3 py-1 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true"><path d="m12 3-1.9 4.2-4.3.6 3.1 3- .7 4.2 3.8-2 3.8 2-.7-4.2 3.1-3-4.3-.6L12 3Z"/><path d="M5 21v-3.4c0-1.3 1-2.6 2.4-2.6h0c1.4 0 2.4 1.3 2.4 2.6V21"/><path d="M14.2 21v-3.4c0-1.3 1-2.6 2.4-2.6h0c1.4 0 2.4 1.3 2.4 2.6V21"/></svg>
                        <span>Yapay Zeka Destekli</span>
                    </div>

                    <!-- Başlık ve Lead Metin -->
                    <div class="space-y-4">
                        <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#bf24c6] to-[#241bc6] bg-clip-text text-transparent">KTF Stüdyo: Sanat ve Yapay Zekâ Buluşması</h2>
                        <p class="text-lg text-gray-300 max-w-3xl">
                            Festival ruhunu kendi fotoğrafınızla birleştirip, sevdiğiniz edebî karakterden ilham alan yapay zekâ destekli sanatsal bir portre ve ona eşlik eden kısa bir hikâye oluşturun. Tek tıkla indirin, sosyal medyada paylaşın, festivale kendi tarzınızla katılın!
                        </p>
                    </div>

                    <!-- Iframe Alanı -->
                    <div class="w-full rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
                        <iframe src="https://ktf-studio.vercel.app/" frameborder="0" class="w-full" style="height: 1200px;" scrolling="no" title="KTF Stüdyo Yapay Zeka Uygulaması"></iframe>
                    </div>

                    <!-- Özellik Listesi -->
                    <ul class="space-y-4">
                        <li class="flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#bf24c6] flex-shrink-0 mt-1" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6Z"/><path d="M12 19a6 6 0 0 0-6-6 6 6 0 0 0-6 6"/><path d="M12 13a6 6 0 0 0 6 6 6 6 0 0 0 6-6"/></svg>
                            <div>
                                <h4 class="font-semibold text-gray-100">Sanatsal Portre</h4>
                                <p class="text-sm text-gray-400">Kamera ile çek veya .jpg/.png yükle; “Sherlock Holmes gibi” benzeri bir tema gir, KTF Stüdyo kütüphane + teknoloji temalı özgün görsel üretsin.</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#bf24c6] flex-shrink-0 mt-1" aria-hidden="true"><path d="M15 6.5A3.5 3.5 0 0 0 8.5 3H6v18h12v-6.5a3.5 3.5 0 0 0-3.5-3.5Z"/></svg>
                            <div>
                                <h4 class="font-semibold text-gray-100">Hikâye Yazdır</h4>
                                <p class="text-sm text-gray-400">Portre hazır olunca tek tıkla festival bağlamında 3 paragraflık kısa bir hikâye oluştur.</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#bf24c6] flex-shrink-0 mt-1" aria-hidden="true"><path d="M12.25 4C12.25 4 12.25 4 12.25 4C12.25 4 12.25 4 12.25 4C10 4 8 6 8 8.5C8 10.5 9.5 12.5 12.25 15C15 12.5 16.5 10.5 16.5 8.5C16.5 6 14.5 4 12.25 4Z"/><path d="M12.25 4L12.25 4C12.25 4 12.25 4 12.25 4C12.25 4 12.25 4 12.25 4C10 4 8 6 8 8.5C8 10.5 9.5 12.5 12.25 15C15 12.5 16.5 10.5 16.5 8.5C16.5 6 14.5 4 12.25 4Z"/><path d="M4 20h16.5"/><path d="M4 20h16.5"/><path d="M4 20h16.5"/><path d="M9.5 11.5l-3 3"/><path d="M9.5 11.5l-3 3"/><path d="M15 11.5l3 3"/><path d="M15 11.5l3 3"/></svg>
                            <div>
                                <h4 class="font-semibold text-gray-100">Festival Metin Katmanları</h4>
                                <p class="text-sm text-gray-400">“Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali’ndeyim. Hem de [Karakter] olarak!” gibi dinamik metinler görsel üzerine, her arka planda okunaklı yerleşir.</p>
                            </div>
                        </li>
                         <li class="flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#bf24c6] flex-shrink-0 mt-1" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            <div>
                                <h4 class="font-semibold text-gray-100">İndir & Paylaş</h4>
                                <p class="text-sm text-gray-400">Final görseli .png indir; Instagram, Facebook, X, Threads, LinkedIn; ayrıca WhatsApp/Telegram için hazır iki metin seçeneği: standart ve hikâyeli.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Sağ Sütun -->
                <div class="space-y-8">
                    <!-- 3 Adım Kartı -->
                    <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 shadow-xl">
                        <h3 class="text-xl font-bold mb-4 text-white">3 Adımda Kendi Eserini Yarat</h3>
                        <ol class="space-y-4">
                            <li class="flex items-start space-x-3">
                                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#241bc6] text-white font-bold rounded-full">1</div>
                                <div>
                                    <h4 class="font-semibold text-gray-200">Fotoğrafı ekle</h4>
                                    <p class="text-sm text-gray-400">Kamera ile çek veya .jpg/.png yükle.</p>
                                </div>
                            </li>
                             <li class="flex items-start space-x-3">
                                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#241bc6] text-white font-bold rounded-full">2</div>
                                <div>
                                    <h4 class="font-semibold text-gray-200">Karakteri yaz</h4>
                                    <p class="text-sm text-gray-400">Örn. “Sherlock Holmes gibi” → Portreyi oluştur.</p>
                                </div>
                            </li>
                             <li class="flex items-start space-x-3">
                                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#241bc6] text-white font-bold rounded-full">3</div>
                                <div>
                                    <h4 class="font-semibold text-gray-200">İndir & Paylaş</h4>
                                    <p class="text-sm text-gray-400">İstersen hikâyeni yazdır; görseli kaydet ve tek tıkla paylaş.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <!-- Örnek Önizleme -->
                     <div class="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
                        <a href="https://www.kutuphaneveteknoloji.com/wp-content/uploads/2025/10/ktf-studyosu-gorseli.png" target="_blank" rel="noopener noreferrer" class="block relative">
                            <img src="https://www.kutuphaneveteknoloji.com/wp-content/uploads/2025/10/ktf-studyosu-gorseli.png" alt="KTF Stüdyo Örnek Portre" class="w-full h-auto block">
                            <div class="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                                <span data-lang="tr">Örnek Görsel</span>
                                <span data-lang="en" class="hidden">Sample Image</span>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- ========= GÜNCELLENMİŞ KTF STÜDYO TANITIM BÖLÜMÜ SONU ========= -->


    <section id="robot-invitation" class="py-12 bg-gray-50 dark:bg-gray-900 text-center">
        <div class="container mx-auto px-6">
            <div class="scroll-animate mb-8">
                <h2 class="text-3xl md:text-4xl font-extrabold" data-lang="tr">Robotumuz Bilge Sizleri Festivale Davet Etmekten Mutluluk Duyar</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold hidden" data-lang="en">Our Robot Bilge is Delighted to Invite You to the Festival</h2>
            </div>
            <div class="relative w-full max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-2xl" style="padding-top: 56.25%;">
                <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/iaXZNO5_M4E" title="Robotumuz Bilge Davet Videosu" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    </section>

    <section id="promo-video" class="py-12 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate mb-8">
                <h2 class="text-3xl md:text-4xl font-extrabold" data-lang="tr">Geçmişten Bir Anı: 2. KTF Tanıtım Filmi</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold hidden" data-lang="en">A Look Back: 2nd LTF Promo Video</h2>
            </div>
            <div id="player-container" class="relative w-full overflow-hidden shadow-2xl rounded-2xl" style="padding-top: 56.25%;">
                <div id="player" class="absolute top-0 left-0 w-full h-full"></div>
                <button id="video-mute-button" class="absolute bottom-4 right-4 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition">
                    <i id="volume-icon" data-lucide="volume-x"></i>
                </button>
            </div>
        </div>
    </section>
    
    <section id="video-gallery" class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">Video Galerisi</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">Video Gallery</h2>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" data-lang="tr">Geçmiş festivallerin unutulmaz anlarını yeniden yaşayın.</p>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 hidden" data-lang="en">Relive the unforgettable moments from past festivals.</p>
            </div>

            <div class="flex justify-center mb-8 scroll-animate">
                <div class="flex space-x-2 bg-white dark:bg-gray-700 p-2 rounded-xl shadow">
                    <button class="video-gallery-tab px-6 py-2 rounded-lg" data-year="2025" data-lang="tr">2025 Videoları</button>
                    <button class="video-gallery-tab px-6 py-2 rounded-lg" data-year="2025" data-lang="en">2025 Videos</button>
                    <button class="video-gallery-tab px-6 py-2 rounded-lg" data-year="2024" data-lang="tr">2024 Videoları</button>
                    <button class="video-gallery-tab px-6 py-2 rounded-lg" data-year="2024" data-lang="en">2024 Videos</button>
                </div>
            </div>

            <div id="video-gallery-content">
                <div class="video-gallery-year-content grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-year="2025">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden scroll-animate">
                        <div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/DI2zR6npWhQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        <div class="p-4"><h3 class="font-semibold" data-lang="tr">2. Uluslararası Kütüphane ve Teknoloji Festivali - 2025</h3><h3 class="font-semibold hidden" data-lang="en">2nd International Library and Technology Festival - 2025</h3></div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden scroll-animate">
                        <div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/mvCGCoYnGHM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        <div class="p-4"><h3 class="font-semibold" data-lang="tr">2. Uluslararası Kütüphane ve Teknoloji Festivali - 2025 Nasıl Geçti</h3><h3 class="font-semibold hidden" data-lang="en">How was the 2nd International Library and Technology Festival - 2025</h3></div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden scroll-animate">
                        <div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/PYVO3gWnung" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        <div class="p-4"><h3 class="font-semibold" data-lang="tr">2. Uluslararası Kütüphane ve Teknoloji Festivali hakkında Genel Müdürümüz Sn. Taner BEYOĞLU’nun Görüşleri</h3><h3 class="font-semibold hidden" data-lang="en">Our General Director Mr. Taner BEYOĞLU’s Views on the 2nd International Library and Technology Festival</h3></div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden scroll-animate">
                        <div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/1fQxIpchZRc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        <div class="p-4"><h3 class="font-semibold" data-lang="tr">2. Uluslararası Kütüphane ve Teknoloji Festivali'nden - (İlke Haber Ajansı)</h3><h3 class="font-semibold hidden" data-lang="en">From the 2nd International Library and Technology Festival - (İlke News Agency)</h3></div>
                    </div>
                </div>

                <div class="video-gallery-year-content grid md:grid-cols-2 lg:grid-cols-3 gap-8 hidden" data-year="2024">
                     <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden scroll-animate">
                        <div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/ST41o-si2Sg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        <div class="p-4"><h3 class="font-semibold" data-lang="tr">1. Uluslararası Kütüphane ve Teknoloji Festivali - 2024 Tanıtım Videosu</h3><h3 class="font-semibold hidden" data-lang="en">1st International Library and Technology Festival - 2024 Promo Video</h3></div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden scroll-animate">
                        <div class="relative w-full" style="padding-top: 56.25%;"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/Xgzk1OcD9CY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        <div class="p-4"><h3 class="font-semibold" data-lang="tr">1. Uluslararası Kütüphane ve Teknoloji Festivali - 2024 Nasıl Geçti</h3><h3 class="font-semibold hidden" data-lang="en">How was the 1st International Library and Technology Festival - 2024</h3></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="vision" class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">2026 Vizyonu: Akıllı Kütüphaneler Çağı</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">2026 Vision: The Age of Smart Libraries</h2>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" data-lang="tr">
                    Yapay zekâ, dijital dönüşüm ve inovasyonun kesişim noktasında, kütüphanelerin toplumsal rolünü yeniden tanımlıyoruz. 2026'da "Üreten Kütüphaneler" temasını bir adım öteye taşıyarak, bilgiye erişimi akıllı ve etkileşimli deneyimlere dönüştürüyoruz.
                </p>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 hidden" data-lang="en">
                    At the intersection of artificial intelligence, digital transformation, and innovation, we are redefining the social role of libraries. In 2026, we take the "Producing Libraries" theme a step further, transforming access to information into smart and interactive experiences.
                </p>
            </div>
        </div>
    </section>

    <section id="archive" class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">Geçmiş Festivaller Arşivi</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">Past Festivals Archive</h2>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" data-lang="tr">Önceki yılların heyecanını ve birikimini keşfedin.</p>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 hidden" data-lang="en">Discover the excitement and knowledge from previous years.</p>
            </div>
            <div class="flex justify-center mb-8 scroll-animate">
                <div class="flex space-x-2 bg-white dark:bg-gray-700 p-2 rounded-xl shadow">
                    <button class="archive-tab active px-6 py-2 rounded-lg" data-year="2025">2025</button>
                    <button class="archive-tab px-6 py-2 rounded-lg" data-year="2024">2024</button>
                </div>
            </div>

            <div id="archive-content" class="space-y-12">
                <div class="archive-year-content" data-year="2025">
                    <div class="scroll-animate">
                        <h3 class="text-2xl font-bold mb-6 text-center" data-lang="tr">2025: Üreten Kütüphaneler</h3>
                        <h3 class="text-2xl font-bold mb-6 text-center hidden" data-lang="en">2025: Producing Libraries</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/9c27b0/FFFFFF?text=Atölye+2025" alt="2025 Atölye" class="w-full h-full object-cover"></div>
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/0693e3/FFFFFF?text=Konferans+2025" alt="2025 Konferans" class="w-full h-full object-cover"></div>
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/9c27b0/FFFFFF?text=Fuar+2025" alt="2025 Fuar Alanı" class="w-full h-full object-cover"></div>
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/0693e3/FFFFFF?text=Katılımcılar+2025" alt="2025 Katılımcılar" class="w-full h-full object-cover"></div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-8 text-center">
                            <div>
                                <h4 class="text-xl font-semibold mb-4" data-lang="tr">Poster Sunumları</h4>
                                <h4 class="text-xl font-semibold mb-4 hidden" data-lang="en">Poster Presentations</h4>
                                <a href="https://www.kutuphaneveteknoloji.com/ktf-2024/poster-sunumlari/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 w-full max-w-xs mx-auto flex items-center justify-center space-x-2"><i data-lucide="download"></i> <span data-lang="tr">Tümünü İndir</span><span class="hidden" data-lang="en">Download All</span></a>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-4" data-lang="tr">Sunum PDF'leri</h4>
                                <h4 class="text-xl font-semibold mb-4 hidden" data-lang="en">Presentation PDFs</h4>
                                <a href="https://www.kutuphaneveteknoloji.com/ktf-2024/2025-sunumlar/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 w-full max-w-xs mx-auto flex items-center justify-center space-x-2"><i data-lucide="download-cloud"></i> <span data-lang="tr">Tümünü İndir</span><span class="hidden" data-lang="en">Download All</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="archive-year-content hidden" data-year="2024">
                   <div class="scroll-animate">
                        <h3 class="text-2xl font-bold mb-6 text-center" data-lang="tr">2024: Dijital Ufuklar</h3>
                        <h3 class="text-2xl font-bold mb-6 text-center hidden" data-lang="en">2024: Digital Horizons</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/5e35b1/FFFFFF?text=Panel+2024" alt="2024 Panel" class="w-full h-full object-cover"></div>
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/039be5/FFFFFF?text=Networking+2024" alt="2024 Networking" class="w-full h-full object-cover"></div>
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/5e35b1/FFFFFF?text=Açılış+2024" alt="2024 Açılış" class="w-full h-full object-cover"></div>
                            <div class="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"><img src="https://placehold.co/600x400/039be5/FFFFFF?text=Ödül+Töreni+2024" alt="2024 Ödül Töreni" class="w-full h-full object-cover"></div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-8 text-center">
                           <div>
                                <h4 class="text-xl font-semibold mb-4" data-lang="tr">Poster Sunumları</h4>
                                <h4 class="text-xl font-semibold mb-4 hidden" data-lang="en">Poster Presentations</h4>
                                <a href="https://www.kutuphaneveteknoloji.com/ktf-2024/2024-poster-sunumlari/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 w-full max-w-xs mx-auto flex items-center justify-center space-x-2"><i data-lucide="download"></i> <span data-lang="tr">Tümünü İndir</span><span class="hidden" data-lang="en">Download All</span></a>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-4" data-lang="tr">Sunum PDF'leri</h4>
                                <h4 class="text-xl font-semibold mb-4 hidden" data-lang="en">Presentation PDFs</h4>
                                <a href="https://www.kutuphaneveteknoloji.com/ktf-2024/2024-sunumlar/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 w-full max-w-xs mx-auto flex items-center justify-center space-x-2"><i data-lucide="download-cloud"></i> <span data-lang="tr">Tümünü İndir</span><span class="hidden" data-lang="en">Download All</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="program" class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">2026 Programı</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">2026 Program</h2>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" data-lang="tr">Bilgi, inovasyon ve sanatla dolu bir hafta sizi bekliyor.</p>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 hidden" data-lang="en">A week full of knowledge, innovation, and art awaits you.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate">
                    <div class="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-6">
                        <i data-lucide="brain-circuit" class="w-8 h-8 text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3" data-lang="tr">Atölyeler</h3>
                    <h3 class="text-xl font-bold mb-3 hidden" data-lang="en">Workshops</h3>
                    <p class="text-gray-600 dark:text-gray-400" data-lang="tr">AI, yazılım, robotik, tasarım ve girişimcilik üzerine uygulamalı eğitimler.</p>
                    <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Hands-on training in AI, software, robotics, design, and entrepreneurship.</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 100ms;">
                    <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6">
                        <i data-lucide="mic" class="w-8 h-8 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3" data-lang="tr">Konferans ve Paneller</h3>
                    <h3 class="text-xl font-bold mb-3 hidden" data-lang="en">Conferences & Panels</h3>
                    <p class="text-gray-600 dark:text-gray-400" data-lang="tr">Uluslararası konuşmacılarla kütüphaneciliğin geleceği tartışılacak.</p>
                    <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">The future of librarianship discussed with international speakers.</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 200ms;">
                    <div class="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-6">
                        <i data-lucide="lightbulb" class="w-8 h-8 text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3" data-lang="tr">Teknoloji Fuarı</h3>
                    <h3 class="text-xl font-bold mb-3 hidden" data-lang="en">Technology Fair</h3>
                    <p class="text-gray-600 dark:text-gray-400" data-lang="tr">En yeni teknolojileri deneyimleyeceğiniz demo ve stant alanları.</p>
                    <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Demo and booth areas to experience the latest technologies.</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 300ms;">
                    <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6">
                        <i data-lucide="music" class="w-8 h-8 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3" data-lang="tr">Sanat ve Kültür</h3>
                    <h3 class="text-xl font-bold mb-3 hidden" data-lang="en">Arts & Culture</h3>
                    <p class="text-gray-600 dark:text-gray-400" data-lang="tr">Konserler, dijital sanat sergileri ve interaktif performanslar.</p>
                    <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Concerts, digital art exhibitions, and interactive performances.</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 400ms;">
                    <div class="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-6">
                        <i data-lucide="briefcase" class="w-8 h-8 text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3" data-lang="tr">Kariyer Simülasyonu</h3>
                    <h3 class="text-xl font-bold mb-3 hidden" data-lang="en">Career Simulation</h3>
                    <p class="text-gray-600 dark:text-gray-400" data-lang="tr">Geleceğin mesleklerini deneyimleme ve staj fırsatları.</p>
                    <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Experience the professions of the future and find internship opportunities.</p>
                </div>
                 <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 500ms;">
                    <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6">
                        <i data-lucide="users" class="w-8 h-8 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3" data-lang="tr">İş Birliği ve Ağ Kurma</h3>
                    <h3 class="text-xl font-bold mb-3 hidden" data-lang="en">Collaboration & Networking</h3>
                    <p class="text-gray-600 dark:text-gray-400" data-lang="tr">Akademisyenler, teknoloji liderleri ve kütüphanecilerle tanışın.</p>
                    <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Meet academics, technology leaders, and librarians.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="participation" class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="scroll-animate">
                    <h2 class="text-3xl md:text-4xl font-extrabold mb-4 text-left" data-lang="tr">Yerinizi Ayırtın!</h2>
                    <h2 class="text-3xl md:text-4xl font-extrabold mb-4 text-left hidden" data-lang="en">Reserve Your Spot!</h2>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6" data-lang="tr">
                        Bu teknoloji ve kültür buluşmasının bir parçası olun. Kütüphaneci, öğrenci, teknoloji uzmanı veya sadece bir meraklı... Herkes için bir yer var!
                    </p>
                     <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 hidden" data-lang="en">
                        Be a part of this technology and culture gathering. Whether you are a librarian, student, tech expert, or just curious... There's a place for everyone!
                    </p>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <i data-lucide="user-check" class="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0"></i>
                            <div>
                                <h4 class="font-bold" data-lang="tr">Kimler Katılabilir?</h4>
                                <h4 class="font-bold hidden" data-lang="en">Who Can Attend?</h4>
                                <p class="text-gray-600 dark:text-gray-400" data-lang="tr">Kütüphaneciler, akademisyenler, öğrenciler, teknoloji firmaları, girişimciler, sanatçılar.</p>
                                <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Librarians, academics, students, tech companies, entrepreneurs, artists.</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <i data-lucide="star" class="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0"></i>
                            <div>
                                <h4 class="font-bold" data-lang="tr">Neden Katılmalısınız?</h4>
                                <h4 class="font-bold hidden" data-lang="en">Why Should You Attend?</h4>
                                <p class="text-gray-600 dark:text-gray-400" data-lang="tr">Yeni fikirler edinin, profesyonel ağınızı genişletin ve geleceği şekillendiren projelere tanık olun.</p>
                                <p class="text-gray-600 dark:text-gray-400 hidden" data-lang="en">Gain new ideas, expand your professional network, and witness projects shaping the future.</p>
                                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <h5 class="font-semibold mb-2" data-lang="tr">✨ Size Özel Nedenleri Keşfedin</h5>
                                    <h5 class="font-semibold mb-2 hidden" data-lang="en">✨ Discover Personalized Reasons</h5>
                                    <div class="flex flex-col sm:flex-row gap-2">
                                        <select id="user-role-selector" class="w-full sm:w-auto flex-grow px-3 py-2 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                            <option value="Kütüphaneci" data-lang="tr">Kütüphaneci</option>
                                            <option value="Kütüphane Yöneticisi" data-lang="tr">Kütüphane Yöneticisi</option>
                                            <option value="Öğrenci" data-lang="tr">Öğrenci</option>
                                            <option value="Yazılım Geliştirici" data-lang="tr">Yazılım Geliştirici</option>
                                            <option value="Akademisyen" data-lang="tr">Akademisyen</option>
                                            <option value="Girişimci" data-lang="tr">Girişimci</option>
                                            
                                            <option value="Librarian" data-lang="en" class="hidden">Librarian</option>
                                            <option value="Library Manager" data-lang="en" class="hidden">Library Manager</option>
                                            <option value="Student" data-lang="en" class="hidden">Student</option>
                                            <option value="Software Developer" data-lang="en" class="hidden">Software Developer</option>
                                            <option value="Academic" data-lang="en" class="hidden">Academic</option>
                                            <option value="Entrepreneur" data-lang="en" class="hidden">Entrepreneur</option>
                                        </select>
                                        <button id="get-personalized-reason-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 inline-flex items-center justify-center">
                                            <span data-lang="tr">Oluştur</span>
                                            <span data-lang="en" class="hidden">Generate</span>
                                        </button>
                                    </div>
                                    <div id="personalized-reason-output" class="mt-3 p-4 bg-purple-50 dark:bg-gray-700/50 rounded-lg min-h-[80px] text-sm text-gray-700 dark:text-gray-300">
                                        <p data-lang="tr">Mesleğinizi seçin ve yapay zekanın sizin için neden bu festivalde olmanız gerektiğini anlatmasını izleyin!</p>
                                        <p data-lang="en" class="hidden">Select your role and let AI tell you why you should be at this festival!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-2xl scroll-animate">
                    <h3 class="text-2xl font-bold mb-6 text-center" data-lang="tr">Online Kayıt</h3>
                    <h3 class="text-2xl font-bold mb-6 text-center hidden" data-lang="en">Online Registration</h3>
                    <form id="registration-form" class="space-y-4">
                        <div>
                            <label for="name" class="font-medium sr-only" data-lang="tr">Ad Soyad</label>
                            <label for="name" class="font-medium sr-only hidden" data-lang="en">Full Name</label>
                            <input type="text" id="name" name="name" placeholder="Ad Soyad / Full Name" class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        </div>
                        <div>
                            <label for="email" class="font-medium sr-only">Email</label>
                            <input type="email" id="email" name="email" placeholder="Email" class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        </div>
                        <div>
                            <label for="phone" class="font-medium sr-only" data-lang="tr">Telefon Numarası</label>
                            <label for="phone" class="font-medium sr-only hidden" data-lang="en">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="Telefon Numarası / Phone Number" class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        </div>
                        <div>
                             <label for="institution" class="font-medium sr-only" data-lang="tr">Kurum / Meslek</label>
                             <label for="institution" class="font-medium sr-only hidden" data-lang="en">Institution / Profession</label>
                            <input type="text" id="institution" name="institution" placeholder="Kurum / Meslek / Institution / Profession" class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-600 border-transparent focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
                        </div>
                        <button id="submit-button" type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105" data-lang="tr">Kayıt Ol</button>
                        <button id="submit-button-en" type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 hidden" data-lang="en">Register</button>
                    </form>
                    <div id="form-message" class="mt-4 text-center"></div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="py-20">
        <div class="container mx-auto px-6">
             <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">Katılımcı Deneyimleri</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">Participant Experiences</h2>
            </div>
            <div class="grid lg:grid-cols-3 gap-8">
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate">
                    <p class="text-gray-600 dark:text-gray-400 mb-4" data-lang="tr">"Teknoloji ve kütüphaneciliğin bu kadar yaratıcı bir şekilde birleştiğini görmek inanılmazdı. 2026'yı sabırsızlıkla bekliyorum!"</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 hidden" data-lang="en">"It was incredible to see technology and librarianship combined so creatively. I can't wait for 2026!"</p>
                    <p class="font-bold" data-lang="tr">- Ayşe Yılmaz, Kütüphaneci</p>
                    <p class="font-bold hidden" data-lang="en">- Ayşe Yılmaz, Librarian</p>
                </div>
                 <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 150ms;">
                    <p class="text-gray-600 dark:text-gray-400 mb-4" data-lang="en">"The workshops were fantastic. I gained practical skills that I can apply directly to my work. A truly inspiring event."</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 hidden" data-lang="tr">"Atölyeler harikaydı. İşimde doğrudan uygulayabileceğim pratik beceriler kazandım. Gerçekten ilham verici bir etkinlikti."</p>
                    <p class="font-bold" data-lang="en">- John Doe, Software Developer</p>
                    <p class="font-bold hidden" data-lang="tr">- John Doe, Yazılım Geliştirici</p>
                </div>
                 <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg scroll-animate" style="transition-delay: 300ms;">
                    <p class="text-gray-600 dark:text-gray-400 mb-4" data-lang="tr">"Öğrenci olarak kariyer simülasyonu benim için ufuk açıcı oldu. Gelecekteki mesleğim hakkında net bir vizyon kazandım."</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 hidden" data-lang="en">"As a student, the career simulation was an eye-opener for me. I gained a clear vision for my future profession."</p>
                    <p class="font-bold" data-lang="tr">- Emre Kaya, Üniversite Öğrencisi</p>
                    <p class="font-bold hidden" data-lang="en">- Emre Kaya, University Student</p>
                </div>
            </div>
        </div>
    </section>

    <section id="articles" class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">Makaleler</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">Articles</h2>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6" data-lang="tr">Kütüphanecilik ve teknoloji dünyasından uzman görüşleri ve değerlendirmeler.</p>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6 hidden" data-lang="en">Expert opinions and reviews from the world of librarianship and technology.</p>
                <p class="text-md text-center text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12" data-lang="tr">
                    Yazılarınızı bizimle paylaşmak için lütfen <a href="#contact" class="text-purple-600 dark:text-purple-400 hover:underline">iletişim</a> kurun.
                </p>
                 <p class="text-md text-center text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 hidden" data-lang="en">
                    To share your articles with us, please <a href="#contact" class="text-purple-600 dark:text-purple-400 hover:underline">contact us</a>.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <!-- Article 1 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/large-language-models-and-innovative-libraries-shaping-the-future-of-information-access/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/9c27b0/FFFFFF?text=LLM+and+Libraries" alt="Large Language Models and Innovative Libraries" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/large-language-models-and-innovative-libraries-shaping-the-future-of-information-access/" target="_blank" rel="noopener noreferrer" class="hover:underline">Large Language Models and Innovative Libraries: Shaping the Future of Information Access</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Osman KAVAF</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Product Manager of MAIN HAVELSAN</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 2 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/yapay-zekanin-kultur-ve-sanatla-iliskisi/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/0693e3/FFFFFF?text=AI+Kültür+Sanat" alt="Yapay Zekânın Kültür ve Sanatla İlişkisi" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/yapay-zekanin-kultur-ve-sanatla-iliskisi/" target="_blank" rel="noopener noreferrer" class="hover:underline">Yapay Zekânın Kültür ve Sanatla İlişkisi</a></h3>
                        <div class="flex items-center mt-4">
                             <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Dr. Öğr. Üyesi Yusuf UZUN</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Necmettin Erbakan Üniversitesi</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 3 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/bilgi-hizmetlerinde-yapay-zeka-destekli-chatbot-sohbet-robotu-kullanimi/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/5e35b1/FFFFFF?text=AI+Chatbot" alt="Bilgi Hizmetlerinde Yapay Zekâ Destekli Chatbot Kullanımı" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/bilgi-hizmetlerinde-yapay-zeka-destekli-chatbot-sohbet-robotu-kullanimi/" target="_blank" rel="noopener noreferrer" class="hover:underline">Bilgi Hizmetlerinde Yapay Zekâ Destekli Chatbot (Sohbet Robotu) Kullanımı</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Dr. İhsan Özkol</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">İzmir Kâtip Çelebi Üniversitesi</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 4 -->
                 <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/qulto-infrastructure-for-higher-education-and-research/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/9c27b0/FFFFFF?text=Qulto" alt="Qulto infrastructure for higher education and research" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/qulto-infrastructure-for-higher-education-and-research/" target="_blank" rel="noopener noreferrer" class="hover:underline">Qulto infrastructure for higher education and research</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">János Pancza</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Portfolio Manager, qulto.eu</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 5 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/the-future-of-libraries-the-meeting-of-artificial-intelligence-and-innovation/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/0693e3/FFFFFF?text=Future+of+Libraries" alt="The Future of Libraries" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/the-future-of-libraries-the-meeting-of-artificial-intelligence-and-innovation/" target="_blank" rel="noopener noreferrer" class="hover:underline">The Future of Libraries: The Meeting of Artificial Intelligence and Innovation</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Iman Magdy Khamis, MLIS, MSDS</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Library Director, Northwestern Qatar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 6 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/ai-dunyasi-yapay-zeka-okuryazarligi-egitimde-yeni-bir-rota/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/5e35b1/FFFFFF?text=AI+Dünyası" alt="AI Dünyası: Yapay Zeka Okuryazarlığı" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/ai-dunyasi-yapay-zeka-okuryazarligi-egitimde-yeni-bir-rota/" target="_blank" rel="noopener noreferrer" class="hover:underline">AI Dünyası: Yapay Zeka Okuryazarlığı Eğitimde Yeni Bir Rota</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Sevgi ARIOĞLU</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Koç Okulu Kütüphaneleri Yöneticisi</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 7 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/dil-kultur-ve-yapay-zeka-evrimi-agac-metaforu/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/9c27b0/FFFFFF?text=Ağaç+Metaforu" alt="Dil, Kültür ve Yapay Zeka Evrimi" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/dil-kultur-ve-yapay-zeka-evrimi-agac-metaforu/" target="_blank" rel="noopener noreferrer" class="hover:underline">Dil, Kültür ve Yapay Zeka Evrimi: Ağaç Metaforu</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Buket CALP</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Article 8 -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden scroll-animate transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <a href="https://www.kutuphaneveteknoloji.com/teknolojinin-kutuphanelerin-gelecegine-etkisi/" target="_blank" rel="noopener noreferrer">
                        <img src="https://placehold.co/600x400/0693e3/FFFFFF?text=Teknoloji+ve+Kütüphane" alt="Teknolojinin Kütüphanelerin Geleceğine Etkisi" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold mb-3 flex-grow"><a href="https://www.kutuphaneveteknoloji.com/teknolojinin-kutuphanelerin-gelecegine-etkisi/" target="_blank" rel="noopener noreferrer" class="hover:underline">Teknolojinin Kütüphanelerin Geleceğine Etkisi</a></h3>
                        <div class="flex items-center mt-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200">Dr. Öğr. Üyesi Ayşenur Akbulut</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Kastamonu Üniversitesi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="sponsors" class="py-20 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-6">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">Sponsorlar & Destekçiler</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">Sponsors & Supporters</h2>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" data-lang="tr">Bu festival, değerli iş birliklerimiz sayesinde mümkün olmaktadır.</p>
                <p class="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 hidden" data-lang="en">This festival is made possible by our valuable collaborations.</p>
            </div>
            <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 scroll-animate">
                <img src="https://placehold.co/200x100/CCCCCC/FFFFFF?text=Teknoloji+Şirketi" alt="Teknoloji Şirketi" class="h-16 grayscale hover:grayscale-0 transition-all">
                <img src="https://placehold.co/200x100/CCCCCC/FFFFFF?text=Üniversite" alt="Üniversite" class="h-20 grayscale hover:grayscale-0 transition-all">
                <img src="https://placehold.co/200x100/CCCCCC/FFFFFF?text=Yayıncılık+Grubu" alt="Yayıncılık Grubu" class="h-16 grayscale hover:grayscale-0 transition-all">
                <img src="https://placehold.co/200x100/CCCCCC/FFFFFF?text=İnovasyon+Merkezi" alt="İnovasyon Merkezi" class="h-16 grayscale hover:grayscale-0 transition-all">
            </div>
        </div>
    </section>

    <section id="faq" class="py-20 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6 max-w-4xl">
            <div class="text-center scroll-animate">
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4" data-lang="tr">Sıkça Sorulan Sorular</h2>
                <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-4 hidden" data-lang="en">Frequently Asked Questions</h2>
            </div>
            <div class="space-y-4 scroll-animate">
                <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <button class="w-full text-left flex justify-between items-center p-5 font-semibold text-lg cursor-pointer">
                        <span data-lang="tr">Festival ne zaman ve nerede yapılacak?</span>
                        <span class="hidden" data-lang="en">When and where will the festival take place?</span>
                        <i data-lucide="chevron-down" class="transition-transform"></i>
                    </button>
                    <div class="faq-answer p-5 pt-0 text-gray-600 dark:text-gray-400 hidden">
                        <p data-lang="tr">Festival, 30 Mart - 5 Nisan 2026 tarihleri arasında [Şehir, Mekan - Belirlenecek] adresinde gerçekleştirilecektir. Ayrıca bazı etkinlikler online olarak da yayınlanacaktır.</p>
                        <p class="hidden" data-lang="en">The festival will take place from March 30 to April 5, 2026, at [City, Venue - TBD]. Some events will also be broadcast online.</p>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <button class="w-full text-left flex justify-between items-center p-5 font-semibold text-lg cursor-pointer">
                        <span data-lang="tr">Katılım ücretli mi?</span>
                        <span class="hidden" data-lang="en">Is there a participation fee?</span>
                        <i data-lucide="chevron-down" class="transition-transform"></i>
                    </button>
                    <div class="faq-answer p-5 pt-0 text-gray-600 dark:text-gray-400 hidden">
                        <p data-lang="tr">Festivale katılım ve atölyeler tamamen ücretsizdir.</p>
                        <p class="hidden" data-lang="en">Participation in the festival and workshops is completely free.</p>
                    </div>
                </div>
                 <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <button class="w-full text-left flex justify-between items-center p-5 font-semibold text-lg cursor-pointer">
                        <span data-lang="tr">Konuşmacı veya sponsor olarak nasıl başvurabilirim?</span>
                        <span class="hidden" data-lang="en">How can I apply as a speaker or sponsor?</span>
                        <i data-lucide="chevron-down" class="transition-transform"></i>
                    </button>
                    <div class="faq-answer p-5 pt-0 text-gray-600 dark:text-gray-400 hidden">
                        <p data-lang="tr">Konuşmacı ve sponsorluk başvuruları için lütfen <a href="#contact" class="text-purple-600 hover:underline">iletişim</a> bölümünden bize ulaşın. Değerli katkılarınızı bekliyoruz.</p>
                        <p class="hidden" data-lang="en">For speaker and sponsorship applications, please contact us via the <a href="#contact" class="text-purple-600 hover:underline">contact</a> section. We look forward to your valuable contributions.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer id="contact" class="bg-gray-900 text-white">
        <div class="container mx-auto px-6 py-12">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <h4 class="text-lg font-bold" data-lang="tr">3. KTF | 2026</h4>
                    <h4 class="text-lg font-bold hidden" data-lang="en">3. LTF | 2026</h4>
                    <p class="text-gray-500 text-sm mt-2">#ktf2026 #ltf2026 #3ktf #3ltf</p>
                    <p class="text-gray-400 mt-4" data-lang="tr">Geleceği birlikte şekillendirelim.</p>
                    <p class="text-gray-400 mt-4 hidden" data-lang="en">Let's shape the future together.</p>
                    <div class="flex space-x-4 mt-4">
                        <a href="https://twitter.com/ktbkygm" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white"><i data-lucide="twitter"></i></a>
                        <a href="https://tr.linkedin.com/company/ktbkygm" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white"><i data-lucide="linkedin"></i></a>
                        <a href="https://www.instagram.com/kygmktb/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white"><i data-lucide="instagram"></i></a>
                        <a href="https://www.youtube.com/@ktb_kygm" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white"><i data-lucide="youtube"></i></a>
                        <a href="https://www.facebook.com/ktbkygm" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white"><i data-lucide="facebook"></i></a>
                    </div>
                </div>

                <div>
                    <h4 class="text-lg font-bold mb-4" data-lang="tr">Takvime Ekle</h4>
                    <h4 class="text-lg font-bold mb-4 hidden" data-lang="en">Add to Calendar</h4>
                    <div class="relative calendar-wrapper">
                         <button type="button" class="calendar-button text-gray-300 hover:text-white transition font-medium inline-flex items-center w-full text-left p-3 rounded-lg">
                            <i data-lucide="calendar-plus" class="mr-3 h-5 w-5"></i>
                            <span class="flex-grow" data-lang="tr">Takvime Ekle</span>
                            <span class="flex-grow hidden" data-lang="en">Add to Calendar</span>
                            <i data-lucide="chevron-down" class="ml-auto h-4 w-4"></i>
                        </button>
                         <div class="calendar-dropdown mb-2 bottom-full w-full rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none hidden z-10" style="position: absolute;">
                             <div class="py-1" role="none">
                                <a href="#" target="_blank" rel="noopener noreferrer" class="google-calendar-link flex items-center text-gray-200 block px-4 py-2 text-sm hover:bg-gray-600" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Google Calendar</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" class="outlook-calendar-link flex items-center text-gray-200 block px-4 py-2 text-sm hover:bg-gray-600" role="menuitem"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Outlook Calendar</a>
                                <a href="#" class="ics-download-link flex items-center text-gray-200 block px-4 py-2 text-sm hover:bg-gray-600" role="menuitem"><i data-lucide="download" class="w-4 h-4 mr-2"></i>Apple Calendar (.ics)</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4" data-lang="tr">İletişim</h4>
                    <h4 class="text-lg font-bold mb-4 hidden" data-lang="en">Contact</h4>
                    <p class="text-gray-400"><a href="mailto:akillikutuphaneler@ktb.gov.tr?subject=3.%20K%C3%BCt%C3%BCphane%20ve%20Teknoloji%20Festivali%20hakk%C4%B1nda%20sorum%20var." target="_blank" class="hover:text-white">akillikutuphaneler@ktb.gov.tr</a></p>
                    <p class="text-gray-400"><a href="tel:+903124708000" target="_blank" class="hover:text-white">+90 (312) 470 80 00</a></p>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-4" data-lang="tr">Etkinlik Yeri ve Ulaşım</h4>
                    <h4 class="text-lg font-bold mb-4 hidden" data-lang="en">Venue & Transportation</h4>
                    <div class="text-gray-400 text-sm space-y-2">
                        <a href="https://maps.app.goo.gl/SpTBM2Nkq8q3nQiU7" target="_blank" rel="noopener noreferrer" class="hover:text-white">
                            <p class="font-semibold text-white" data-lang="tr">Rami Kütüphanesi</p>
                            <p class="font-semibold text-white hidden" data-lang="en">Rami Library</p>
                            <p data-lang="tr">Yeni Rami Mahallesi, Rami Kışla Cd. 98/1, 34055 Eyüpsultan / İstanbul</p>
                            <p class="hidden" data-lang="en">Yeni Rami Neighborhood, Rami Kışla St. 98/1, 34055 Eyüpsultan / Istanbul</p>
                        </a>
                        <p data-lang="tr"><a href="tel:+902129343855" class="hover:text-white">+90 (212) 934 38 55</a></p>
                        <p class="hidden" data-lang="en"><a href="tel:+902129343855" class="hover:text-white">+90 (212) 934 38 55</a></p>
                        <a href="https://maps.app.goo.gl/gjeF7dVu5AmP4uov9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center mt-2 mb-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-xs space-x-2 transition-transform transform hover:scale-105">
                            <i data-lucide="map-pin" class="w-4 h-4"></i>
                            <div>
                                <span data-lang="tr">Konum Al</span>
                                <span class="hidden" data-lang="en">Get Directions</span>
                            </div>
                        </a>
                        <div class="pt-2 border-t border-gray-700/50 text-xs">
                            <p class="mb-2 italic"><span data-lang="tr">Rami Kütüphanesi'ne nasıl gidilir?</span><span class="hidden" data-lang="en">How to get to Rami Library?</span></p>
                            <p>
                                <span data-lang="tr"><strong class="text-gray-200">Otobüsle:</strong> 37A, 37E, 37Y, 38B. Talimhane Caddesi durağı (5 dk. yürüme).</span>
                                <span class="hidden" data-lang="en"><strong class="text-gray-200">By Bus:</strong> 37A, 37E, 37Y, 38B. Talimhane Caddesi stop (5 min. walk).</span>
                            </p>
                            <p>
                                <span data-lang="tr"><strong class="text-gray-200">Metroyla:</strong> M1A & M1B.</span>
                                <span class="hidden" data-lang="en"><strong class="text-gray-200">By Metro:</strong> M1A & M1B.</span>
                            </p>
                             <p>
                                <span data-lang="tr"><strong class="text-gray-200">Minibüs:</strong> A-27 ve A-74.</span>
                                <span class="hidden" data-lang="en"><strong class="text-gray-200">Minibus:</strong> A-27 and A-74.</span>
                            </p>
                            <p>
                                <span data-lang="tr"><strong class="text-gray-200">Tramvayla:</strong> T4 (Rami durağı).</span>
                                <span class="hidden" data-lang="en"><strong class="text-gray-200">By Tram:</strong> T4 (Rami stop).</span>
                            </p>
                            <p>
                                <span data-lang="tr"><strong class="text-gray-200">Özel Araçla:</strong> 500 araçlık otopark imkanı mevcuttur.</span>
                                <span class="hidden" data-lang="en"><strong class="text-gray-200">By Car:</strong> Parking for 500 vehicles is available.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-12 pt-8 border-t border-gray-800 text-center">
                <p class="text-gray-400 text-sm mb-4" data-lang="tr">Organizatör</p>
                <p class="text-gray-400 text-sm mb-4 hidden" data-lang="en">Organizer</p>
                <a href="https://kygm.ktb.gov.tr/" target="_blank" rel="noopener noreferrer" class="inline-block">
                    <img src="https://www.kutuphaneveteknoloji.com/wp-content/uploads/2025/09/KYGM-Logo-Beyaz.svg" alt="T.C. Kültür ve Turizm Bakanlığı Kütüphaneler ve Yayımlar Genel Müdürlüğü" class="h-24 mx-auto" data-lang="tr">
                    <img src="https://www.kutuphaneveteknoloji.com/wp-content/uploads/2025/09/KYGM-Logo-Beyaz-Ingilizce.svg" alt="Republic of Turkey Ministry of Culture and Tourism, General Directorate of Libraries and Publications" class="h-24 mx-auto hidden" data-lang="en">
                </a>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
                <div data-lang="tr">
                    <p class="mb-2">© 2026 | 3. Uluslararası Kütüphane ve Teknoloji Festivali. Tüm Hakları Saklıdır.</p>
                    <p class="mb-1">
                        <a href="https://kygm.ktb.gov.tr/TR-330512/kvkk-aydinlatma-metni.html" target="_blank" rel="noopener noreferrer" class="hover:text-white">KVKK Aydınlatma Metni</a>
                    </p>
                    <p>
                        Tasarım ve İçerik Yönetimi: <a href="https://www.ismailkaraca.com.tr/" target="_blank" rel="noopener noreferrer" class="hover:text-white">İsmail KARACA</a>
                    </p>
                </div>
                <div class="hidden" data-lang="en">
                    <p class="mb-2">© 2026 | 3rd International Library and Technology Festival. All Rights Reserved.</p>
                     <p class="mb-1">
                        <a href="https://kygm.ktb.gov.tr/TR-330512/kvkk-aydinlatma-metni.html" target="_blank" rel="noopener noreferrer" class="hover:text-white">Privacy Policy (KVKK)</a>
                    </p>
                    <p>
                        Design & Content Management: <a href="https://www.ismailkaraca.com.tr/" target="_blank" rel="noopener noreferrer" class="hover:text-white">İsmail KARACA</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <a href="https://wa.me/905353629473?text=Merhaba%2C+K%C3%BCt%C3%BCphane+ve+Teknoloji+Festivali+hakk%C4%B1nda+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" title="WhatsApp" class="fixed bottom-5 right-5 z-50 transition-transform transform hover:scale-110">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="w-14 h-14">
    </a>
    <button id="scroll-to-top" class="hidden fixed bottom-20 right-5 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 opacity-0 transform translate-y-2">
        <i data-lucide="arrow-up" class="w-6 h-6"></i>
    </button>
    
    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
        // YouTube Player
        let player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: 'mvCGCoYnGHM',
                playerVars: {
                    'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1,
                    'playlist': 'mvCGCoYnGHM', 'rel': 0, 'showinfo': 0, 'modestbranding': 1
                },
                events: { 'onReady': (event) => event.target.playVideo() }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Initialize Lucide Icons
            lucide.createIcons();

            // --- Theme (Dark/Light Mode) ---
            const themeToggle = document.getElementById('theme-toggle');
            const htmlEl = document.documentElement;

            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                htmlEl.classList.add('dark');
            } else {
                htmlEl.classList.remove('dark');
            }

            themeToggle.addEventListener('click', () => {
                htmlEl.classList.toggle('dark');
                localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
                lucide.createIcons();
            });

            // --- Add to Calendar (Refactored Logic) ---
            const getCalendarEventDetails = () => {
                const isEnglish = document.documentElement.lang === 'en';
                return {
                    title: isEnglish ? "3rd International Library and Technology Festival" : "3. Uluslararası Kütüphane ve Teknoloji Festivali",
                    location: "Rami Kütüphanesi, Yeni Rami Mahallesi, Rami Kışla Cd. 98/1, 34055 Eyüpsultan / İstanbul",
                    description: isEnglish 
                        ? "3rd International Library and Technology Festival. At the intersection of artificial intelligence, digital transformation, and innovation, we are redefining the social role of libraries. For details: https://www.kutuphaneveteknoloji.com/"
                        : "3. Uluslararası Kütüphane ve Teknoloji Festivali. Yapay zekâ, dijital dönüşüm ve inovasyonun kesişim noktasında, kütüphanelerin toplumsal rolünü yeniden tanımlıyoruz. Detaylar için: https://www.kutuphaneveteknoloji.com/",
                    startDate: "20260330",
                    endDate: "20260406",
                };
            };
            
            const setupCalendarLinks = () => {
                const eventDetails = getCalendarEventDetails();
                
                const googleUrl = new URL('https://www.google.com/calendar/render');
                googleUrl.searchParams.append('action', 'TEMPLATE');
                googleUrl.searchParams.append('text', eventDetails.title);
                googleUrl.searchParams.append('dates', `${eventDetails.startDate}/${eventDetails.endDate}`);
                googleUrl.searchParams.append('details', eventDetails.description);
                googleUrl.searchParams.append('location', eventDetails.location);
                document.querySelectorAll('.google-calendar-link').forEach(link => link.href = googleUrl.toString());

                const outlookUrl = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
                outlookUrl.searchParams.append('path', '/calendar/action/compose');
                outlookUrl.searchParams.append('rru', 'addevent');
                outlookUrl.searchParams.append('subject', eventDetails.title);
                outlookUrl.searchParams.append('startdt', '2026-03-30');
                outlookUrl.searchParams.append('enddt', '2026-04-06');
                outlookUrl.searchParams.append('allday', 'true');
                outlookUrl.searchParams.append('location', eventDetails.location);
                outlookUrl.searchParams.append('body', eventDetails.description);
                document.querySelectorAll('.outlook-calendar-link').forEach(link => link.href = outlookUrl.toString());
            };

            const handleIcsDownload = (e) => {
                e.preventDefault();
                const eventDetails = getCalendarEventDetails();
                const icsContent = [
                    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//LibTechFest//TR', 'BEGIN:VEVENT',
                    `UID:${new Date().toISOString()}@libtechfest.org`,
                    'DTSTAMP:' + new Date().toISOString().replace(/[-:.]/g, '') + 'Z',
                    `DTSTART;VALUE=DATE:${eventDetails.startDate}`, `DTEND;VALUE=DATE:${eventDetails.endDate}`,
                    `SUMMARY:${eventDetails.title}`, 
                    `DESCRIPTION:${eventDetails.description.replace(/\n/g, '\\n')}`,
                    `LOCATION:${eventDetails.location.replace(/,/g, '\\,')}`,
                    'END:VEVENT', 'END:VCALENDAR'
                ].join('\r\n');
                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'libtechfest-2026.ics';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                const dropdown = e.target.closest('.calendar-dropdown');
                if (dropdown) dropdown.classList.add('hidden');
            };
            
            document.body.addEventListener('click', (e) => {
                if (e.target.closest('.ics-download-link')) handleIcsDownload(e);
            });

            // --- Language Switcher ---
            const langTrBtn = document.getElementById('lang-tr');
            const langEnBtn = document.getElementById('lang-en');
            const langElements = document.querySelectorAll('[data-lang]');

            const setLanguage = (lang) => {
                document.documentElement.lang = lang;
                langElements.forEach(el => {
                    el.classList.toggle('hidden', el.dataset.lang !== lang);
                    if (el.tagName === 'OPTION' && el.dataset.lang === lang) el.selected = true;
                });
                
                langTrBtn.classList.toggle('bg-purple-600', lang === 'tr');
                langTrBtn.classList.toggle('text-white', lang === 'tr');
                langEnBtn.classList.toggle('bg-purple-600', lang === 'en');
                langEnBtn.classList.toggle('text-white', lang === 'en');

                localStorage.setItem('language', lang);
                setupCalendarLinks();
            };

            langTrBtn.addEventListener('click', () => setLanguage('tr'));
            langEnBtn.addEventListener('click', () => setLanguage('en'));
            
            let initialLang = localStorage.getItem('language') || ((navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en');
            setLanguage(initialLang);

            // --- Calendar Dropdown Toggle ---
            document.body.addEventListener('click', (e) => {
                const calendarWrapper = e.target.closest('.calendar-wrapper');
                if (!calendarWrapper) {
                    document.querySelectorAll('.calendar-dropdown').forEach(d => d.classList.add('hidden'));
                    return;
                }
                const button = calendarWrapper.querySelector('.calendar-button');
                const dropdown = calendarWrapper.querySelector('.calendar-dropdown');
                if (button && dropdown && (button === e.target || button.contains(e.target))) {
                    e.stopPropagation();
                    const isHidden = dropdown.classList.contains('hidden');
                    document.querySelectorAll('.calendar-dropdown').forEach(d => d.classList.add('hidden'));
                    if (isHidden) dropdown.classList.remove('hidden');
                }
            });
            
            // --- Mobile Menu ---
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });
            
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                });
            });

            // --- Countdown Timer ---
            const countdownDate = new Date("2026-03-30T00:00:00").getTime();
            const countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownDate - now;
                if (distance < 0) {
                    document.getElementById('countdown').innerHTML = `<div class="col-span-4 text-2xl font-bold p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30" data-lang="tr">Festival Başladı!</div><div class="col-span-4 text-2xl font-bold p-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30 hidden" data-lang="en">The Festival Has Begun!</div>`;
                    setLanguage(localStorage.getItem('language') || 'tr');
                    clearInterval(countdownInterval);
                    return;
                }
                document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
                document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
            }, 1000);

            // --- Archive & Video Gallery Tabs ---
            const setupTabs = (tabSelector, contentSelector, activeClass) => {
                const tabs = document.querySelectorAll(tabSelector);
                const contents = document.querySelectorAll(contentSelector);
                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        const target = tab.dataset.year;
                        tabs.forEach(t => t.classList.remove(activeClass, 'bg-blue-500', 'text-white'));
                        document.querySelectorAll(`${tabSelector}[data-year="${target}"]`).forEach(activeTab => activeTab.classList.add(activeClass, 'bg-blue-500', 'text-white'));
                        contents.forEach(content => content.classList.toggle('hidden', content.dataset.year !== target));
                    });
                });
                document.querySelectorAll(`${tabSelector}[data-year="2025"]`).forEach(t => t.classList.add(activeClass, 'bg-blue-500', 'text-white'));
                document.querySelector(`${contentSelector}[data-year="2024"]`).classList.add('hidden');
            };
            setupTabs('.archive-tab', '.archive-year-content', 'active');
            setupTabs('.video-gallery-tab', '.video-gallery-year-content', 'active');
            
            // --- FAQ Accordion ---
            document.querySelectorAll('#faq .space-y-4 > div > button').forEach(button => {
                button.addEventListener('click', () => {
                    button.nextElementSibling.classList.toggle('hidden');
                    button.querySelector('i').classList.toggle('rotate-180');
                });
            });

            // --- Scroll Animations & Scroll-to-Top Button ---
            const scrollToTopBtn = document.getElementById('scroll-to-top');
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
            }, { threshold: 0.1 });
            document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.remove('hidden', 'opacity-0', 'translate-y-2');
                } else {
                    scrollToTopBtn.classList.add('opacity-0', 'translate-y-2');
                    setTimeout(() => { if (window.scrollY <= 300) scrollToTopBtn.classList.add('hidden'); }, 300);
                }
            });
            scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            
            // --- Mute/Unmute Video ---
            document.getElementById('video-mute-button').addEventListener('click', () => {
                if (player && typeof player.isMuted === 'function') { 
                    if (player.isMuted()) {
                        player.unMute();
                        document.getElementById('volume-icon').setAttribute('data-lucide', 'volume-2');
                    } else {
                        player.mute();
                        document.getElementById('volume-icon').setAttribute('data-lucide', 'volume-x');
                    }
                    lucide.createIcons();
                }
            });

            // --- Form Submission ---
            const form = document.getElementById('registration-form');
            form.addEventListener('submit', e => {
                e.preventDefault();
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Gönderiliyor...';
                
                fetch('https://script.google.com/macros/s/AKfycbwZxOOo5zCtfTqKXH7mXBdhsLaPeodzsS_xG75hePtrlL7TUu0bePN8ksKMFWWP7_k0/exec', { method: 'POST', body: new FormData(form) })
                    .then(response => response.json())
                    .then(data => {
                        if(data.result === 'success'){
                            form.parentElement.innerHTML = `<div class="text-center space-y-3"><p class="text-green-600 dark:text-green-400 font-semibold" data-lang="tr">Kaydınız başarıyla alındı. Teşekkür ederiz!</p><p class="text-green-600 dark:text-green-400 font-semibold hidden" data-lang="en">Your registration was successful. Thank you!</p><div class="relative calendar-wrapper inline-block text-left"><div><button type="button" class="calendar-button inline-flex items-center justify-center w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"><i data-lucide="calendar-plus" class="mr-2 h-5 w-5"></i><span data-lang="tr">Etkinliği Takvime Ekle</span><span data-lang="en" class="hidden">Add to Calendar</span><i data-lucide="chevron-down" class="ml-2 h-5 w-5"></i></button></div><div class="calendar-dropdown origin-bottom-right absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 hidden z-10"><div class="py-1"><a href="#" target="_blank" rel="noopener noreferrer" class="google-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Google Calendar</a><a href="#" target="_blank" rel="noopener noreferrer" class="outlook-calendar-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><i data-lucide="calendar" class="w-4 h-4 mr-2"></i>Outlook Calendar</a><a href="#" class="ics-download-link flex items-center text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><i data-lucide="download" class="w-4 h-4 mr-2"></i>Apple Calendar (.ics)</a></div></div></div></div>`;
                            lucide.createIcons();
                            setupCalendarLinks();
                        } else { throw new Error('Submission failed'); }
                    })
                    .catch(error => {
                        form.parentElement.querySelector('#form-message').innerHTML = `<p class="text-red-600 dark:text-red-400 font-semibold" data-lang="tr">Bir hata oluştu. Lütfen tekrar deneyin.</p><p class="text-red-600 dark:text-red-400 font-semibold hidden" data-lang="en">An error occurred. Please try again.</p>`;
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    })
                    .finally(() => setLanguage(localStorage.getItem('language') || 'tr'));
            });

            // --- Hero Canvas Animation ---
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d');
            let particlesArray;
            const setCanvasSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
            setCanvasSize();

            const mouse = { x: null, y: null, radius: (canvas.height / 80) * (canvas.width / 80) };
            window.addEventListener('mousemove', (e) => { const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; });
            window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
            
            class Particle {
                constructor(x, y, dX, dY, size, symbol) { this.x = x; this.y = y; this.dX = dX; this.dY = dY; this.size = size; this.symbol = symbol; }
                draw(color) { ctx.font = `${this.size * 10}px Inter`; ctx.fillStyle = color; ctx.fillText(this.symbol, this.x, this.y); }
                update(color) {
                    if (this.x > canvas.width || this.x < 0) this.dX = -this.dX;
                    if (this.y > canvas.height || this.y < 0) this.dY = -this.dY;
                    let dx = mouse.x - this.x; let dy = mouse.y - this.y; let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) { const force = (mouse.radius - dist) / mouse.radius; this.x -= dx * force * 0.2; this.y -= dy * force * 0.2; }
                    this.x += this.dX; this.y += this.dY; this.draw(color);
                }
            }
            
            function initCanvas() {
                particlesArray = [];
                const symbols = ['</>', '{}', '#', '*', '=>', '()', '[]'];
                let numParticles = (canvas.height * canvas.width) / 9000;
                for (let i = 0; i < numParticles; i++) {
                    let size = (Math.random() * 2) + 2;
                    let x = (Math.random() * (canvas.width - size * 2)); let y = (Math.random() * (canvas.height - size * 2));
                    let dX = (Math.random() * .4) - .2; let dY = (Math.random() * .4) - .2;
                    particlesArray.push(new Particle(x, y, dX, dY, size, symbols[Math.floor(Math.random() * symbols.length)]));
                }
            }

            function animateCanvas() {
                const isDark = htmlEl.classList.contains('dark');
                ctx.fillStyle = isDark ? 'rgb(15, 23, 42)' : 'rgb(249, 250, 251)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                const particleColor = isDark ? 'rgba(156, 39, 176, 0.4)' : 'rgba(156, 39, 176, 0.6)';
                particlesArray.forEach(p => p.update(particleColor));
                requestAnimationFrame(animateCanvas);
            }

            window.addEventListener('resize', () => { setCanvasSize(); initCanvas(); });
            themeToggle.addEventListener('click', () => { setTimeout(initCanvas, 50); });
            initCanvas();
            animateCanvas();

        });
    </script>

    <script>
        // --- AI Simulation Logic ---

        // 1. Veri Deposu: Tüm nedenleri burada saklıyoruz.
        const reasonsData = {
            "Kütüphaneci": [
                "Kütüphanenizin dijital dönüşüm yol haritasını oluşturmak için en son teknoloji ve stratejileri ilk ağızdan öğrenin.",
                "Yapay zeka destekli kataloglama ve arşivleme sistemlerini keşfederek iş akışlarınızı otomatize etme fırsatlarını yakalayın.",
                "Meslektaşlarınızla ağ kurarak ulusal ve uluslararası projeler için potansiyel iş birlikleri geliştirin.",
                "Kullanıcı etkileşimini artıracak artırılmış gerçeklik (AR) ve sanal gerçeklik (VR) uygulamaları hakkında ilham alın.",
                "Nadir eserlerin ve dijital arşivlerin korunması için en güncel koruma ve erişim teknolojilerini inceleyin.",
                "'MakerSpace' ve 'Deneyim Alanı' gibi modern kütüphane konseptlerini nasıl kurup yönetebileceğinizi öğrenin.",
                "Veri analitiği araçlarıyla kütüphane kullanım istatistiklerini nasıl daha anlamlı raporlara dönüştürebileceğinizi keşfedin.",
                "Okuryazarlığı ve öğrenmeyi teşvik etmek için geliştirilen yeni nesil e-öğrenme platformları ve mobil uygulamaları tanıyın.",
                "Farklı ülkelerden gelen kütüphanecilerin başarı hikayelerinden ve karşılaştıkları zorluklardan dersler çıkarın.",
                "Sektörün önde gelen teknoloji sağlayıcılarıyla tanışarak kütüphanenizin ihtiyaçları için en uygun çözümleri bulun."
            ],
            "Kütüphane Yöneticisi": [
                "Kütüphanenizin uzun vadeli stratejik planını şekillendirecek dijital dönüşüm trendlerini ve vizyoner yaklaşımları keşfedin.",
                "Bütçe planlamanızda teknoloji yatırımlarının geri dönüşünü (ROI) kanıtlayacak veri odaklı argümanlar ve başarı hikayeleri edinin.",
                "Personelinizi geleceğin kütüphanecilik rollerine hazırlamak için gereken yetkinlikler ve hizmet içi eğitim modelleri hakkında bilgi alın.",
                "Sektörün önde gelen teknoloji tedarikçileriyle stratejik düzeyde görüşmeler yaparak kurumunuza özel toplu alım ve entegrasyon fırsatlarını değerlendirin.",
                "Diğer kamu kurumları, üniversiteler ve özel sektör liderleriyle tanışarak kütüphanenizin etki alanını genişletecek ortak projeler için zemin hazırlayın.",
                "Kütüphanenizin toplumsal değerini ve teknolojik ilerlemesini üst yönetime ve paydaşlara sunmak için etkili raporlama araçlarını öğrenin.",
                "Veri mahremiyeti (KVKK), siber güvenlik ve dijital erişilebilirlik gibi kritik konularda en güncel yasal ve teknolojik standartları takip edin.",
                "Ulusal ve uluslararası fon programları ile hibe çağrıları hakkında bilgi alarak kütüphanenize yeni kaynaklar yaratma yollarını keşfedin.",
                "Büyük ölçekli dijitalleştirme projeleri, bulut tabanlı arşiv sistemleri ve sürdürülebilir BT altyapısı yönetimi konularında uzmanlardan bilgi alın.",
                "Kurumunuzda inovasyon kültürünü nasıl teşvik edeceğinizi ve yeni fikirleri pilot projelerden kalıcı hizmetlere nasıl dönüştüreceğinizi öğrenin."
            ],
            "Öğrenci": [
                "Geleceğin mesleklerini şekillendiren yapay zeka, robotik ve yazılım teknolojilerini uzmanlarından dinleyerek kariyerinize yön verin.",
                "Teknoloji devleri ve yenilikçi startup'ların temsilcileriyle tanışarak staj ve iş imkanları hakkında ilk bilgiyi alın.",
                "Uygulamalı atölyelere katılarak kodlama, tasarım ve girişimcilik becerilerinizi geliştirin ve portfolyonuzu zenginleştirin.",
                "Bitirme projeniz veya teziniz için ilham verici ve yenilikçi konu fikirleri bulun.",
                "Kariyer simülasyonlarına katılarak gelecekteki iş ortamını deneyimleyin ve kendinizi test edin.",
                "Türkiye'nin ve dünyanın dört bir yanından gelen diğer parlak öğrencilerle tanışıp network'ünüzü şimdiden kurmaya başlayın.",
                "Sadece teoride kalmayan, gerçek hayatta kullanılan en son teknolojileri canlı demolarla deneyimleme fırsatı yakalayın.",
                "Akademik ve profesyonel dünyada bir adım öne çıkmanızı sağlayacak sertifikalı eğitimlere ücretsiz katılın.",
                "Alanında lider isimlerin konuşmalarını dinleyerek vizyonunuzu genişletin ve motivasyonunuzu artırın.",
                "Kendi projenizi veya fikrinizi festivaldeki uzmanlara sunarak değerli geri bildirimler alma şansı yakalayın."
            ],
            "Yazılım Geliştirici": [
                "Kültürel miras ve kütüphane verileri gibi benzersiz ve büyük veri setleriyle çalışmak için yeni API'leri keşfedin.",
                "Doğal Dil İşleme (NLP) ve makine öğrenmesi modellerinin metin analizi ve arşiv taraması gibi alanlarda nasıl kullanıldığını görün.",
                "Kütüphanecilik ve eğitim sektörünün çözülmemiş teknolojik problemlerini öğrenerek yeni bir pazar veya startup fikri geliştirin.",
                "Açık kaynaklı kütüphane otomasyon sistemlerine nasıl katkıda bulunabileceğinizi öğrenin ve topluluğa katılın.",
                "Veri görselleştirme ve interaktif arayüz tasarımı konularında, zengin kültürel veriler üzerinden yeni meydan okumalarla karşılaşın.",
                "Kamu ve akademi dünyasından potansiyel müşteriler veya iş ortaklarıyla doğrudan bağlantı kurun.",
                "Kendi geliştirdiğiniz projeleri veya çözümleri sergileyerek yeteneklerinizi teknoloji ve kültür dünyasına gösterin.",
                "Blockchain teknolojisinin dijital kimlik ve eser sahipliği gibi konularda kütüphaneler için sunduğu fırsatları öğrenin.",
                "Sadece ticari değil, aynı zamanda toplumsal fayda sağlayan teknoloji projeleri için ilham ve motivasyon bulun.",
                "Farklı disiplinlerden gelen uzmanlarla (tarihçiler, sanatçılar, kütüphaneciler) bir araya gelerek multidisipliner projelere başlayın."
            ],
            "Akademisyen": [
                "Dijital beşeri bilimler (Digital Humanities) alanındaki en son araştırma metodolojilerini ve teknolojik araçları keşfedin.",
                "Farklı üniversitelerden ve kurumlardan akademisyenlerle tanışarak disiplinler arası araştırma projeleri için ortaklıklar kurun.",
                "Araştırmalarınızda kullanabileceğiniz, daha önce erişime açılmamış dijital arşivler ve veri tabanları hakkında bilgi alın.",
                "Makalenizi veya araştırmanızı poster sunumu olarak sergileyerek geniş ve ilgili bir kitleye tanıtma fırsatı yakalayın.",
                "Akademik yayıncılığın geleceği, açık erişim ve bilimsel iletişimin yeni normları üzerine yapılan tartışmalara katılın.",
                "TÜBİTAK, Avrupa Birliği ve diğer fon sağlayıcıların teknoloji ve kültür alanındaki proje çağrıları hakkında bilgi edinin.",
                "Yapay zekanın bilimsel araştırma, veri analizi ve hakemlik süreçleri üzerindeki etkilerini ilk ağızdan dinleyin.",
                "Öğrencilerinize tavsiye edebileceğiniz en güncel teknoloji ve öğrenme platformlarını tanıyın.",
                "Sanayi ve akademi iş birliğinin somut örneklerini görerek kendi araştırmalarınızın ticarileşme potansiyelini değerlendirin.",
                "Araştırma alanınızdaki teknolojik gelişmeleri takip ederek ders materyallerinizi ve müfredatınızı güncelleyin."
            ],
            "Girişimci": [
                "Eğitim Teknolojileri (EdTech) ve Kültür Teknolojileri (CultureTech) alanında pazardaki boşlukları ve karşılanmamış ihtiyaçları tespit edin.",
                "Startup'ınız için potansiyel ilk müşteriler olabilecek kurum yöneticileri ve karar vericilerle doğrudan tanışın.",
                "Ürününüz veya hizmetiniz için yetenekli yazılımcılar, tasarımcılar ve alan uzmanlarından oluşan bir ekip kurma fırsatı yakalayın.",
                "Melek yatırımcılar ve risk sermayesi fonlarının kamu ve kültür odaklı projelere olan ilgisini ölçün ve network kurun.",
                "Kamu ihaleleri ve teknoloji tedarik süreçleri hakkında bilgi alarak B2G (Business-to-Government) pazar stratejinizi geliştirin.",
                "Geliştirdiğiniz teknolojiyi festivalin fuar alanında sergileyerek erken aşama geri bildirimler alın ve görünürlük kazanın.",
                "Rakiplerinizin ne tür teknolojiler üzerinde çalıştığını analiz ederek pazardaki konumunuzu güçlendirin.",
                "Fikri mülkiyet, patent ve dijital haklar konularında uzmanlardan bilgi alarak işinizi yasal güvenceye alın.",
                "Başarılı teknoloji girişimcilerinin hikayelerinden ilham alarak kendi yol haritanızdaki engelleri aşmak için motivasyon kazanın.",
                "Bir probleme çözüm arayan kütüphaneciler ve akademisyenlerle konuşarak ürün-pazar uyumunu (product-market fit) test edin."
            ]
        };

        // 2. Oturum Takipçisi: Her meslek için gösterilecek nedenleri takip eder.
        const sessionTrackers = {};

        // 3. HTML Elementlerini Seçme
        const getReasonBtnSim = document.getElementById('get-personalized-reason-btn');
        const reasonOutputSim = document.getElementById('personalized-reason-output');
        const roleSelectorSim = document.getElementById('user-role-selector');

        // 4. Butona Tıklama Olayı
        getReasonBtnSim.addEventListener('click', () => {
            const selectedRole = roleSelectorSim.value;
            if (!selectedRole || !reasonsData[selectedRole]) return;

            // "Yapay zeka düşünüyor" efekti için yükleyiciyi göster
            reasonOutputSim.innerHTML = `<div class="flex justify-center items-center h-full"><div class="gemini-loader"></div></div>`;
            getReasonBtnSim.disabled = true;

            // Simülasyonu daha gerçekçi yapmak için küçük bir gecikme ekliyoruz
            setTimeout(() => {
                // Seçilen meslek için gösterilecek bir neden listesi yoksa veya liste boşalmışsa, yeniden oluştur ve karıştır.
                if (!sessionTrackers[selectedRole] || sessionTrackers[selectedRole].length === 0) {
                    // Orijinal diziyi kopyala ve karıştır
                    sessionTrackers[selectedRole] = [...reasonsData[selectedRole]].sort(() => Math.random() - 0.5);
                }

                // Karıştırılmış listeden bir sonraki nedeni al
                const nextReason = sessionTrackers[selectedRole].pop();

                // Sonucu ekranda göster
                reasonOutputSim.innerHTML = `<p>${nextReason}</p>`;
                getReasonBtnSim.disabled = false;

            }, 800); // 0.8 saniye bekleme süresi
        });
    </script>
</body>
</html>


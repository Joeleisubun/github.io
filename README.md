<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For You 💖</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .start-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            transition: opacity 1s ease;
        }
        .start-overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }
        .start-button {
            padding: 15px 30px;
            font-size: 24px;
            font-family: 'Dancing Script', cursive;
            background-color: #fff;
            border: 2px solid #ff6b6b;
            border-radius: 25px;
            cursor: pointer;
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .start-button:hover {
            transform: scale(1.1);
            background-color: #ff6b6b;
            color: #fff;
        }
        .start-title {
            font-size: 48px;
            color: #fff;
            font-family: 'Dancing Script', cursive;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <!-- Start Overlay -->
    <div class="start-overlay" id="startOverlay">
        <h1 class="start-title">This Is For You</h1>
        <button class="start-button" onclick="startGreetings()">Start</button>
    </div>

    <!-- Background Animations -->
    <div class="background-animation">
        <div class="floating-balloons">
            <div class="balloon balloon-1"></div>
            <div class="balloon balloon-2"></div>
            <div class="balloon balloon-3"></div>
            <div class="balloon balloon-4"></div>
            <div class="balloon balloon-5"></div>
            <div class="balloon balloon-6"></div>
        </div>
        <div class="confetti-container" id="confetti"></div>
    </div>

    <!-- Main Container -->
    <div class="container" id="mainContent" style="display: none;">
        <!-- Header Section -->
        <header class="birthday-header">
            <div class="cake-icon">
                <img src="cake.svg" alt="Birthday Cake" class="cake-animation">
            </div>
            <h1 class="main-title animate-bounce">Selamat Ulang Tahun Sayangku!</h1>
            <p class="subtitle animate-fade-in">
                😍Halo sayangku, cintaku, manisku😍 Selamat Ulang Tahun yaaa!! 
                Panjang umur, murah rejeki,sehat selalu, bahagia selalu, Tuhan memberkati dan menyertaimu selalu.
            </p>
            <p class="subtitle animate-fade-in">
                 Semoga di hari spesialmu ini dipenuhi dengan kebahagiaan yang melimpah, cinta yang tulus dan hangat, serta momen-momen indah yang tak hanya meninggalkan kenangan tak terlupakan, tetapi juga menjadi sinar kebahagiaan yang terus bersemayam di hati, mengiringi setiap langkahmu dengan sukacita dan kehangatan yang abadi! 🎂✨
            </p>
            <div class="birthday-wishes">
                <div class="wish-item animate-slide-left">
                    <i class="fas fa-gift"></i>
                    <span>Semoga semua impianmu terwujud!</span>
                </div>
                <div class="wish-item animate-slide-right">
                    <i class="fas fa-heart"></i>
                    <span>Sehat selalu dan bahagia!</span>
                </div>
                <div class="wish-item animate-slide-left">
                    <i class="fas fa-star"></i>
                    <span>Tahun ini penuh berkah!</span>
                </div>
            </div>
        </header>

        <!-- Music Player Section -->
        <section class="music-player-section">
            <h2 class="section-title"> Musik Spesial untukmu </h2>
            <div class="music-player">
                <div class="music-info">
                    <div class="song-details">
                        <h3>✨Anugerah Terindah✨</h3>
                        <p>Andmesh</p>
                    </div>
                </div>
                <audio id="birthdayMusic" autoplay>
                    <source src="ssstik.io_1753414522753.mp3" type="audio/mp3">
                </audio>
            </div>
        </section>

        <!-- Photo Gallery Section -->
        <section class="photo-gallery-section">
            <h2 class="section-title">The Gift🎉 </h2>
            <p class="section-description">(Hadia dalam bentuk fisik otw yaa)</p>
            <div class="main-photo-container">
                <div class="photo-frame">
                    <div class="photo-placeholder" id="mainPhoto">
                        <img src="Happy Birthday Sayangku.jpg" alt="Main Photo" id="currentPhoto" class="photo-display">
                    </div>
                </div>
            </section>

        <!-- Birthday Message Section -->
        <section class="message-section">
            <div class="message-card">
                <h3>✨Pesan Spesial Untukmu✨</h3>
                <div class="animated-text">
                    <p class="typewriter">
                        Di hari yang istimewa ini, semoga kebahagiaan selalu menyertaimu.
                    </p>
                    <p class="typewriter">
                        Setiap tahun yang berlalu adalah kesempatan baru untuk meraih mimpi 
                        dan menciptakan kenangan indah. Tetap semangat, kurangi sedihnya, kalau butuh apapun itu aku akan selalu di sampingmu,ingat jangan ragu untuk ngomongin apapun itu.
                    </p>
                    <p class="typewriter">
                        Aku mintaa maaf yaa kalau ada salah kata, sikap, atau apapun itu yang bikin kamu sedih,
                        aku akan berusaha untuk menjadi yang terbaik untukmu. Kamu adalah orang yang sangat spesial bagiku, dan aku bersyukur bisa berbagi hidup denganmu.
                    </p>
                    <p class="typewriter">
                       🎉🎈Selamat ulang tahun! 🎉🎈
                    </p>
                <div class="signature">
                    <p>Dengan cinta dan doa terbaik untukmu❤️</p>
                </div>
            </div>
        </section>
    </div>

    <script>
        function startGreetings() {
            const overlay = document.getElementById('startOverlay');
            const mainContent = document.getElementById('mainContent');
            const music = document.getElementById('birthdayMusic');
            
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.style.display = 'none';
                mainContent.style.display = 'block';
                music.play().catch(error => {
                    console.log('Autoplay prevented:', error);
                });
            }, 1000);
        }
        
        // Ensure music plays automatically when page loads
        document.addEventListener('DOMContentLoaded', () => {
            const music = document.getElementById('birthdayMusic');
            music.currentTime = 0; // Ensure music starts from the beginning
            music.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        });
    </script>
</body>
</html>

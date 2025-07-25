// Birthday Greeting Interactive Features
class BirthdayApp {
    constructor() {
        this.photos = [];
        this.currentPhotoIndex = 0;
        this.isPlaying = false;
        this.isMuted = false;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.createConfetti();
        this.startBackgroundAnimations();
        this.initializeMusicPlayer();
    }

    setupEventListeners() {
        // Music Player Controls
        const playPauseBtn = document.getElementById('playPauseBtn');
        const muteBtn = document.getElementById('muteBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const birthdayMusic = document.getElementById('birthdayMusic');

        playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        muteBtn.addEventListener('click', () => this.toggleMute());
        volumeSlider.addEventListener('input', (e) => this.adjustVolume(e.target.value));

        // Photo Gallery Controls
        const photoUpload = document.getElementById('photoUpload');
        const prevPhoto = document.getElementById('prevPhoto');
        const nextPhoto = document.getElementById('nextPhoto');

        photoUpload.addEventListener('change', (e) => this.handlePhotoUpload(e));
        prevPhoto.addEventListener('click', () => this.previousPhoto());
        nextPhoto.addEventListener('click', () => this.nextPhoto());

        // Celebrate Button
        const celebrateBtn = document.getElementById('celebrateBtn');
        celebrateBtn.addEventListener('click', () => this.triggerCelebration());

        // Close party mode on click
        const partyMode = document.getElementById('partyMode');
        partyMode.addEventListener('click', () => this.closePartyMode());
    }

    // Music Player Functions
    initializeMusicPlayer() {
        const birthdayMusic = document.getElementById('birthdayMusic');
        const volumeSlider = document.getElementById('volumeSlider');
        
        // Set initial volume
        birthdayMusic.volume = volumeSlider.value / 100;
        
        // Auto-play attempt (will be blocked by browsers, but user can click play)
        birthdayMusic.play().catch(() => {
            console.log('Auto-play was prevented. User needs to interact first.');
        });
    }

    togglePlayPause() {
        const birthdayMusic = document.getElementById('birthdayMusic');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playIcon = playPauseBtn.querySelector('i');

        if (this.isPlaying) {
            birthdayMusic.pause();
            playIcon.className = 'fas fa-play';
            this.isPlaying = false;
        } else {
            birthdayMusic.play().then(() => {
                playIcon.className = 'fas fa-pause';
                this.isPlaying = true;
            }).catch((error) => {
                console.log('Playback failed:', error);
                this.showMessage('Tidak dapat memutar musik. Silakan coba lagi.');
            });
        }
    }

    toggleMute() {
        const birthdayMusic = document.getElementById('birthdayMusic');
        const muteBtn = document.getElementById('muteBtn');
        const muteIcon = muteBtn.querySelector('i');

        if (this.isMuted) {
            birthdayMusic.muted = false;
            muteIcon.className = 'fas fa-volume-up';
            this.isMuted = false;
        } else {
            birthdayMusic.muted = true;
            muteIcon.className = 'fas fa-volume-mute';
            this.isMuted = true;
        }
    }

    adjustVolume(value) {
        const birthdayMusic = document.getElementById('birthdayMusic');
        birthdayMusic.volume = value / 100;
        
        // Update mute button icon based on volume
        const muteIcon = document.querySelector('#muteBtn i');
        if (value == 0) {
            muteIcon.className = 'fas fa-volume-mute';
        } else if (value < 50) {
            muteIcon.className = 'fas fa-volume-down';
        } else {
            muteIcon.className = 'fas fa-volume-up';
        }
    }

    // Photo Gallery Functions
    handlePhotoUpload(event) {
        const files = Array.from(event.target.files);
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.addPhoto(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    addPhoto(src, name) {
        const photo = {
            src: src,
            name: name,
            id: Date.now() + Math.random()
        };
        
        this.photos.push(photo);
        this.updatePhotoDisplay();
        this.createThumbnail(photo);
        
        // If this is the first photo, display it
        if (this.photos.length === 1) {
            this.currentPhotoIndex = 0;
            this.displayCurrentPhoto();
        }
    }

    createThumbnail(photo) {
        const thumbnailsContainer = document.getElementById('photoThumbnails');
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.dataset.photoId = photo.id;
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.name;
        
        thumbnail.appendChild(img);
        thumbnail.addEventListener('click', () => this.selectPhoto(photo.id));
        
        thumbnailsContainer.appendChild(thumbnail);
    }

    selectPhoto(photoId) {
        const photoIndex = this.photos.findIndex(photo => photo.id === photoId);
        if (photoIndex !== -1) {
            this.currentPhotoIndex = photoIndex;
            this.displayCurrentPhoto();
            this.updateThumbnailSelection();
        }
    }

    displayCurrentPhoto() {
        const mainPhoto = document.getElementById('mainPhoto');
        
        if (this.photos.length > 0) {
            const currentPhoto = this.photos[this.currentPhotoIndex];
            
            mainPhoto.innerHTML = `
                <img src="${currentPhoto.src}" alt="${currentPhoto.name}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
            `;
            
            this.updateThumbnailSelection();
        } else {
            mainPhoto.innerHTML = `
                <i class="fas fa-camera"></i>
                <p>Klik tombol di bawah untuk menambah foto</p>
            `;
        }
    }

    updateThumbnailSelection() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            if (index === this.currentPhotoIndex) {
                thumbnail.classList.add('active');
            } else {
                thumbnail.classList.remove('active');
            }
        });
    }

    updatePhotoDisplay() {
        const currentPhotoIndex = document.getElementById('currentPhotoIndex');
        const totalPhotos = document.getElementById('totalPhotos');
        const prevBtn = document.getElementById('prevPhoto');
        const nextBtn = document.getElementById('nextPhoto');
        
        currentPhotoIndex.textContent = this.photos.length > 0 ? this.currentPhotoIndex + 1 : 0;
        totalPhotos.textContent = this.photos.length;
        
        prevBtn.disabled = this.currentPhotoIndex <= 0 || this.photos.length === 0;
        nextBtn.disabled = this.currentPhotoIndex >= this.photos.length - 1 || this.photos.length === 0;
    }

    previousPhoto() {
        if (this.currentPhotoIndex > 0) {
            this.currentPhotoIndex--;
            this.displayCurrentPhoto();
            this.updatePhotoDisplay();
        }
    }

    nextPhoto() {
        if (this.currentPhotoIndex < this.photos.length - 1) {
            this.currentPhotoIndex++;
            this.displayCurrentPhoto();
            this.updatePhotoDisplay();
        }
    }

    // Animation Functions
    createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
        }
    }

    startBackgroundAnimations() {
        // Add sparkle effects periodically
        setInterval(() => {
            this.createSparkle();
        }, 2000);
    }

    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '999';
        sparkle.style.animation = 'sparkleAnimation 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }

    // Celebration Functions
    triggerCelebration() {
        const partyMode = document.getElementById('partyMode');
        partyMode.classList.add('active');
        
        // Create extra confetti burst
        this.createConfettiBurst();
        
        // Play celebration sound effect if music is available
        const birthdayMusic = document.getElementById('birthdayMusic');
        if (!this.isPlaying) {
            this.togglePlayPause();
        }
        
        // Auto-close party mode after 3 seconds
        setTimeout(() => {
            this.closePartyMode();
        }, 3000);
    }

    createConfettiBurst() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1001';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 300 + 200;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            confetti.style.animation = `confettiBurst 2s ease-out forwards`;
            confetti.style.setProperty('--vx', vx + 'px');
            confetti.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 2000);
        }
    }

    closePartyMode() {
        const partyMode = document.getElementById('partyMode');
        partyMode.classList.remove('active');
    }

    // Utility Functions
    showMessage(message) {
        // Create a temporary message overlay
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 1000;
            font-weight: 500;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// Additional CSS animations for JavaScript-created elements
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes confettiBurst {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayApp();
});

// Add some fun interactive elements
document.addEventListener('click', (e) => {
    // Create a small celebration effect on any click
    if (Math.random() > 0.7) { // 30% chance
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['🎉', '✨', '🎊', '💖'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '999';
        sparkle.style.fontSize = '20px';
        sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
});

// Keyboard shortcuts for better accessibility
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ': // Spacebar to play/pause music
            e.preventDefault();
            document.getElementById('playPauseBtn').click();
            break;
        case 'ArrowLeft': // Left arrow for previous photo
            if (document.querySelector('.photo-gallery-section')) {
                document.getElementById('prevPhoto').click();
            }
            break;
        case 'ArrowRight': // Right arrow for next photo
            if (document.querySelector('.photo-gallery-section')) {
                document.getElementById('nextPhoto').click();
            }
            break;
        case 'Enter': // Enter to celebrate
            if (e.target.id === 'celebrateBtn') {
                e.target.click();
            }
            break;
    }
});

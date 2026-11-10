// Funny Hot-Headed Website Interactive Features
class HotHeadedWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
        this.setupQuiz();
        this.setupInteractiveFeatures();
        this.setupMessageForm();
    }

    init() {
        this.createFloatingHearts();
        this.setupNavigation();
        this.initializeCounters();
        this.setupScrollEffects();
        this.loadGalleryImages();
    }

    // Create floating hearts background
    createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        if (!heartsContainer) return;

        const heartEmojis = ['❤️', '💕', '💖', '💝', '💗', '💓'];
        
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.animationDuration = (6 + Math.random() * 4) + 's';
            heartsContainer.appendChild(heart);
        }

        // Add new hearts periodically
        setInterval(() => {
            if (heartsContainer.children.length < 12) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (6 + Math.random() * 4) + 's';
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 12000);
            }
        }, 2000);
    }

    // Setup responsive navigation
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const nav = document.querySelector('.funny-nav');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.animateHamburger(navToggle);
            });

            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    this.resetHamburger(navToggle);
                });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    animateHamburger(toggle) {
        const spans = toggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = index === 1 ? 'rotate(45deg)' : 
                                  index === 0 ? 'rotate(-45deg) translateY(6px)' : 
                                  'rotate(45deg) translateY(-6px)';
        });
    }

    resetHamburger(toggle) {
        const spans = toggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
        });
    }

    // Initialize counters and timers
    initializeCounters() {
        this.animateRageMeter();
        this.startPatienceTimer();
        this.animateCharts();
    }

    // Rage meter animation
    animateRageMeter() {
        const rageMeter = document.querySelector('.meter-fill');
        if (rageMeter) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 2;
                rageMeter.style.width = progress + '%';
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        rageMeter.style.width = '0%';
                        this.animateRageMeter();
                    }, 2000);
                }
            }, 50);
        }
    }

    // Patience timer
    startPatienceTimer() {
        const timerNumber = document.querySelector('.timer-number');
        if (timerNumber) {
            let seconds = 0;
            setInterval(() => {
                seconds = (seconds + 1) % 60;
                timerNumber.textContent = seconds.toString().padStart(2, '0');
                
                // Add fire effect at certain intervals
                if (seconds % 15 === 0) {
                    timerNumber.classList.add('fire-effect');
                    setTimeout(() => {
                        timerNumber.classList.remove('fire-effect');
                    }, 500);
                }
            }, 1000);
        }
    }

    // Animate charts and graphs
    animateCharts() {
        // Animate bar chart
        const bars = document.querySelectorAll('.bar');
        const barHeights = [60, 80, 95, 40]; // Different anger levels
        
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = barHeights[index] + '%';
                const value = document.createElement('div');
                value.className = 'bar-value';
                value.textContent = barHeights[index] + '%';
                bar.appendChild(value);
            }, index * 500);
        });

        // Animate chart points
        const chartPoints = document.querySelectorAll('.chart-point');
        chartPoints.forEach((point, index) => {
            const emotions = ['😡', '😤', '🔥', '💥', '😈'];
            point.textContent = emotions[index % emotions.length];
            
            // Position points along a curve
            const positions = [
                { left: '10%', bottom: '20%' },
                { left: '30%', bottom: '60%' },
                { left: '50%', bottom: '80%' },
                { left: '70%', bottom: '40%' },
                { left: '90%', bottom: '90%' }
            ];
            
            if (positions[index]) {
                Object.assign(point.style, positions[index]);
            }
        });
    }

    // Setup scroll effects and animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger specific animations based on section
                    this.triggerSectionAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Back to top button
        this.setupBackToTop();
    }

    triggerSectionAnimation(section) {
        const sectionId = section.id;
        
        switch (sectionId) {
            case 'rage':
                this.triggerRageAnimations();
                break;
            case 'style':
                this.triggerStyleAnimations();
                break;
            case 'patience':
                this.triggerPatienceAnimations();
                break;
            case 'love':
                this.triggerLoveAnimations();
                break;
            case 'graphs':
                this.triggerGraphAnimations();
                break;
        }
    }

    triggerRageAnimations() {
        const triggerItems = document.querySelectorAll('.trigger-item');
        triggerItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 200);
        });
    }

    triggerStyleAnimations() {
        const styleItems = document.querySelectorAll('.style-item');
        styleItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) rotate(0)';
                item.style.opacity = '1';
            }, index * 300);
        });
    }

    triggerPatienceAnimations() {
        const scenarioCards = document.querySelectorAll('.scenario-card');
        scenarioCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
                
                // Animate patience bars
                const patienceBar = card.querySelector('.patience-fill');
                if (patienceBar) {
                    const patience = [30, 60, 20, 80][index] || 50;
                    setTimeout(() => {
                        patienceBar.style.width = patience + '%';
                    }, 500);
                }
            }, index * 200);
        });
    }

    triggerLoveAnimations() {
        const reasonCards = document.querySelectorAll('.reason-card');
        reasonCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, index * 150);
        });
    }

    triggerGraphAnimations() {
        const graphItems = document.querySelectorAll('.graph-item');
        graphItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, index * 300);
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top-funny');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Load and setup gallery images
    loadGalleryImages() {
        const galleryImages = ['gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg', 'gallery4.jpg'];
        const mainImage = document.querySelector('.girlfriend-image');
        const styleItems = document.querySelectorAll('.style-image');

        // Set main image to gallery4.jpg as requested
        if (mainImage) {
            mainImage.src = 'gallery4.jpg';
            mainImage.alt = 'My Amazing Hot-Headed Girlfriend';
        }

        // Setup style gallery
        styleItems.forEach((img, index) => {
            if (galleryImages[index]) {
                img.src = galleryImages[index];
                img.alt = `Style ${index + 1}`;
            }
        });
    }

    // Setup Quiz functionality
    setupQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.quizQuestions = [
            {
                question: "What's my girlfriend's rage level on a scale of fire?",
                options: ["🔥 Campfire", "🔥🔥 Bonfire", "🔥🔥🔥 Wildfire", "🔥🔥🔥🔥 VOLCANIC"],
                correct: 3,
                feedback: "VOLCANIC is correct! She's literally a walking volcano! 🌋"
            },
            {
                question: "How long can she stay mad?",
                options: ["5 minutes", "2 hours", "Until I buy food", "Forever (but food helps)"],
                correct: 2,
                feedback: "Food is always the answer! Smart boyfriend move! 🍕"
            },
            {
                question: "What's her cute level?",
                options: ["Adorable", "Super Cute", "Illegally Cute", "Cuteness Overload"],
                correct: 3,
                feedback: "She's literally too cute for this world! Should be illegal! 💕"
            }
        ];

        this.renderQuizQuestion();
        this.setupQuizEvents();
    }

    renderQuizQuestion() {
        const questionContainer = document.querySelector('.quiz-question h3');
        const optionsContainer = document.querySelector('.quiz-options');
        
        if (!questionContainer || !optionsContainer) return;

        const currentQ = this.quizQuestions[this.currentQuestion];
        if (!currentQ) return;

        questionContainer.textContent = currentQ.question;
        optionsContainer.innerHTML = '';

        currentQ.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    selectAnswer(selectedIndex) {
        const currentQ = this.quizQuestions[this.currentQuestion];
        const resultDiv = document.querySelector('.quiz-result');
        const optionsContainer = document.querySelector('.quiz-options');
        
        if (!resultDiv || !optionsContainer) return;

        // Hide options
        optionsContainer.style.display = 'none';
        resultDiv.style.display = 'block';

        const resultTitle = resultDiv.querySelector('h3');
        const resultText = resultDiv.querySelector('p');

        if (selectedIndex === currentQ.correct) {
            this.score++;
            resultTitle.textContent = "Correct! 🎉";
            resultTitle.style.color = '#4ecdc4';
        } else {
            resultTitle.textContent = "Wrong! 😤";
            resultTitle.style.color = '#ff4757';
        }

        resultText.textContent = currentQ.feedback;

        // Show next question or final results
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.quizQuestions.length) {
                this.nextQuestion();
            } else {
                this.showFinalResults();
            }
        }, 3000);
    }

    nextQuestion() {
        const resultDiv = document.querySelector('.quiz-result');
        const optionsContainer = document.querySelector('.quiz-options');
        
        if (resultDiv && optionsContainer) {
            resultDiv.style.display = 'none';
            optionsContainer.style.display = 'grid';
            this.renderQuizQuestion();
        }
    }

    showFinalResults() {
        const quizContainer = document.querySelector('.quiz-container');
        if (!quizContainer) return;

        const percentage = Math.round((this.score / this.quizQuestions.length) * 100);
        let resultMessage = '';
        let resultColor = '';

        if (percentage >= 80) {
            resultMessage = "🏆 ULTIMATE BOYFRIEND! You know her too well!";
            resultColor = '#4ecdc4';
        } else if (percentage >= 60) {
            resultMessage = "😍 Good Boyfriend! You're learning!";
            resultColor = '#ffa502';
        } else {
            resultMessage = "🔥 ROOKIE BOYFRIEND! Time to study more!";
            resultColor = '#ff4757';
        }

        quizContainer.innerHTML = `
            <div class="quiz-final-result">
                <h2 style="color: ${resultColor}; margin-bottom: 2rem; font-size: 2.5rem;">
                    Quiz Complete!
                </h2>
                <div style="font-size: 4rem; margin-bottom: 1rem;">
                    ${percentage}%
                </div>
                <h3 style="color: ${resultColor}; margin-bottom: 2rem;">
                    ${resultMessage}
                </h3>
                <button class="quiz-restart" onclick="location.reload()">
                    Try Again! 🔄
                </button>
            </div>
        `;
    }

    setupQuizEvents() {
        const restartBtn = document.querySelector('.quiz-restart');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.currentQuestion = 0;
                this.score = 0;
                this.renderQuizQuestion();
                
                const resultDiv = document.querySelector('.quiz-result');
                const optionsContainer = document.querySelector('.quiz-options');
                
                if (resultDiv && optionsContainer) {
                    resultDiv.style.display = 'none';
                    optionsContainer.style.display = 'grid';
                }
            });
        }
    }

    // Setup interactive features
    setupInteractiveFeatures() {
        this.setupLoveExplosion();
        this.setupTriggerItems();
        this.setupStyleItems();
        this.setupPatienceScenarios();
        this.setupChartInteractions();
    }

    setupMessageForm() {
        const messageForm = document.querySelector('#messageForm');
        const messageList = document.querySelector('#messageList');

        if (!messageForm || !messageList) return;

        const storageKey = 'yuktaProfileMessages';
        let savedMessages = [];

        try {
            const storedMessages = JSON.parse(localStorage.getItem(storageKey) || '[]');
            if (Array.isArray(storedMessages)) {
                savedMessages = storedMessages.filter(item =>
                    item && typeof item.name === 'string' && typeof item.message === 'string'
                );
            }
        } catch {
            savedMessages = [];
        }

        const renderMessage = ({ name, message }, prepend = false) => {
            const entry = document.createElement('li');
            const author = document.createElement('strong');
            const content = document.createElement('p');
            author.textContent = name;
            content.textContent = message;
            entry.append(author, content);
            if (prepend) {
                messageList.prepend(entry);
            } else {
                messageList.append(entry);
            }
        };

        savedMessages.forEach(message => renderMessage(message));

        messageForm.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(messageForm);
            const name = formData.get('name').trim();
            const message = formData.get('message').trim();
            if (!name || !message) return;

            const newMessage = { name, message };
            savedMessages.unshift(newMessage);
            renderMessage(newMessage, true);

            try {
                localStorage.setItem(storageKey, JSON.stringify(savedMessages));
            } catch {
                savedMessages.shift();
            }

            messageForm.reset();
        });
    }

    setupLoveExplosion() {
        const loveBtn = document.querySelector('.love-explosion-btn');
        const finalLoveBtn = document.querySelector('.final-love-btn');

        [loveBtn, finalLoveBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    this.createConfetti();
                    this.addHeartExplosion(btn);
                });
            }
        });
    }

    createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container') || this.createConfettiContainer();
        const colors = ['#ff4757', '#ff3742', '#a55eea', '#3742fa', '#ffa502', '#ff6348'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }

    createConfettiContainer() {
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);
        return container;
    }

    addHeartExplosion(button) {
        const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '💞', '💘', '😍', '🥰'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (3 + Math.random() * 2) + 'rem'; // Bigger hearts: 3-5rem
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            const rect = button.getBoundingClientRect();
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(heart);
            
            // Animate heart explosion with bigger spread
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 150 + Math.random() * 200; // Bigger explosion radius
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.animate([
                { 
                    transform: 'translate(0, 0) scale(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX}px, ${endY}px) scale(2) rotate(${Math.random() * 720}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: 2500, // Longer animation
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            });
        }
    }

    setupTriggerItems() {
        const triggerItems = document.querySelectorAll('.trigger-item');
        triggerItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.dataset.fire === 'true') {
                    item.classList.add('fire-effect');
                    setTimeout(() => item.classList.remove('fire-effect'), 500);
                }
            });
        });
    }

    setupStyleItems() {
        const styleItems = document.querySelectorAll('.style-item');
        styleItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.add('cool-effect');
                setTimeout(() => item.classList.remove('cool-effect'), 1000);
            });
        });
    }

    setupPatienceScenarios() {
        const scenarioCards = document.querySelectorAll('.scenario-card');
        scenarioCards.forEach(card => {
            card.addEventListener('click', () => {
                const patienceBar = card.querySelector('.patience-fill');
                if (patienceBar) {
                    // Reset and re-animate
                    patienceBar.style.width = '0%';
                    setTimeout(() => {
                        const randomPatience = Math.random() * 100;
                        patienceBar.style.width = randomPatience + '%';
                    }, 100);
                }
            });
        });
    }

    setupChartInteractions() {
        const chartPoints = document.querySelectorAll('.chart-point');
        chartPoints.forEach((point, index) => {
            point.addEventListener('click', () => {
                point.style.fontSize = '3rem';
                setTimeout(() => {
                    point.style.fontSize = '2rem';
                }, 300);
                
                // Show tooltip
                this.showTooltip(point, `Anger Level: ${(index + 1) * 20}%`);
            });
        });
    }

    showTooltip(element, text) {
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            z-index: 9999;
            pointer-events: none;
            transform: translateX(-50%);
        `;

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 40 + 'px';

        document.body.appendChild(tooltip);

        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 2000);
    }

    startAnimations() {
        // Start continuous animations
        this.animateFireEmojis();
        this.animateBrandElements();
    }

    animateFireEmojis() {
        const fireEmojis = document.querySelectorAll('.fire-emoji');
        fireEmojis.forEach((emoji, index) => {
            setInterval(() => {
                emoji.style.transform = `scale(${1 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`;
            }, 2000 + index * 500);
        });
    }

    animateBrandElements() {
        const brandFire = document.querySelector('.brand-fire');
        const brandHeart = document.querySelector('.brand-heart');

        if (brandFire) {
            setInterval(() => {
                brandFire.textContent = ['🔥', '💥', '⚡'][Math.floor(Math.random() * 3)];
            }, 3000);
        }

        if (brandHeart) {
            setInterval(() => {
                brandHeart.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
            }, 2000);
        }
    }

    setupEventListeners() {
        // Setup all event listeners
        this.setupEasterEggs();
    }

    // Easter eggs and fun interactions
    setupEasterEggs() {
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 50) {
                this.showSpecialMessage();
            }
        });

        // Secret keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyF' && e.ctrlKey) {
                e.preventDefault();
                this.triggerFireWorks();
            }
            if (e.code === 'KeyL' && e.ctrlKey) {
                e.preventDefault();
                this.triggerLoveRain();
            }
        });
    }

    showSpecialMessage() {
        alert("🎉 You clicked 50 times! Your girlfriend says: 'Stop playing with the website and come cuddle!' 💕");
    }

    triggerFireWorks() {
        this.createConfetti();
        setTimeout(() => this.createConfetti(), 1000);
        setTimeout(() => this.createConfetti(), 2000);
    }

    triggerLoveRain() {
        const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}%;
                    font-size: 2rem;
                    z-index: 9999;
                    pointer-events: none;
                    animation: heartFall 3s linear forwards;
                `;
                document.body.appendChild(heart);

                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 3000);
            }, i * 200);
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new HotHeadedWebsite();
    
    // Setup additional CSS for dynamic animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFall {
            to { transform: translateY(100vh) rotate(360deg); }
        }
        
        .tooltip {
            animation: tooltipFadeIn 0.3s ease-in-out;
        }
        
        @keyframes tooltipFadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        .quiz-final-result {
            text-align: center;
            padding: 2rem;
            animation: resultSlideIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes resultSlideIn {
            from { transform: scale(0.8) rotate(-5deg); opacity: 0; }
            to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .fire-effect {
            animation: fireShake 0.5s ease-in-out !important;
        }
        
        .love-effect {
            animation: heartBeat 0.8s ease-in-out !important;
        }
        
        .cool-effect {
            animation: coolGlow 1s ease-in-out !important;
        }
        
        @keyframes fireShake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg) scale(1.2); }
            75% { transform: rotate(5deg) scale(1.2); }
        }
        
        @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        @keyframes coolGlow {
            0%, 100% { 
                box-shadow: 0 0 20px rgba(116, 185, 255, 0.6);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 40px rgba(116, 185, 255, 0.8);
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log("🔥 Hot-Headed Website Loaded! Your girlfriend's digital tribute is ready! 💕");
});

// Global function for video replay
function replayFirstVideo() {
    const video = document.querySelector('.yukta-video');
    if (video) {
        video.currentTime = 0;
        video.play();
        
        // Create heart explosion effect
        const button = event.target;
        const hearts = ['💖', '💕', '💗', '💓', '💝'];
        
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (2.5 + Math.random() * 2.5) + 'rem'; // Even bigger for video replay
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            const rect = button.getBoundingClientRect();
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(heart);
            
            // Animate heart explosion
            const angle = (Math.PI * 2 * i) / 25;
            const distance = 100 + Math.random() * 200;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.animate([
                { 
                    transform: 'translate(0, 0) scale(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX}px, ${endY}px) scale(2.5) rotate(${Math.random() * 720}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: 3000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            });
        }
        
        // Show sweet message
        setTimeout(() => {
            alert("🎬 Replaying the video that made me fall head over heels! Still gives me butterflies every time! 💕");
        }, 500);
    }
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HotHeadedWebsite;
}

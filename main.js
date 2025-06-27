import { animate, stagger } from "https://esm.run/framer-motion";

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');
    const volumeIcon = document.getElementById('volume-icon');
    const volumeXIcon = document.getElementById('volume-x-icon');
    const finalMessageContainer = document.getElementById('final-message-container');
    const sceneContainer = document.getElementById('scene-container');

    function startExperience() {
        startScreen.style.opacity = '0';
        startScreen.style.pointerEvents = 'none';
        
        mainContent.classList.remove('hidden');
        
        audio.play().catch(error => {
            console.log("Autoplay was prevented. User needs to interact with the document first.");
        });

        setTimeout(() => {
            startScreen.style.display = 'none';
            startAnimationSequence();
        }, 1000); 
    }

    async function startAnimationSequence() {
        const sceneTransitionDuration = 1.5;
        const sceneDisplayDuration = 3000;
        const ease = [0.4, 0, 0.2, 1];
        const textEase = [0.22, 1, 0.36, 1];


        await animate("#scene-1", { opacity: 1, scale: 1 }, { duration: sceneTransitionDuration, ease }).finished;
        await animate("#line1-1", { opacity: 1, y: 0 }, { duration: 1, ease: textEase, delay: 0.2 }).finished;
        await animate("#line1-2", { opacity: 1, y: 0 }, { duration: 1, ease: textEase }).finished;
        animate("#volleyball", { opacity: 1, left: 'calc(50% - 2.5rem)', rotate: [0, 360] }, { duration: 1.8, ease: [0.34, 1.56, 0.64, 1] });
        await new Promise(resolve => setTimeout(resolve, sceneDisplayDuration));


        animate("#scene-1", { opacity: 0, scale: 1.1 }, { duration: sceneTransitionDuration, ease });
        await animate("#scene-2", { opacity: 1, scale: 1 }, { duration: sceneTransitionDuration, ease }).finished;


        await animate("#line2-1", { opacity: 1, y: 0 }, { duration: 1, ease: textEase, delay: 0.2 }).finished;
        await animate("#line2-2", { opacity: 1, y: 0 }, { duration: 1, ease: textEase }).finished;
        animate(
            ".sweet",
            { opacity: 1, scale: [0, 1.2, 1], rotate: () => (Math.random() - 0.5) * 40 },
            { delay: stagger(0.15, { startDelay: 0.3 }), duration: 0.8, ease: "backOut" }
        );
        await new Promise(resolve => setTimeout(resolve, sceneDisplayDuration));


        animate("#scene-2", { opacity: 0, scale: 1.1 }, { duration: sceneTransitionDuration, ease });
        await animate("#scene-3", { opacity: 1, scale: 1 }, { duration: sceneTransitionDuration, ease }).finished;
        

        await animate("#line3-1", { opacity: 1, y: 0 }, { duration: 1.5, ease: textEase, delay: 0.2 }).finished;
        await new Promise(resolve => setTimeout(resolve, sceneDisplayDuration));


        animate("#scene-3", { opacity: 0, scale: 1.1 }, { duration: sceneTransitionDuration, ease });
        await animate("#scene-4", { opacity: 1, scale: 1 }, { duration: sceneTransitionDuration, ease }).finished;
        

        await animate("#line4-1", { opacity: 1, y: 0 }, { duration: 1.5, ease: textEase, delay: 0.2 }).finished;
        await new Promise(resolve => setTimeout(resolve, sceneDisplayDuration + 1000));


        showFinalMessage();
    }

    async function showFinalMessage() {
        animate(sceneContainer, { opacity: 0 }, { duration: 1.5, ease: [0.4, 0, 0.2, 1] });
        await animate(finalMessageContainer, { opacity: 1, pointerEvents: 'auto' }, { duration: 1, delay: 0.5 }).finished;
        await animate(".final-card", { opacity: 1, scale: 1, y: 0 }, { duration: 1, ease: "easeOut" }).finished;
        animate(
            ".final-card .content-to-animate",
            { opacity: 1, y: 0 },
            { delay: stagger(0.4), duration: 1, ease: "easeOut" }
        );
    }

    function toggleMute() {
        audio.muted = !audio.muted;
        if (audio.muted) {
            volumeIcon.classList.add('hidden');
            volumeXIcon.classList.remove('hidden');
        } else {
            volumeIcon.classList.remove('hidden');
            volumeXIcon.classList.add('hidden');
        }
    }

    startBtn.addEventListener('click', startExperience);
    muteBtn.addEventListener('click', toggleMute);
});

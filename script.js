document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor tracking
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add slight delay for blur for a trailing effect
        setTimeout(() => {
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effects on cursor
    const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // Typing Effect in Hero
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Data Science Enthusiast", "Full-Stack Developer", "AI Enthusiast", "Engineer"];
    const typingDelay = 100;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    setTimeout(type, newTextDelay);

    // Intersection Observer for scroll animations (fade up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has appeared
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply fade-up to sections and cards
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .skills-container, .project-card, .contact-wrapper');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
});

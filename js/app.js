document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const magnetics = document.querySelectorAll('.magnetic');

    // Only apply custom cursor on non-touch devices
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move fast cursor dot immediately
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // Smooth follow loop for the outer circle
        const loop = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(loop);
        };
        loop();

        // Magnetic hover effects
        magnetics.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-magnetic');
                follower.classList.add('hover-magnetic');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-magnetic');
                follower.classList.remove('hover-magnetic');
                el.style.transform = '';
            });

            // Magnetic pull logic
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const diffX = e.clientX - centerX;
                const diffY = e.clientY - centerY;
                
                // Subtle pull on the element itself
                el.style.transform = `translate(${diffX * 0.2}px, ${diffY * 0.2}px)`;
            });
        });
    }

    // Scroll Animations using Intersection Observer
    const fadeEls = document.querySelectorAll('.fade-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const flexObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeEls.forEach(el => flexObserver.observe(el));
});

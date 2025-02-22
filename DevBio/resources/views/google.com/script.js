// mouse move

const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    const x = e.pageX; // Use pageX instead of clientX
    const y = e.pageY; // Use pageY instead of clientY

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    // Particle effect
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    setTimeout(() => {
        particle.remove();
    }, 500);
});








// ءءءءءءءءءءءءءءءءءءءءءءءءءءءءءءءءءءء
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    gsap.to('.container', {
        opacity: 1,
        duration: 0.5
    });

    gsap.to('.theme-toggle', {
        opacity: 1,
        duration: 0.5
    });

    // Navbar animations
    gsap.from('.navbar-logo img', {
        scale: 0.5,
        opacity: 0.9,
        duration: 0.5,
        ease: 'back.out'
    });

    gsap.from('.navbar-logo h1', {
        x: -20,
        opacity: 1,
        duration: 0.5,
        delay: 0.2
    });

    // Intro section animation
    gsap.to('.intro', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Categories stagger animation
    gsap.to('.category', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power2.out'
    });

    // Links stagger animation
    gsap.to('.link-item', {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.8,
        ease: 'power1.out'
    });

    // Footer animation
    gsap.to('.footer', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1
    });
});


// Dark Mode Toggle Functionality
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Check for a saved theme preference in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    // Rotate the toggle icon for visual feedback
    gsap.to(themeToggle, { rotation: "+=180", duration: 0.5 });
});

// Add hover animations for links
document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link.querySelector('.link-icon'), {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link.querySelector('.link-icon'), {
            scale: 1,
            duration: 0.2,
            ease: 'power2.in'
        });
    });
});

// Add hover animations for category cards
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        gsap.to(category, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    category.addEventListener('mouseleave', () => {
        gsap.to(category, {
            y: 0,
            duration: 0.3,
            ease: 'power2.in'
        });
    });
});

// Add hover animations for social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            y: -3,
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.in'
        });
    });
});




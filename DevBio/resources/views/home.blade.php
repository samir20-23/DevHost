@extends('layouts.app')

@section('title', 'Home Page')
@push('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .cursor { position: fixed; width: 10px; height: 10px; background: black; border-radius: 50%; }
        .navbar { display: flex; justify-content: space-between; padding: 10px; background: #333; color: white; }
        .container { padding: 20px; }
        .category { margin-bottom: 20px; }
    </style>
@endpush
@push('styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root {
            --bg-light: #ffffff;
            --text-light: #1a1a1a;
            --card-light: #f5f5f5;
            --hover-light: #e0e0e0;
            --primary: #612a84;
            --primary2: rgba(64, 19, 137, 0.667)4;

            --primary-light: #5f3ba3;

            --bg-dark: #1a1a1a;
            --text-dark: #ffffff;
            --card-dark: #2d2d2d;
            --hover-dark: #3d3d3d;

            --gradient-light: linear-gradient(135deg, var(--primary), var(--primary-light));
            --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1);
            --shadow-dark: 0 4px 6px rgba(0, 0, 0, 0.3);
        }



        /* mouse */
        .cursor {
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--primary2) 0%, var(--primary-light) 50%, rgba(0, 255, 255, 0) 100%);
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            pointer-events: none;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.255);
            transition: transform 0.05s linear;
            z-index: 2;
        }

        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--primary2);
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(0, 38, 255, 0.477);
            animation: fadeOut 0.5s linear forwards;
        }

        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
            }

            100% {
                opacity: 0;
                transform: scale(2);
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }

        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background-color: var(--bg-light);
            color: var(--text-light);
            line-height: 1.6;
            padding-top: 70px;
            overflow-x: hidden;
        }

        body.dark-mode {
            background-color: var(--bg-dark);
            color: var(--text-dark);
        }

        /* Navbar */
        .navbar {
            width: 100%;
            height: 60px;
            background-color: var(--card-light);
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            padding: 0 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        body.dark-mode .navbar {
            background-color: var(--card-dark);
        }

        .navbar-logo {
            display: flex;
            align-items: center;
        }

        .navbar-logo img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .navbar-logo h1 {
            font-size: 1.5rem;
            color: var(--primary);
            margin-left: 10px;
        }

        .theme-toggle {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            font-size: 1.5rem;
            margin-left: auto;
            opacity: 0;
        }


        .dark-mode .theme-toggle {
            color: var(--text-dark);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            opacity: 0;
        }

        .intro {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            border-radius: 15px;
            background: var(--card-light);
            box-shadow: var(--shadow-light);
            transform: translateY(20px);
            opacity: 0;
        }

        .dark-mode .intro {
            background: var(--card-dark);
            box-shadow: var(--shadow-dark);
        }

        .intro h2 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            background: var(--gradient-light);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .intro p {
            font-size: 1.1rem;
            max-width: 800px;
            margin: 0 auto;
        }

        .categories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 40px;
        }

        .category {
            background-color: var(--card-light);
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: var(--shadow-light);
            opacity: 0;
            transform: translateY(20px);
            position: relative;
            overflow: hidden;
        }

        .category::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--gradient-light);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }

        .category:hover::before {
            transform: scaleX(1);
        }

        .dark-mode .category {
            background-color: var(--card-dark);
            box-shadow: var(--shadow-dark);
        }

        .category-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .category-icon {
            font-size: 1.2rem;
            color: var(--primary);
        }

        .links-list {
            list-style: none;
            margin-top: 1rem;
        }

        .link-item {
            margin: 0.75rem 0;
            transform: translateX(-20px);
            opacity: 0;
        }

        .link {
            color: inherit;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.75rem;
            border-radius: 8px;
            background-color: rgba(97, 42, 132, 0.1);
            transition: all 0.3s ease;
        }

        .link:hover {
            background-color: var(--hover-light);
            transform: translateX(5px) scale(1.02);
        }

        .dark-mode .link:hover {
            background-color: var(--hover-dark);
        }

        .link-icon {
            font-size: 1.2rem;
            color: var(--primary);
            transition: transform 0.3s ease;
        }

        .link:hover .link-icon {
            transform: scale(1.2);
        }

        .footer {
            background-color: var(--card-light);
            padding: 30px 20px;
            text-align: center;
            font-size: 0.9rem;
            border-top: 1px solid var(--hover-light);
            opacity: 0;
            transform: translateY(20px);
        }

        .dark-mode .footer {
            background-color: var(--card-dark);
            border-top: 1px solid var(--hover-dark);
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
        }

        .social-icon {
            color: var(--primary);
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }

        .social-icon:hover {
            color: var(--primary-light);
            transform: translateY(-3px);
        }

        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }

            .categories {
                grid-template-columns: 1fr;
            }

            .intro h2 {
                font-size: 2rem;
            }

        }

        /* Animation Classes */
        .fade-up {
            opacity: 0;
            transform: translateY(20px);
        }

        .fade-in {
            opacity: 0;
        }

        .slide-in {
            opacity: 0;
            transform: translateX(-20px);
        }
    </style>
@endpush


@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
@endpush
@section('content')
   
        <div class="cursor"></div>
        <!-- Navbar -->
        <nav class="navbar">
            <div class="navbar-logo">
                <img src="https://avatars.githubusercontent.com/u/144660881?v=4" alt="Logo" />
                <h1>DevGenius</h1>
            </div>
            <button class="theme-toggle" aria-label="Toggle dark mode">🌓</button>
        </nav>


        <div class="container">
            <section class="intro fade-up">
                <h2>Welcome to My Hub!</h2>
                <p>Discover all my important links in one place. From social media to projects, everything you need
                    about me
                    is right
                    here.</p>
            </section>
 
            <main class="categories">
                @foreach ($links->groupBy('category') as $category => $groupedLinks)
                    <div class="category">
                        <h2 class="category-title">
                            <i class="fas fa-hashtag category-icon"></i>
                            {{ $category }}
                        </h2>
                        <ul class="links-list">
                            @foreach ($groupedLinks as $link)
                                <li class="link-item">
                                    <a target="_blank" href="{{ $link->url }}" class="link" target="_blank">
                                        <i class="{{ $link->icon }} link-icon"></i>
                                        {{ $link->title }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endforeach
            </main> 

    </div>

    <footer class="footer">
        <div class="social-links">
            <a target="_blank" href="https://github.com/samir20-23" class="social-icon"><i class="fab fa-github"></i></a>
            <a target="_blank" href="https://x.com/Samir_Germany1" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a target="_blank" href="https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/" class="social-icon"><i
                    class="fab fa-linkedin"></i></a>
            <a target="_blank" href="https://www.instagram.com/samir_devgenius/" class="social-icon"><i
                    class="fab fa-instagram"></i></a>
        </div>
        <p>© 2024 My Links Hub. All rights reserved.</p>
    </footer>


 
@endsection

@push('scripts')
<script>
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
        gsap.to(themeToggle, {
            rotation: "+=180",
            duration: 0.5
        });
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
</script>
@endpush

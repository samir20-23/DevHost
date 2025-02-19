<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Translation Dictionary</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Ensure the video covers the entire hero section */
        #videoBackround {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -11;
            width: 100%;
            height: 100vh;
            /* Full viewport height */
            overflow: hidden;
            width: 100%;
            background: #111827;


        }

        #background-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.4);
            /* Adjust the value (0.5 = 50% brightness) */
            /* Ensures the video covers the entire area */
            z-index: -1;
            /* Places the video behind other content */

        }

        /* Center the content on top of the video */
        .text-center {
            position: relative;
            z-index: 1;
            /* Ensures the text is above the video */
            padding-top: 20vh;
            /* Adjust as needed to center the content vertically */
        }

        /* Ensure other sections are visible and properly spaced */
        .max-w-3xl,
        .grid,
        .container {
            position: relative;
            z-index: 1;
            /* Ensures these sections are above the video */
            margin-top: 2rem;
            /* Add spacing between sections */
        }

        /* Additional styling for the search section */
        .bg-gray-800 {
            background-color: rgba(31, 41, 55, 0.8);
            /* Semi-transparent background */
        }
    </style>
</head>

<body class="bg-gray-900 text-gray-100 font-[Inter] min-h-screen">
    <!-- Navigation -->

    <nav class="bg-gray-800 border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <!-- Left side nav -->
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <h1 class="text-xl font-bold text-indigo-400">WordFlow</h1>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <a href="/word"
                            class="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Table words
                        </a>
                        <a href="#"
                            class="border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            home
                        </a>

                    </div>
                </div>

                <!-- Right side nav -->
                <div class="flex items-center">
                    <!-- Theme Toggle -->
                    <button class="p-2 text-gray-300 hover:text-white mr-4">
                        <i data-lucide="moon" class="h-5 w-5"></i>
                    </button>

                    <!-- Profile Dropdown -->
                    <div class="relative ml-3">
                        <div>
                            <button type="button"
                                onclick="document.getElementById('profile-menu').classList.toggle('hidden')"
                                class="bg-gray-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <img class="h-8 w-8 rounded-full"
                                    src="https://ui-avatars.com/api/?name=User&background=random" alt="Profile">
                            </button>
                        </div>

                        <!-- Profile dropdown menu -->
                        <div id="profile-menu"
                            class="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 py-1">
                            <a href="/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Your
                                Profile</a>
                            <a href="/settings"
                                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Settings</a>
                            <form method="POST" action="/logout" class="block">
                                @csrf
                                <button type="submit"
                                    class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Sign
                                    out</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <div id="videoBackround">
            <div style="position: relative;">
                <video id="background-video" playsinline muted loop class="section-background__video">
                    <source
                        src="https://storage.googleapis.com/popshopprod-shop-renderer-assets-q9gk7sc6/themes/assets/74253f59-c16d-4728-9ad6-803da8ffdc5e/assets/hero-video-with-multiple-buttons-1700666646-video-ab4ceb1e95742187fe677bf9070cf092638955e28eec6d5b87a3db7455d9948b.mp4"
                        type="video/mp4">
                </video>
                <div
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5);">
                </div>
            </div>


            <script>
                document.addEventListener("DOMContentLoaded", function() {
                    var video = document.getElementById("background-video");
                    if (video) {
                        video.play().catch(function(error) {
                            console.log("Autoplay failed:", error);
                        });
                    }
                });
            </script>
        </div>
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">Learn Languages Effectively</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Explore thousands of words and their translations. Practice daily
                to improve your language skills.</p>
            <br>
            <a href="/word"
                class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Create Words
            </a>
        </div>

        <!-- Search Section -->
        <div class="max-w-3xl mx-auto mb-8">
            <div class="flex items-center bg-gray-800 rounded-lg p-2 shadow-lg">
                <input type="text" placeholder="Search for words..."
                    class="flex-1 bg-transparent border-0 focus:ring-0 text-white px-4 py-2 placeholder-gray-400">
                <button class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Search
                </button>

            </div>

        </div>

        <!-- Word Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            @foreach ($data as $item)
                <div class="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-semibold text-white">{{ $item->word }}</h3>

                        <!-- Check if the current word is already bookmarked -->
                        @if (in_array($item->id, $userBookmarks))
                            <!-- If bookmarked, show a "bookmarked" icon (e.g., filled bookmark icon) -->
                            <span class="text-yellow-400">
                                <form action="{{ route('home.destroy', $item->id) }}" method="POST" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                        class="bookmark-btn text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                        data-active="false">
                                        <i data-lucide="bookmark" class="h-5 w-5" style="color: rgb(142, 50, 255);"></i>
                                    </button>
                                </form>
                            </span>
                        @else
                            <!-- If not bookmarked, show a bookmark button -->
                            <form id="formSaveBookmarks" action="{{ route('home.saveBookmarks', $item->id) }}"
                                method="POST">
                                @csrf
                                <button type="submit"
                                    class="bookmark-btn text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                    data-active="false">
                                    <i data-lucide="bookmark" class="h-5 w-5"></i>
                                </button>
                            </form>
                        @endif

                    </div>
                    <p class="text-2xl text-gray-300 mb-4">{{ $item->translation }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-400">{{ $item->language }}</span>
                        <button class="text-sm text-indigo-400 hover:text-indigo-300">Practice</button>
                    </div>
                </div>
            @endforeach

        </div>

        <!-- Quick Stats -->

        <div class="container mx-auto mt-10">
            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="bg-gray-800 rounded-lg p-6 text-center">
                    <h4 class="text-lg font-semibold text-gray-300 mb-2">Words Learned</h4>
                    <p class="text-3xl font-bold text-indigo-400">{{ $wordsCount }}</p> <!-- Dynamic words count -->
                </div>
                <div class="bg-gray-800 rounded-lg p-6 text-center">
                    <h4 class="text-lg font-semibold text-gray-300 mb-2">Daily Streak</h4>
                    <p class="text-3xl font-bold text-indigo-400">days</p> <!-- Dynamic streak -->
                </div>
                <div class="bg-gray-800 rounded-lg p-6 text-center">
                    <h4 class="text-lg font-semibold text-gray-300 mb-2">Accuracy</h4>
                    <p class="text-3xl font-bold text-indigo-400">{{ $accuracy }}%</p> <!-- Dynamic accuracy -->
                </div>

            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 mt-12">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <p class="text-gray-400 text-sm">© 2024 WordFlow. All rights reserved.</p>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-gray-300">
                        <i data-lucide="twitter" class="h-5 w-5"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-gray-300">
                        <i data-lucide="github" class="h-5 w-5"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-gray-300">
                        <i data-lucide="instagram" class="h-5 w-5"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Close profile menu when clicking outside
        window.addEventListener('click', function(e) {
            const menu = document.getElementById('profile-menu');
            const profileButton = e.target.closest('button');

            if (!profileButton && !menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
    </script>
<script>
        function toggleBookmark(button) {


            const isActive = button.getAttribute('data-active') === 'true';
            button.setAttribute('data-active', !isActive);
            const icon = button.querySelector('i');

            if (!isActive) {
                // Bookmark added
                button.classList.remove('text-gray-400');
                button.classList.add('text-indigo-400');

                // Enhanced animation with glow effect
                button.style.transform = 'scale(1.2)';
                icon.style.color = 'red';
                icon.style.textShadow = '0 0 3px red';

                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);

                showNotification('Word added to bookmarks');


                {{ route('word.destroy', $item->id) }}

            } else {
                // Bookmark removed
                button.classList.remove('text-indigo-400');
                button.classList.add('text-gray-400');

                // Remove glow effect
                icon.style.color = 'red';
                icon.style.textShadow = 'none';

                showNotification('Word removed from bookmarks');
            }

        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = `
        fixed bottom-4 right-4 
        bg-gray-800 text-white 
        px-4 py-2 rounded-lg 
        shadow-lg transform 
        transition-all duration-300 
        translate-y-full
        z-50
     `;
            notification.textContent = message;

            document.body.appendChild(notification);

            // Improved animation timing
            requestAnimationFrame(() => {
                notification.style.transform = 'translateY(0)';
                notification.style.opacity = '1';
            });

            setTimeout(() => {
                notification.style.transform = 'translateY(10px)';
                notification.style.opacity = '0';

                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }

        // Enhanced styles
        const style = document.createElement('style');
        style.textContent = `
    .bookmark-btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }
    
    .bookmark-btn[data-active="true"] i {
        fill: currentColor;
    }

    .bookmark-btn:hover {
        transform: translateY(-1px);
    }

    .bookmark-btn:active {
        transform: translateY(0px);
    }
   `;
        document.head.appendChild(style);
</script>

</body>

</html>

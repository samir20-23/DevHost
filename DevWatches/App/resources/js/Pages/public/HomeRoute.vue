<template>
    <div class="bg-beige h-screen flex flex-col">
        <!-- Flex container for the three main sections (left, center, right) -->
        <div class="relative flex flex-row justify-between items-center h-screen w-full gap-8">
            <!-- LEFT SECTION -->
            <div class="bg-dark text-white w-full md:w-2/3 h-screen rounded-r-[340px] p-12 flex flex-col">
                <!-- Navigation Bar -->
                <nav class="flex flex-row gap-24 text-xl">
                    <h1 class="font-bold">LOGO</h1>
                    <ul class="flex flex-row gap-12 font-light">
                        <li>
                            <a href="#"
                                class="hover:underline hover:decoration-beige hover:underline-offset-4 hover:text-beige">Home</a>
                        </li>
                        <li>
                            <a href="#"
                                class="hover:underline hover:decoration-beige hover:underline-offset-4 hover:text-beige">About</a>
                        </li>
                        <li>
                            <a href="#"
                                class="hover:underline hover:decoration-beige hover:underline-offset-4 hover:text-beige">Contact</a>
                        </li>
                    </ul>
                </nav>
                <!-- Main Content: Title, Sub-title, and Price -->
                <div class="flex flex-col gap-10 pl-24 pt-44">
                    <div class="flex flex-col">
                        <h1 class="text-7xl font-semibold">Titan Crest</h1>
                        <p class="text-7xl text-transparent [-webkit-text-stroke:1px_white]">
                            Amoled Display
                        </p>
                    </div>
                    <p class="text-4xl">$ 499.99</p>
                </div>
                <!-- Explore Section with Arrow -->
                <div class="ml-24 mt-24 flex gap-2 hover:cursor-pointer"
                    style="animation: bounceFromMiddle 2s infinite">
                    <span class="text-xl">EXPLORE</span>
                    <img src="../../../assets/Arrow_down.png" alt="Arrow - Down" class="w-6" />
                </div>
            </div>

            <!-- CENTER IMAGE (Absolutely Positioned) -->
            <div class="absolute inset-0 flex justify-end pr-[16.7rem] items-center z-10 pointer-events-none">
                <img src="../../../assets/watch.png" alt="watch" class="max-h-[50vh] object-contain" />
                <div
                    class="text-white text-xl font-semibold absolute inset-0 flex justify-center items-center z-10 pl-[27.5rem] pt-[36rem]">
                    Order Now
                </div>
            </div>

            <!-- RIGHT SECTION -->
            <!-- Added 'relative' to contain absolute positioned elements -->
            <div class="bg-dark text-white w-full md:w-1/3 h-screen rounded-l-[340px] flex relative">
                <!-- Login Button -->
                <div class="absolute top-12 right-12 flex gap-6">
                    <button
                        class="text-xl hover:underline hover:decoration-beige hover:underline-offset-4 hover:text-beige">
                    <a href="/login">Login</a>
                    </button>
                    <button class="bg-beige text-dark text-xl px-4 py-2 rounded hover:bg-beige/90 hover:text-gray-700">
                    <a href="/Register">Register</a>
                        
                    </button>
                </div>
                <!-- Circular Frame with Secondary Watch Image -->
                <div class="relative border border-white rounded-3xl w-48 h-48 mb-28 ml-48 self-center">
                    <img src="../../../assets/watch2.png" alt="watch"
                        class="absolute h-56 w-56 object-cover -mt-4 ml-1" />
                </div>
                <!-- Right Arrow Indicator -->
                <div>
                    <img src="../../../assets/Arrow_Right.svg" alt="Arrow" class="w-6 absolute top-44 right-20" />
                </div>
                <!-- Left Arrow Indicator -->
                <div>
                    <img src="../../../assets/Arrow_left.svg" alt="Arrow" class="w-6 absolute bottom-72 right-52" />
                </div>
                <!-- Pagination Indicator -->
                <div
                    class="border border-white rounded-full w-10 h-10 flex justify-center items-center absolute bottom-16 right-16">
                    1/4
                </div>
            </div>
        </div>
    </div>
</template>

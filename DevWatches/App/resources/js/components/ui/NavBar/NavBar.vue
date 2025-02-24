<script setup>
import { ref } from "vue";
import { BellIcon, MenuIcon, XIcon } from "lucide-vue-next";

const navigation = [{ name: "Home", href: "/", current: true }];

const isUserMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
</script>

<template>
    <nav class="bg-background border-b border-border shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a
                                v-for="item in navigation"
                                :key="item.name"
                                :href="item.href"
                                :class="[
                                    item.current
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                                    'px-3 py-1 rounded-md font-semibold',
                                ]"
                                :aria-current="
                                    item.current ? 'page' : undefined
                                "
                            >
                                {{ item.name }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex items-center">
                        <router-link
                            to="/login"
                            type="button"
                            class="rounded px-3 py-1 font-semibold text-slate-700 bg-accent hover:text-slate-900"
                        >
                            Login
                        </router-link>
                    </div>
                    <div class="ml-2 flex items-center md:ml-4">
                        <router-link
                            to="/register"
                            type="button"
                            class="rounded px-4 py-1 font-semibold text-slate-100 bg-primary hover:text-slate-200 hover:bg-primary"
                            >Register</router-link
                        >
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <button
                        type="button"
                        class="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        aria-controls="mobile-menu"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    >
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon
                            v-if="!isMobileMenuOpen"
                            class="block h-6 w-6"
                            aria-hidden="true"
                        />
                        <XIcon
                            v-else
                            class="block h-6 w-6"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div v-if="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a
                        v-for="item in navigation"
                        :key="item.name"
                        :href="item.href"
                        :class="[
                            item.current
                                ? 'bg-accent text-accent-foreground'
                                : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                            'block px-3 py-2 rounded-md text-base font-medium',
                        ]"
                        :aria-current="item.current ? 'page' : undefined"
                    >
                        {{ item.name }}
                    </a>
                </div>
                <div class="pt-4 pb-3 border-t border-border">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img
                                class="h-10 w-10 rounded-full"
                                src=""
                                alt=""
                            />
                        </div>
                        <div class="ml-3">
                            <div
                                class="text-base font-medium leading-none text-foreground"
                            >
                                Tom Cook
                            </div>
                            <div
                                class="text-sm font-medium leading-none text-muted-foreground"
                            >
                                tom@example.com
                            </div>
                        </div>
                        <button
                            type="button"
                            class="ml-auto flex-shrink-0 rounded-full bg-background p-1 text-foreground hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="mt-3 px-2 space-y-1">
                        <a
                            v-for="item in userNavigation"
                            :key="item.name"
                            :href="item.href"
                            class="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            {{ item.name }}
                        </a>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>

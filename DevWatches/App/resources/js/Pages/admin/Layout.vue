<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Importation des composants UI et icônes
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Home,
    Package,
    Users,
    ShoppingCart,
    CircleUser,
    PanelLeft,
} from "lucide-vue-next";

const isSidebarOpen = ref(false);

</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <!-- Navbar -->
        <header
            class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6"
        >
            <!-- Bouton pour ouvrir le menu sur mobile -->
            <Sheet v-model:open="isSidebarOpen">
                <SheetTrigger as-child>
                    <Button size="icon" variant="outline" class="sm:hidden">
                        <PanelLeft class="h-5 w-5" />
                        <span class="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" class="sm:max-w-xs">
                    <nav class="grid gap-6 text-lg font-medium">
                        <router-link
                            to="/"
                            class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home class="h-5 w-5" /> Home
                        </router-link>
                        <router-link
                            to=""
                            class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            Dashboard
                        </router-link>
                    </nav>
                </SheetContent>
            </Sheet>

            <!-- Navigation principale -->
            <nav class="hidden sm:flex gap-6 text-lg font-medium">
                <router-link
                    to="/"
                    class="text-muted-foreground hover:text-foreground"
                    >Home</router-link
                >
                <router-link
                    to=""
                    class="text-muted-foreground hover:text-foreground"
                    >Dashboard</router-link
                >
            </nav>

            <div class="ml-auto"></div>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button
                        variant="secondary"
                        size="icon"
                        class="rounded-full"
                    >
                        <CircleUser class="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>

        <div class="flex flex-1">
            <!-- Sidebar -->
            <aside class="hidden sm:flex w-64 flex-col border-r p-4">
                <nav class="space-y-4">
                    <router-link
                        to="/admin/products"
                        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Package class="h-5 w-5" /> Produits
                    </router-link>
                    <router-link
                        to="/admin/users"
                        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Users class="h-5 w-5" /> Utilisateurs
                    </router-link>
                    <router-link
                        to="/admin/orders"
                        class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <ShoppingCart class="h-5 w-5" /> Commandes
                    </router-link>
                </nav>
            </aside>

            <!-- Contenu principal -->
            <main class="flex-1 p-4">
                <router-view />
            </main>
        </div>
    </div>
</template>

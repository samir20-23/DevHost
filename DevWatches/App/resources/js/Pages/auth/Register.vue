<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore/auth";

import NavBar from "@/components/ui/NavBar/NavBar.vue";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
    try {
        // Call the register action in the store
        await authStore.register({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        });

        // Redirect to dashboard after successful registration
        router.push("/dashboard");
    } catch (error) {
        console.error("Registration failed:", error);

        // Add meaningful error handling
        if (error.response && error.response.status === 422) {
            alert("Validation failed. Please check your inputs.");
        } else {
            alert("Something went wrong. Please try again later.");
        }
    }
};
</script>

<template>
    <div class="h-full bg-slate-100">
        <NavBar />
        <Card class="mx-auto max-w-md shadow-md  mt-10">
            <CardHeader>
                <CardTitle class="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="register" class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            v-model="name"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            v-model="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            v-model="password"
                            type="password"
                            placeholder="********"
                            required
                        />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password_confirmation">
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            v-model="passwordConfirmation"
                            type="password"
                            placeholder="********"
                            required
                        />
                    </div>
                    <Button type="submit" class="w-full"> Register </Button>
                </form>
                <div class="mt-4 text-center text-sm">
                    Already have an account?
                    <a href="#" class="underline">Sign in</a>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

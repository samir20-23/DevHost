<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Import the components we need
import NavBar from "@/components/ui/NavBar/NavBar.vue";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
    try {
        // Make login request to Laravel Breeze
        await axios.post("/login", {
            email: email.value,
            password: password.value,
        });

        // Redirect to dashboard after successful login
        router.push("/dashboard");
    } catch (error) {
        console.error("Login failed:", error);

        if (error.response && error.response.status === 422) {
            alert("Invalid credentials. Please check your email and password.");
        } else {
            alert("Something went wrong. Please try again later.");
        }
    }
};
</script>

<template>
    <div class="h-full bg-slate-100">
    <NavBar />
        <Card class="mx-auto max-w-sm shadow-md mt-24">
            <CardHeader>
                <CardTitle class="text-2xl"> Login </CardTitle>
                <CardDescription
                    >Enter your email below to login to your
                    account</CardDescription
                >
            </CardHeader>
            <CardContent>
                <Form @submit="login()" class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            v-model="email"
                            required
                        />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            v-model="password"
                            required
                        />
                    </div>
                    <Button type="submit" class="w-full">Login</Button>
                </Form>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <router-link to="/register" class="underline"
                        >Sign up</router-link
                    >
                </div>
            </CardContent>
        </Card>
    </div>
</template>

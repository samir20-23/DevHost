import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null, // Holds the authenticated user data
    }),
    actions: {
        // Fetch the authenticated user
        async fetchUser() {
            try {
                const response = await axios.get("/user");
                this.user = response.data;
            } catch {
                this.user = null;
            }
        },

        // Login action
        async login(credentials) {
            try {
                await axios.post("/login", credentials);
                await this.fetchUser(); // Fetch the user after login
            } catch (error) {
                throw error; // Let the caller handle the error
            }
        },

        // Logout action
        async logout() {
            try {
                await axios.post("/logout");
                this.user = null; // Clear user state after logout
                window.location.href = "/";
            } catch (error) {
                console.error("Logout failed:", error);
                throw error;
            }
        },

        // Register action
        async register(credentials) {
            try {
                await axios.post("/register", credentials); // Register the user
                await this.fetchUser(); // Automatically log them in after registration
            } catch (error) {
                throw error; // Let the caller handle the error
            }
        },
    },
});

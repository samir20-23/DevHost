import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUsersStore = defineStore("users", () => {
    const data = ref([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/users");
            data.value = response.data.users;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const addUser = async (user) => {
        try {
            const response = await axios.post("/users", user);
            data.value.push(response.data);
            await fetchUsers(); 
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`);
            data.value = data.value.filter((user) => user.id !== userId); 
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const updateUser = async (userId, updatedData) => {
        try {
            const response = await axios.put(`/users/${userId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };

    return { data, fetchUsers, addUser, deleteUser, updateUser };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useOrdersStore = defineStore("orders", () => {
    const data = ref([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("/orders");
            data.value = response.data.orders;
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const addOrder = async (order) => {
        try {
            const response = await axios.post("/orders", order);
            return response.data;
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const updateOrder = async (orderId, updatedData) => {
        try {
            const response = await axios.put(`/orders/${orderId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error("Error updating order:", error);
            throw error;
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return { data, fetchOrders, addOrder, deleteOrder, updateOrder };
});

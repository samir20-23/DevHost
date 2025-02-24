import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCategoriesStore = defineStore("categories", () => {
    const data = ref([]);

    // Récupérer toutes les catégories
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            data.value = response.data.categories;
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    };

    // Récupérer une seule catégorie
    const fetchCategory = async (id) => {
        try {
            const response = await axios.get(`/api/categories/${id}`);
            return  response.data.category;
        } catch (error) {
            console.error("Erreur lors de la récupération de la catégorie :", error);
        }
    };

    return { data, fetchCategories, fetchCategory };
});

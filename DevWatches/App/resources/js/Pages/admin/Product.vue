<script setup>
import { ref, onMounted } from "vue";
import { useProductsStore } from "@/stores/ProductsStore";
import { useCategoriesStore } from "@/stores/CategoriesStore";
import { useForm, Field, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, File } from "lucide-vue-next";

const products = useProductsStore();
const categories = useCategoriesStore();


const formSchema = toTypedSchema(
    z.object({
        name: z
            .string()
            .min(2)
            .max(50, "Le nom doit contenir entre 2 et 50 caractères"),
        description: z
            .string()
            .min(2)
            .max(100, "La description doit contenir entre 2 et 100 caractères"),
        price: z
            .number()
            .min(1)
            .max(10000, "Le prix doit être entre 1 et 10 000"),
    }),
);

const { handleSubmit } = useForm({ validationSchema: formSchema });
const isDialogOpen = ref(false);

const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const productToEdit = ref(null);
const productToDelete = ref(null);

onMounted(async () => {
    await products.fetchProducts();
    await categories.fetchCategories();

});

const getCategoryName = (categoryId) => {
    const category = categories.data.find((cat) => cat.id === categoryId);
    return category ? category.name : "Non défini";
};


const onSubmit = async (values) => {
    try {
        await products.addProduct(values);
        isDialogOpen.value = false;
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error);
    }
};

// Fonction d'ouverture du dialogue de modification et préparation du formulaire
const editProduct = (product) => {
    productToEdit.value = { ...product }; // création d'une copie
    isEditDialogOpen.value = true;
};

// Soumission du formulaire de modification
const onUpdateSubmit = async (values) => {
    try {
        // Assurez-vous d'avoir implémenté la méthode updateProduct dans votre store
        await products.updateProduct(productToEdit.value.id, values);
        isEditDialogOpen.value = false;
        await products.fetchProducts();
    } catch (error) {
        console.error("Erreur lors de la modification du produit:", error);
    }
};

// Ouverture du dialogue de suppression
const confirmDelete = (product) => {
    productToDelete.value = product;
    isDeleteDialogOpen.value = true;
};

const deleteProduct = async (productId) => {
    try {
        await products.deleteProduct(productId);
        await products.fetchProducts();
    } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
    }
};

// Confirmer la suppression depuis le dialogue
const deleteConfirmed = async () => {
    await deleteProduct(productToDelete.value.id);
    isDeleteDialogOpen.value = false;
};
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main
                class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Produits</CardTitle>
                        <div class="flex items-center">
                            <div class="ml-auto flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    class="h-7 gap-1"
                                >
                                    <File class="h-3.5 w-3.5" />
                                    <span class="sr-only sm:not-sr-only"
                                        >Exporter</span
                                    >
                                </Button>
                                <Dialog v-model:open="isDialogOpen">
                                    <DialogTrigger as-child>
                                        <Button size="sm" class="h-7 gap-1">
                                            <PlusCircle class="h-3.5 w-3.5" />
                                            <span class="sr-only sm:not-sr-only"
                                                >Ajouter un produit</span
                                            >
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle
                                                >Ajouter un produit</DialogTitle
                                            >
                                            <DialogDescription
                                                >Remplissez les détails du
                                                produit.</DialogDescription
                                            >
                                        </DialogHeader>
                                        <Form
                                            @submit="onSubmit"
                                            class="space-y-2"
                                        >
                                            <Field
                                                name="name"
                                                v-slot="{ field, meta }"
                                            >
                                                <FormLabel for="name"
                                                    >Nom du produit</FormLabel
                                                >
                                                <Input
                                                    v-bind="field"
                                                    type="text"
                                                    placeholder="Nom du produit"
                                                    id="name"
                                                />
                                                <span
                                                    v-if="
                                                        meta.touched &&
                                                        meta.error
                                                    "
                                                    class="text-red-500"
                                                    >{{ meta.error }}</span
                                                >
                                            </Field>
                                            <Field
                                                name="description"
                                                v-slot="{ field, meta }"
                                            >
                                                <FormLabel
                                                    >Description</FormLabel
                                                >
                                                <Textarea
                                                    v-bind="field"
                                                    placeholder="Description du produit"
                                                />
                                                <span
                                                    v-if="
                                                        meta.touched &&
                                                        meta.error
                                                    "
                                                    class="text-red-500"
                                                    >{{ meta.error }}</span
                                                >
                                            </Field>
                                            <Field
                                                name="price"
                                                v-slot="{ field, meta }"
                                            >
                                                <FormLabel>Prix</FormLabel>
                                                <Input
                                                    v-bind="field"
                                                    type="number"
                                                    placeholder="Prix du produit"
                                                />
                                                <span
                                                    v-if="
                                                        meta.touched &&
                                                        meta.error
                                                    "
                                                    class="text-red-500"
                                                    >{{ meta.error }}</span
                                                >
                                            </Field>
                                            <Field
                                                name="quantity"
                                                v-slot="{ field, meta }"
                                            >
                                                <FormLabel for="quantity"
                                                    >Quantité :</FormLabel
                                                >
                                                <Input
                                                    v-bind="field"
                                                    type="number"
                                                    placeholder="Quantité du produit"
                                                    id="quantity"
                                                />
                                                <span
                                                    v-if="
                                                        meta.touched &&
                                                        meta.error
                                                    "
                                                    class="text-red-500"
                                                    >{{ meta.error }}</span
                                                >
                                            </Field>

                                            <Field
                                                name="category_id"
                                                v-slot="{ field, meta }"
                                            >
                                                <FormLabel for="category_id"
                                                    >Catégorie :</FormLabel
                                                >
                                                <select
                                                    v-bind="field"
                                                    id="category_id"
                                                    class="border p-2 rounded"
                                                >
                                                    <option value="">
                                                        Sélectionnez une
                                                        catégorie
                                                    </option>
                                                    <option value="homme">
                                                        Homme
                                                    </option>
                                                    <option value="femme">
                                                        Femme
                                                    </option>
                                                </select>
                                                <span
                                                    v-if="
                                                        meta.touched &&
                                                        meta.error
                                                    "
                                                    class="text-red-500"
                                                    >{{ meta.error }}</span
                                                >
                                            </Field>
                                            <br />
                                            <Button type="submit" class="mt-4"
                                                >Ajouter</Button
                                            >
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Categorie</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Quantite</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="product in products.data"
                                :key="product.id"
                            >
                                <TableCell>{{ product.name }}</TableCell>
                                <TableCell>{{ product.description }}</TableCell>
                                <TableCell>{{ getCategoryName(product.category_id) }}</TableCell>
                                <TableCell>{{ product.price }} MAD</TableCell>
                                <TableCell>{{ product.quantity }}</TableCell>
                                <TableCell class="flex gap-2">
                                    <Button
                                        variant="outline"
                                        @click="editProduct(product)"
                                        class="bg-gray-500 hover:bg-gray-600 text-white border border-gray-600 rounded px-4 py-2 transition duration-200"
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="outline"
                                        @click="confirmDelete(product)"
                                        class="bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </main>
        </div>

        <!-- Dialogue de modification -->
        <Dialog v-model:open="isEditDialogOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier le produit</DialogTitle>
                    <DialogDescription
                        >Modifiez les informations du
                        produit.</DialogDescription
                    >
                </DialogHeader>
                <!-- Utilisation d'un formulaire pour la modification -->
                <Form
                    @submit="onUpdateSubmit"
                    :initial-values="productToEdit"
                    class="space-y-2"
                >
                    <Field name="name" v-slot="{ field, meta }">
                        <FormLabel for="edit-name">Nom du produit</FormLabel>
                        <Input
                            v-bind="field"
                            type="text"
                            v-model="productToEdit.name"
                            id="edit-name"
                        />
                        <span
                            v-if="meta.touched && meta.error"
                            class="text-red-500"
                            >{{ meta.error }}</span
                        >
                    </Field>
                    <Field name="description" v-slot="{ field, meta }">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            v-bind="field"
                            placeholder="Description du produit"
                            v-model="productToEdit.description"
                        />
                        <span
                            v-if="meta.touched && meta.error"
                            class="text-red-500"
                            >{{ meta.error }}</span
                        >
                    </Field>
                    <Field name="price" v-slot="{ field, meta }">
                        <FormLabel>Prix</FormLabel>
                        <Input
                            v-bind="field"
                            type="number"
                            placeholder="Prix du produit"
                            v-model="productToEdit.price"
                        />
                        <span
                            v-if="meta.touched && meta.error"
                            class="text-red-500"
                            >{{ meta.error }}</span
                        >
                    </Field>
                    <Field name="quantity" v-slot="{ field, meta }">
                        <FormLabel for="quantity">Quantité :</FormLabel>
                        <Input
                            v-bind="field"
                            type="number"
                            placeholder="Quantité du produit"
                            id="quantity"
                        />
                        <span
                            v-if="meta.touched && meta.error"
                            class="text-red-500"
                            >{{ meta.error }}</span
                        >
                    </Field>

                    <Field name="category_id" v-slot="{ field, meta }">
                        <FormLabel for="category_id">Catégorie :</FormLabel>
                        <select
                            v-bind="field"
                            id="category_id"
                            class="border p-2 rounded"
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            <option v-for="cat in categories.data" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                        </select>
                        <span
                            v-if="meta.touched && meta.error"
                            class="text-red-500"
                            >{{ meta.error }}</span
                        >
                    </Field>

                    <div class="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            @click="isEditDialogOpen = false"
                            >Annuler</Button
                        >
                        <Button type="submit">Modifier</Button>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>

        <!-- Dialogue de confirmation pour suppression -->
        <Dialog v-model:open="isDeleteDialogOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer ce produit ?
                    </DialogDescription>
                </DialogHeader>
                <div class="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        @click="isDeleteDialogOpen = false"
                        >Annuler</Button
                    >
                    <Button variant="destructive" @click="deleteConfirmed"
                        >Supprimer</Button
                    >
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

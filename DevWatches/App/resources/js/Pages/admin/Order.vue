<script setup>
import { ref, onMounted } from "vue";
import { useOrdersStore } from "@/stores/OrderStore";
import { useProductsStore } from "@/stores/ProductsStore";
import { useUsersStore } from "@/stores/UserStore";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

// Import shadcn‑vue form components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import {
    FormLabel,
    FormControl,
    FormItem,
    FormMessage,
    FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircle, File, Pencil, Trash2 } from "lucide-vue-next";

const orders = useOrdersStore();
const products = useProductsStore();
const users = useUsersStore();

onMounted(async () => {
    await orders.fetchOrders();
    await products.fetchProducts();
    await users.fetchUsers();
});

const isAddDialogOpen = ref(false);
const isEditDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);

const formSchema = toTypedSchema(
    z.object({
        user_id: z.string({
            required_error: "Please select a user.",
        }),
        product_id: z.string({
            required_error: "Please select a product.",
        }),
        phone_number: z
            .string({
                required_error: "Please enter a phone number.",
            })
            .min(10, "Phone number must be 10 digits.")
            .max(10, "Phone number must be 10 digits."),
        quantity: z
            .number({
                required_error: "Please enter a quantity.",
            })
            .min(1, "Quantity must be greater than 0."),
    }),
);

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
});

const onCreateSubmit = handleSubmit(async (values) => {
    values.user_id = +values.user_id;
    values.product_id = +values.product_id;
    try {
        await orders.addOrder(values);
        isAddDialogOpen.value = false;
        await orders.fetchOrders();
    } catch (error) {
        console.error("Erreur lors de la création de la commande:", error);
    }
});

const formData = ref({
    id: 0,
    user_id: "",
    user_name: "",
    product_id: "",
    product_name: "",
    phone_number: "",
    quantity: "",
});

const openEditDialog = (order) => {
    formData.value.id = order.id;
    formData.value.user_id = order.user_id.toString();
    formData.value.user_name = users.data.find(
        (u) => u.id.toString() === formData.value.user_id,
    ).name;

    formData.value.product_id = order.product_id.toString();
    formData.value.product_name = products.data.find(
        (p) => p.id.toString() === formData.value.product_id,
    ).name;

    formData.value.phone_number = order.phone_number;
    formData.value.quantity = order.quantity;
    isEditDialogOpen.value = true;
};

const onUpdateSubmit = async () => {
    const values = {
        ...formData.value,
        user_id: Number(formData.value.user_id),
        product_id: Number(formData.value.product_id),
        quantity: Number(formData.value.quantity),
    };

    try {
        await orders.updateOrder(values.id, values);
        isEditDialogOpen.value = false;
        await orders.fetchOrders();
    } catch (error) {
        console.error("Erreur lors de la modification de la commande:", error);
    }
};

function openDeleteDialog(orderId) {
    formData.value.id = orderId;
    isDeleteDialogOpen.value = true;
}

const deleteOrder = async () => {
    try {
        await orders.deleteOrder(formData.value.id);
        isDeleteDialogOpen.value = false;
        await orders.fetchOrders();
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande:", error);
    }
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
                        <CardTitle>Commandes</CardTitle>
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
                                <!-- Add Order Dialog -->
                                <Dialog v-model:open="isAddDialogOpen">
                                    <DialogTrigger as-child>
                                        <Button size="sm" class="h-7 gap-1">
                                            <PlusCircle class="h-3.5 w-3.5" />
                                            <span
                                                class="sr-only sm:not-sr-only"
                                            >
                                                Ajouter une commande
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle
                                                >Ajouter une
                                                commande</DialogTitle
                                            >
                                            <DialogDescription>
                                                Remplissez les détails de la
                                                commande.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <form
                                            class="space-y-6"
                                            @submit="onCreateSubmit"
                                        >
                                            <!-- user Field -->
                                            <FormField
                                                v-slot="{ componentField }"
                                                name="user_id"
                                            >
                                                <FormItem>
                                                    <FormLabel
                                                        >Utilisateur</FormLabel
                                                    >

                                                    <Select
                                                        v-bind="componentField"
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    placeholder="sélectionner un utilisateur"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem
                                                                    v-for="user in users.data"
                                                                    :key="
                                                                        user.id
                                                                    "
                                                                    :value="
                                                                        user.id.toString()
                                                                    "
                                                                >
                                                                    {{
                                                                        user.name
                                                                    }}
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            </FormField>

                                            <!-- product Field -->
                                            <FormField
                                                v-slot="{ componentField }"
                                                name="product_id"
                                            >
                                                <FormItem>
                                                    <FormLabel
                                                        >Produit</FormLabel
                                                    >

                                                    <Select
                                                        v-bind="componentField"
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    placeholder="sélectionner un produit"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem
                                                                    v-for="product in products.data"
                                                                    :key="
                                                                        product.id
                                                                    "
                                                                    :value="
                                                                        product.id.toString()
                                                                    "
                                                                >
                                                                    {{
                                                                        product.name
                                                                    }}
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            </FormField>

                                            <!-- phone_number Field -->
                                            <FormField
                                                v-slot="{ componentField }"
                                                name="phone_number"
                                                :validate-on-blur="
                                                    !isFieldDirty
                                                "
                                            >
                                                <FormItem>
                                                    <FormLabel
                                                        >Numero de
                                                        téléphone</FormLabel
                                                    >
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="0612345678"
                                                            v-bind="
                                                                componentField
                                                            "
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </FormField>

                                            <!-- quantity Field -->
                                            <FormField
                                                v-slot="{ componentField }"
                                                name="quantity"
                                                :validate-on-blur="
                                                    !isFieldDirty
                                                "
                                            >
                                                <FormItem>
                                                    <FormLabel
                                                        >Quantité</FormLabel
                                                    >
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            v-bind="
                                                                componentField
                                                            "
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </FormField>
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Utilisateur</TableHead>
                                <TableHead>Produit</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Quantité</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="order in orders.data"
                                :key="order.id"
                            >
                                <TableCell>{{ order.user.name }}</TableCell>
                                <TableCell>{{ order.product.name }}</TableCell>
                                <TableCell>{{ order.phone_number }}</TableCell>
                                <TableCell>{{ order.quantity }}</TableCell>
                                <TableCell class="flex gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger as-child>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    class="py-5 bg-green-500 hover:bg-green-400"
                                                    @click="
                                                        openEditDialog(order)
                                                    "
                                                >
                                                    <Pencil class="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Modifier la commande</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger as-child>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    class="py-5 bg-red-500 hover:bg-red-400"
                                                    @click="
                                                        openDeleteDialog(
                                                            order.id,
                                                        )
                                                    "
                                                >
                                                    <Trash2 class="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Supprimer la commande</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </main>
        </div>
    </div>

    <!-- Edit Order Dialog -->
    <Dialog v-model:open="isEditDialogOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Modifier la commande</DialogTitle>
                <DialogDescription>
                    Remplissez les détails de la commande.
                </DialogDescription>
            </DialogHeader>

            <form class="space-y-6" @submit.prevent="onUpdateSubmit">
                <!-- user Field -->
                <FormField name="user_id">
                    <FormItem>
                        <FormLabel>Utilisateur</FormLabel>

                        <Select v-model="formData.user_id">
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        :placeholder="formData.user_name"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        :defaultValue="user.id"
                                        v-for="user in users.data"
                                        :key="user.id"
                                        :value="user.id.toString()"
                                    >
                                        {{ user.name }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- product Field -->
                <FormField name="product_id">
                    <FormItem>
                        <FormLabel>Produit</FormLabel>

                        <Select v-model="formData.product_id">
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        :placeholder="formData.product_name"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        v-for="product in products.data"
                                        :key="product.id"
                                        :value="product.id.toString()"
                                    >
                                        {{ product.name }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- phone_number Field -->
                <FormField name="phone_number">
                    <FormItem>
                        <FormLabel>Numero de téléphone</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                :placeholder="formData.phone_number"
                                v-model="formData.phone_number"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- quantity Field -->
                <FormField name="quantity">
                    <FormItem>
                        <FormLabel>Quantité</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                :placeholder="formData.quantity"
                                v-model="formData.quantity"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit"> Submit </Button>
            </form>
        </DialogContent>
    </Dialog>

    <!-- Delete Order Dialog -->
    <Dialog v-model:open="isDeleteDialogOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Supprimer </DialogTitle>
                <DialogDescription>
                    Etes-vous sûr de vouloir supprimer la commande ?
                </DialogDescription>
            </DialogHeader>
            <div class="flex justify-end gap-2 mt-4">
                <Button variant="outline" @click="isDeleteDialogOpen = false">
                    Annuler
                </Button>
                <Button
                    class="bg-red-500 hover:bg-red-400"
                    @click="deleteOrder"
                >
                    Supprimer
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

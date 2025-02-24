<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    /**
     * Afficher la liste des produits.
     */
    public function index()
    {
        $products = $this->productRepo->all();
        return response()->json([
            'success' => true,
            'products' => $products
        ]);
    }

    /**
     * Stocker un nouveau produit.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:100',
            'price' => 'required|numeric|min:1|max:10000',
            'quantity' => 'required|integer|min:1|max:1000',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = $this->productRepo->create($request);

        return response()->json([
            'success' => true,
            'message' => 'Produit créé avec succès.',
            'product' => $product
        ]);
    }

    /**
     * Mettre à jour un produit existant.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "name"        => 'required|string|max:255',
            "description" => 'required|string',
            "price"       => 'required|numeric', // Pour un float, utilisez numeric
            "category_id" => 'required|exists:categories,id', // Vérifie que la catégorie existe
            "quantity"    => 'sometimes|integer|min:1'
        ]);

        $product = $this->productRepo->find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé.'
            ], 404);
        }

        $updatedProduct = $this->productRepo->update($id, $request);

        return response()->json([
            'success' => true,
            'message' => 'Produit mis à jour avec succès.',
            'product' => $updatedProduct
        ]);
    }

    /**
     * Supprimer un produit.
     */
    public function destroy($id)
    {
        $product = $this->productRepo->find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé.'
            ], 404);
        }

        $this->productRepo->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé avec succès.'
        ]);
    }
}

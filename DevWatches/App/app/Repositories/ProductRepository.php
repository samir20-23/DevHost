<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    /**
     * Récupérer tous les produits.
     */
    public function all()
    {
        return  Product::all();
    }

    /**
     * Supprimer un produit par ID.
     */
    public function delete($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return true;
        }
        return false;
    }

    /**
     * Récupérer les produits avec pagination.
     */
    public function paginate($perPage = 10)
    {
        return Product::paginate($perPage);
    }

    /**
     * Trouver un produit par ID.
     */
    public function find($id)
    {
        return Product::find($id);
    }

    /**
     * Créer un nouveau produit.
     */
    public function create($request)
    {
        return Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'quantity' => $request->input('quantity'),
            'category_id' => $request->input('category_id')
        ]);
    }

    /**
     * Mettre à jour un produit existant.
     */
    public function update($id, $request)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'quantity' => $request->input('quantity'),
                'category_id' => $request->input('category_id')
            ]);
            return $product;
        }
        return null;
    }
}

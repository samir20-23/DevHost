<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    /**
     * Récupérer tous les commandes.
     */
    public function all()
    {
        return Order::with(['user:id,name', 'product:id,name'])->get();
    }

    /**
     * Récupérer les commandes avec pagination.
     */
    public function paginate($perPage = 10)
    {
        return Order::paginate($perPage);
    }

    /**
     * Trouver une commande par ID.
     */
    public function find($id)
    {
        return Order::find($id);
    }

    /**
     * Créer une nouvelle commande.
     */
    public function create($request)
    {
        return Order::create([
            'user_id' => $request->input('user_id'),
            'product_id' => $request->input('product_id'),
            'phone_number' => $request->input('phone_number'),
            'quantity' => $request->input('quantity'),
        ]);
    }

    /**
     * Mettre à jour une commande existante.
     */
    public function edit($order, $request)
    {
        $order->update([
            'user_id' => $request->has('user_id') && $request->input('user_id') != 0
                ? $request->input('user_id')
                : $order->user_id,

            'product_id' => $request->has('product_id') && $request->input('product_id') != 0
                ? $request->input('product_id')
                : $order->product_id,

            'phone_number' => $request->filled('phone_number')
                ? $request->input('phone_number')
                : $order->phone_number,

            'quantity' => $request->filled('quantity') && $request->input('quantity') != 0
                ? $request->input('quantity')
                : $order->quantity,
        ]);

        return $order;
    }

    /**
     * Supprimer une commande par ID.
     */
    public function delete($order)
    {
        $order->delete();
        return true;
    }
}

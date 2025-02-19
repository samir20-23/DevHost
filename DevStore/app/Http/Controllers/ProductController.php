<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return view('admin.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return view('admin.products.create');

    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
     {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        

         if ($validator->fails()) {
             return response()->json([
                 'status' => 400,
                 'errors' => $validator->messages(),
             ]);
         }

         $product = Product::create([
             'name' => $request->name,
             'description' => $request->description,
         ]);

         return response()->json([
             'status' => 200,
             'success' => true,
             'product' => $product,
         ]);
     }




    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
{
    try {
        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully!',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'Failed to delete product. Please try again.',
        ]);
    }
}

}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\OrderRepository;

class OrderController extends Controller
{
    protected $orderRepo;

    public function __construct(OrderRepository $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }

    public function index()
    {
        $orders = $this->orderRepo->all();
        return response()->json(['success' => true, 'orders' => $orders]);
    }

    public function store(Request $request)
    {
        $order = $this->orderRepo->create($request);
        return response()->json(['success' => true, 'order' => $order]);
    }

    public function update(Request $request, $id)
    {
        $order = $this->orderRepo->find($id);
        $this->orderRepo->edit($order, $request);
        return response()->json(['success' => true, 'request' => $order]);
    }

    public function destroy($id)
    {
        $order = $this->orderRepo->find($id);
        $this->orderRepo->delete($order);
        return response()->json(['success' => true, 'order' => $order]);
    }
}

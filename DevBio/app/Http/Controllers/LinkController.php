<?php

namespace App\Http\Controllers; // ✅ Add this namespace

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller; // ✅ Import Laravel's base Controller

class LinkController extends Controller
{
    public function index()
    {
        $links = Link::all();
        return view('home', compact('links'));
    }
    
    public function store(Request $request)
    {
        Link::create($request->only(['title', 'url']));
        return redirect()->back();
    }
}

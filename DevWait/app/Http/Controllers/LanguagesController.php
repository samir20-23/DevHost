<?php

namespace App\Http\Controllers;

use App\Models\Languages;
use Illuminate\Http\Request;

class LanguagesController extends Controller
{
    // Display a listing of the languages
    public function index()
    {
        // Fetch all languages from the database
        $languages = Languages::all();
        return view('languages.index', compact('languages'));
    }

    // Show the create form for a new language
    public function create()
    {
        return view('languages.create');
    }

    // Store a new language
    public function store(Request $request)
    {
        // Validate the incoming request
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'understand' => 'nullable|string',
            'example' => 'nullable|string',
            'learning' => 'nullable|string',
        ]);

        // Create a new language record
        Languages::create($data);

        // Redirect to the languages index with a success message
        return redirect()->route('languages.index')->with('success', 'Language created successfully!');
    }

    // Show the description of a language
    public function description($id)
    {
        // Find the language by ID
        $language = Languages::find($id);

        // If the language doesn't exist, show a 404 page
        if (!$language) {
            return abort(404, 'Language not found');
        }

        // Pass the language to a new view
        return view('languages.description', compact('language'));
    }

    // Update the status of the language
    public function updateStatus(Request $request, $id)
    {
        // Validate incoming data (ensure it's a string)
        $data = $request->validate([
            'understand' => 'nullable|string',
            'example' => 'nullable|string',
            'learning' => 'nullable|string',
        ]);

        $language = Languages::find($id);

        if (!$language) {
            return response()->json(['message' => 'Language not found!'], 404);
        }

        // Update the language status
        $language->update($data);

        return response()->json(['message' => 'Status updated successfully']);
    }

    // Show the edit form for a language
    public function edit($id)
    {
        $language = Languages::findOrFail($id);
        return view('languages.edit', compact('language'));
    }

    // Update the language details
    public function update(Request $request, $id)
    {
        $language = Languages::findOrFail($id);
        $language->update($request->all());
        return redirect()->route('languages.index')->with('success', 'Language updated successfully!');
    }
}

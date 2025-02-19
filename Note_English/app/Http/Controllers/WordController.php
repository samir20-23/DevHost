<?php

namespace App\Http\Controllers;

use App\Models\Words;
use Illuminate\Http\Request;

class WordController extends Controller
{
    public function index()
    {
        // Get the total number of words
        $wordsCount = Words::count();
        $data = Words::orderBy('word')->get();
        $total = Words::count();
    
        // Get the daily streak (for simplicity, assuming you have a 'streak' column or something similar)
        $dailyStreak = 7;  // Example, replace with actual logic if needed
    
        // Calculate accuracy (example: assuming there's a column for correct answers or similar)
        $accuracy = 92;  // Example, replace with actual logic if needed
    
        return view('words.index', compact('data','total','wordsCount', 'dailyStreak', 'accuracy'));
    }
    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'word' => 'required|max:255',
            'translation' => 'required|max:255',
            'language' => 'required'
        ]);

        Words::create($validated);

        return redirect()->route('word.index')
            ->with('success', 'Word added successfully!');
    }

    public function edit(string $id)
    {
        $word = Words::findOrFail($id);
        return response()->json($word);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'word' => 'required|max:255',
            'translation' => 'required|max:255',
            'language' => 'required'
        ]);

        $word = Words::findOrFail($id);
        $word->update($validated);

        return redirect()->route('word.index')
            ->with('success', 'Word updated successfully!');
    }

    public function destroy(string $id)
    {
        $word = Words::findOrFail($id);
        $word->delete();

        return redirect()->route('word.index')
            ->with('success', 'Word deleted successfully!');
    }
}
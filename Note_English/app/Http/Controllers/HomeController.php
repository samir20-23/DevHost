<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\Words;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        // Get the total number of words
        $wordsCount = Words::count();
        $data = Words::orderBy('word')->get();
        $total = Words::count();
        $dailyStreak = 7;
        $accuracy = 92;
        $userBookmarks = [];
        if (Auth::check()) {
            $userId = Auth::id();  // Get the logged-in user's ID

            // Get the user's bookmarks, ordered by 'word_id'
            $userBookmarks = Bookmark::where('user_id', $userId)
                ->pluck('word_id') // Get an array of bookmarked word IDs
                ->toArray(); // Convert the collection to an array for easier comparison
        }

        return view('home', compact('data', 'wordsCount', 'total', 'userBookmarks', 'dailyStreak', 'accuracy'));
    }


    public function saveBookmarks($wordId)
    {
        $userId = Auth::id();  // Get the logged-in user's ID

        // Create the bookmark
        Bookmark::create([
            'user_id' => $userId,
            'word_id' => $wordId,  // Use the wordId from the route parameter
        ]);

        return redirect()->route('home.index');  // Redirect back to the home page
    }
    public function destroy($wordId)
    {
        if (Auth::check()) {
            $userId = Auth::id();

            // Find the bookmark for this user and word
            $bookmark = Bookmark::where('user_id', $userId)
                ->where('word_id', $wordId)
                ->first();

            if ($bookmark) {
                $bookmark->delete();
            }
        }

        return redirect()->route('home.index')->with('success', 'Bookmark removed successfully!');
    }
}

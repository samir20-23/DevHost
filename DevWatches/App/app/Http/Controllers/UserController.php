<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Afficher la liste des utilisateurs.
     */
    public function index()
    {
        $users = $this->userRepo->all();
        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }

    /**
     * Stocker un nouvel utilisateur.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "name"  => 'required|string|max:255',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|string|min:6',
            "role" => 'required|string|max:255'
        ]);

        $user = $this->userRepo->create($validatedData);

        return response()->json([
            'success' => true,
            'user' => $user
        ],);
    }

    /**
     * Mettre à jour un utilisateur existant.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            "name"  => 'required|string|max:255',
            "email" => 'required|email|unique:users,email,' . $id,
            "password" => 'sometimes|string|min:6'
        ]);

        $user = $this->userRepo->update($id, $validatedData);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé.'
            ], 201);
        }

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur mis à jour avec succès.',
            'user' => $user
        ]);
    }

    /**
     * Supprimer un utilisateur.
     */
    public function destroy($id)
    {
        $deleted = $this->userRepo->delete($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé.'
            ], 201);
        }

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur supprimé avec succès.'
        ]);
    }
}

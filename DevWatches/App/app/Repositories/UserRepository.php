<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    protected $userModel;

    public function __construct(User $user)
    {
        $this->userModel = $user;
    }

    /**
     * Récupérer tous les utilisateurs.
     */
    public function all()
    {
        return $this->userModel::all();
    }

    /**
     * Supprimer un utilisateur par ID.
     */
    public function delete($id)
    {
        $user = $this->userModel::find($id);
        if (!$user) {
            return false;
        }
        $user->delete();
        return true;
    }

    /**
     * Récupérer les utilisateurs avec pagination.
     */
    public function paginate($perPage = 10)
    {
        return $this->userModel::paginate($perPage);
    }

    /**
     * Trouver un utilisateur par ID.
     */
    public function find($id)
    {
        return $this->userModel::findOrFail($id);
    }

    /**
     * Créer un nouvel utilisateur.
     */
    public function create($validatedData)
    {
        return $this->userModel::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'role' => $validatedData['role']
        ]);
    }

    /**
     * Mettre à jour un utilisateur existant.
     */
    public function update($id, $validatedData)
    {
        $user = $this->userModel::find($id);
        if (!$user) {
            return null;
        }

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => isset($validatedData['password']) ? bcrypt($validatedData['password']) : $user->password,
            'role' => $validatedData['role'] ?? $user->role,
        ]);
        return $user;
    }
}

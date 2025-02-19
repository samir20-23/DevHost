@extends('layouts.app')

@section('content_body')
<div class="card card-primary">
    <div class="container-fluid">
        <div class="row mb-2 pt-4 justify-content-end">
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="">Accueil</a></li>
                    <li class="breadcrumb-item active"><a href="">Categories</a></li>
                    <li class="breadcrumb-item active">Ajouter</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="card-header">
        <h3 class="card-title">Ajouter un catégorie</h3>
    </div>

    <!-- /.card-header -->
    <!-- form start -->
    <form action="{{route('categories.store')}}" method="POST">
        @csrf <!-- Pour la sécurité CSRF -->
        <div class="card-body">
            <!-- Champ Nom -->
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Entrez le Nom">
            </div>
            <!-- Champ description -->
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" name="description" class="form-control" id="description" placeholder="Entrez le description">
            </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
    </form>
</div>
@endsection

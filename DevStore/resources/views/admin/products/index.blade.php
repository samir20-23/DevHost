@extends('layouts.app')

@section('subtitle', 'Dashboard')
@section('content_header_title', 'Dashboard')
@section('content_header_subtitle', 'Products')

@section('content_body')

<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Liste des Produits</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{Route('dashboard')}}">Accueil</a></li>
                    <li class="breadcrumb-item active">Products</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row mb-2 justify-content-end">
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <button><a id="show" href="{{route('products.create')}}">create product</a></button>
                    {{-- <a href="" class="btn btn-primary btn-sm p-2 text-white"><i class="fas fa-plus"></i> Ajouter produit</a> --}}
                </ol>
            </div>
        </div>
    </div>
</section>

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Table des produits</h3>
            </div>
            <!-- /.card-header -->
            @if($products->isEmpty())
                <p class="p-5 text-center">aucun produit trouvé.</p>
            @else
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($products as $product)
                            <tr>
                                <td>{{ $product->id }}</td>
                                <td>{{ $product->name }}</td>
                                <td>{{ $product->description }}</td>
                                <td>{{ $product->created_at->format('Y-m-d') }}</td>
                                <td>
                                    <form action="{{ route('products.destroy', $product->id) }}" method="POST" class="d-inline deleteForm">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> </button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
            <!-- /.card-body -->
        </div>
        {{-- {{ $Products->links('pagination::bootstrap-5') }} --}}
        <!-- /.card -->
    </div>
</section>

@stop



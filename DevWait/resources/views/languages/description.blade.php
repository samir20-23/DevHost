<!-- resources/views/languages/description.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container">
        <h1 class="my-4">{{ $language->name }} - Description</h1>
        
        <p>{{ $language->description }}</p>
        
        <a href="{{ $language->github_link }}" target="_blank" class="btn btn-dark">GitHub</a>
        <a href="{{ route('languages.index') }}" class="btn btn-primary">Back to Languages</a>
    </div>
@endsection

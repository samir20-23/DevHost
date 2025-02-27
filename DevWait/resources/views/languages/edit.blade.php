<!-- resources/views/languages/edit.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h1 class="my-4">Edit Language</h1>

    <form action="{{ route('languages.update', $language->id) }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="name">Language Name</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $language->name }}" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" name="description">{{ $language->description }}</textarea>
        </div>
        <div class="form-group">
            <label for="understand">Understand</label>
            <select class="form-control" id="understand" name="understand">
                <option value="1" {{ $language->understand == '1' ? 'selected' : '' }}>Yes</option>
                <option value="0" {{ $language->understand == '0' ? 'selected' : '' }}>No</option>
            </select>
        </div>
        <div class="form-group">
            <label for="example">Example</label>
            <select class="form-control" id="example" name="example">
                <option value="1" {{ $language->example == '1' ? 'selected' : '' }}>Yes</option>
                <option value="0" {{ $language->example == '0' ? 'selected' : '' }}>No</option>
            </select>
        </div>
        <div class="form-group">
            <label for="learning">Learning</label>
            <select class="form-control" id="learning" name="learning">
                <option value="1" {{ $language->learning == '1' ? 'selected' : '' }}>Yes</option>
                <option value="0" {{ $language->learning == '0' ? 'selected' : '' }}>No</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Update</button>
    </form>
</div>
@endsection

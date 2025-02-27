@extends('layouts.app')

@section('content')
<div class="container">
    <h1 class="my-4">Add New Language</h1>
    <form action="{{ route('languages.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Language Name</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description"></textarea>
        </div>

        <div class="mb-3">
            <label for="understand" class="form-label">Understand</label>
            <input type="text" class="form-control" id="understand" name="understand">
        </div>

        <div class="mb-3">
            <label for="example" class="form-label">Example</label>
            <input type="text" class="form-control" id="example" name="example">
        </div>

        <div class="mb-3">
            <label for="learning" class="form-label">Learning</label>
            <input type="text" class="form-control" id="learning" name="learning">
        </div>

        <button type="submit" class="btn btn-primary">Save Language</button>
    </form>
</div>
@endsection

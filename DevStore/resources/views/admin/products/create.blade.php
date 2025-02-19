<form action="{{ route('products.store') }}" method="POST" id="addProduct">
  @csrf
  <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" required>
  </div>
  <div class="form-group">
      <label for="description">Description</label>
      <input type="text" class="form-control" id="description" name="description" placeholder="Enter description" required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
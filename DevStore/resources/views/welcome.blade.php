
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Website</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <!-- Authentication Links -->
        @auth
          <li class="nav-item">
            <a href="{{ url('/dashboard') }}" class="nav-link">Dashboard</a>
          </li>
        @else
          <li class="nav-item">
            <a href="{{ route('login') }}" class="nav-link">Log in</a>
          </li>
          @if (Route::has('register'))
            <li class="nav-item">
              <a href="{{ route('register') }}" class="nav-link">Register</a>
            </li>
          @endif
        @endauth
      </ul>
    </div>
  </div>
</nav>

<!-- Cards Section -->
<div class="container mt-5">
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card">
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Product 1">
        <div class="card-body">
          <h5 class="card-title">Product 1</h5>
          <p class="card-text">This is a short description of the product.</p>
          <p><strong>Price: $19.99</strong></p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Product 2">
        <div class="card-body">
          <h5 class="card-title">Product 2</h5>
          <p class="card-text">This is a short description of the product.</p>
          <p><strong>Price: $29.99</strong></p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Product 3">
        <div class="card-body">
          <h5 class="card-title">Product 3</h5>
          <p class="card-text">This is a short description of the product.</p>
          <p><strong>Price: $39.99</strong></p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap JS and dependencies -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>

</body>
</html>

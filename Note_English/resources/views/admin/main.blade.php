<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- Add Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Container for the page content -->
    <div class="container mt-5">
        <!-- Home Page Section -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-primary text-white">
                <h3 class="card-title">Home Page</h3>
            </div>
            <div class="card-body">
                <p class="card-text">Welcome to the homepage. Click below to explore more!</p>
                <a href="{{ route('home') }}" class="btn btn-primary">See More</a>
            </div>
        </div>

        <!-- Dashboard Page Section -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-success text-white">
                <h3 class="card-title">Dashboard Page</h3>
            </div>
            <div class="card-body">
                <p class="card-text">Access your dashboard here to manage settings and data.</p>
                <a href="{{ route('words.index') }}" class="btn btn-success">See More</a>
            </div>
        </div>
    </div>

    <!-- Add Bootstrap JS and Popper.js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

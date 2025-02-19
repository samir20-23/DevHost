# DevGenius - Laravel Link Hub

## 📌 About
DevGenius is a Laravel-powered application that allows users to manage and display important links categorized under different sections. The app provides an intuitive interface for organizing and accessing social media profiles, project repositories, and other resources.

## 🚀 Features
- ✅ Dynamic link categorization
- ✅ Responsive UI with Tailwind CSS
- ✅ FontAwesome icons for link representation
- ✅ GSAP animations for smooth transitions
- ✅ Dark mode toggle
- ✅ Laravel Blade templating for easy customization

## 🛠️ Installation
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/devgenius.git
cd devgenius
```

### 2. Install Dependencies
```sh
composer install
npm install
```

### 3. Configure Environment
Copy the `.env.example` file and update your database settings:
```sh
cp .env.example .env
php artisan key:generate
```

### 4. Run Migrations & Seeding
```sh
php artisan migrate --seed
```

### 5. Serve the Application
```sh
php artisan serve
```
Now, open `http://127.0.0.1:8000` in your browser. 🚀

## 📂 Project Structure
```
📁 app
📁 database
📁 resources
    ├── views
        ├── layouts
        ├── home.blade.php
📁 public
📁 routes
    ├── web.php
```

## ✨ Technologies Used
- Laravel 10
- Tailwind CSS
- FontAwesome Icons
- GSAP for animations

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).


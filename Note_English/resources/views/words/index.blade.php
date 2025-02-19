<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Translation Dictionary</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"> 

</head>

<body class="bg-gray-900 text-gray-100 font-[Inter]">
    <!-- Navigation -->
    <nav class="bg-gray-800 border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <!-- Left side nav -->
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <h1 class="text-xl font-bold text-indigo-400">WordFlow</h1>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <a href="{{ route('home') }}"
                            class="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            home
                        </a>
                        <a href="#"
                            class="border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Table words
                        </a>

                    </div>
                </div>

                <!-- Right side nav -->
                <div class="flex items-center">
                    <!-- Theme Toggle -->
                    <button class="p-2 text-gray-300 hover:text-white mr-4">
                        <i data-lucide="moon" class="h-5 w-5"></i>
                    </button>

                    <!-- Profile Dropdown -->
                    <div class="relative ml-3">
                        <div>
                            <button type="button"
                                onclick="document.getElementById('profile-menu').classList.toggle('hidden')"
                                class="bg-gray-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <img class="h-8 w-8 rounded-full"
                                    src="https://ui-avatars.com/api/?name=User&background=random" alt="Profile">
                            </button>
                        </div>

                        <!-- Profile dropdown menu -->
                        <div id="profile-menu"
                            class="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 py-1">
                            <a href="/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Your
                                Profile</a>
                            <a href="/settings"
                                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Settings</a>
                            <form method="POST" action="/logout" class="block">
                                @csrf
                                <button type="submit"
                                    class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Sign
                                    out</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="py-10">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <!-- Go Back Link (Styled as a Button) -->
                    <div>
                        <a href="{{ route('home') }}"
                            class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg shadow-sm">
                            <i class="fas fa-arrow-left mr-2"></i> Go Home
                        </a>
                    </div>

                    <!-- Add New Word Button -->
                    <div>
                        <button type="button"
                            onclick="document.getElementById('addWordModal').classList.remove('hidden')"
                            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add New Word
                        </button>
                    </div>
                </div>

                <!-- Search Bar -->
                <div class="mb-6">
                    <input type="text" id="searchInput" placeholder="Search words..."
                        class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>

                <div class="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Word</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Translation</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Language Pair</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-700">
                                    @foreach ($data as $item)
                                        <tr class="hover:bg-gray-700">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $item->word }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $item->translation }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $item->language }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                                <!-- Edit Button with Icon -->
                                                <button onclick="editWord({{ $item->id }})"
                                                    class="text-indigo-400 hover:text-indigo-300 mr-3">
                                                    <!-- Font Awesome Edit Icon -->
                                                    <i class="fas fa-edit"></i> Edit
                                                </button>

                                                <!-- Delete Button with Icon -->
                                                <form action="{{ route('word.destroy', $item->id) }}" method="POST"
                                                    class="inline">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="text-red-400 hover:text-red-300"
                                                        onclick="return confirm('Are you sure you want to delete this word?')">
                                                        <!-- Font Awesome Trash Icon -->
                                                        <i class="fas fa-trash-alt"></i> Delete
                                                    </button>
                                                </form>
                                            </td>

                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Word Modal -->
        <div id="addWordModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
                <div class="mt-3">
                    <h3 class="text-lg leading-6 font-medium text-gray-100">Add New Word</h3>
                    <form action="{{ route('word.store') }}" method="POST" class="mt-4">
                        @csrf
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300">Word</label>
                            <input type="text" name="word" id="word" 
                                class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300">Translation</label>
                            <input type="text" name="translation" id="translation" 
                                class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300">Language Pair</label>
                            <select name="language" required
                                class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="english<->arabic">English ↔ Arabic</option>
                                <option value="english<->french">English ↔ French</option>
                                <option value="english<->spanish">English ↔ Spanish</option>
                            </select>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button type="button"
                                onclick="document.getElementById('addWordModal').classList.add('hidden')"
                                class="mr-3 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Word Modal -->
        <div id="editWordModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
                <div class="mt-3">
                    <h3 class="text-lg leading-6 font-medium text-gray-100">Edit Word</h3>
                    <form id="editForm" method="POST" class="mt-4">
                        @csrf
                        @method('PUT')
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300">Word</label>
                            <input type="text" name="word" id="editWord"
                                class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300">Translation</label>
                            <input type="text" name="translation" id="editTranslation"
                                class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-300">Language Pair</label>
                            <select name="language" id="editLanguage" required
                                class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="english<->arabic">English ↔ Arabic</option>
                                <option value="english<->french">English ↔ French</option>
                                <option value="english<->spanish">English ↔ Spanish</option>
                            </select>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button type="button"
                                onclick="document.getElementById('editWordModal').classList.add('hidden')"
                                class="mr-3 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="notification_2"
        class="hidden fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInUp">
    </div>
        @if (session('success'))
            <div id="notification"
                class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                {{ session('success') }}
            </div>
            
            <script>
                setTimeout(() => {
                    document.getElementById('notification').style.display = 'none';
                }, 3000);
            </script>
        @endif

        <script>
            const notification = document.getElementById('notification_2');

            function editWord(id) {
                $.ajax({
                    url: `/word/${id}/edit`,
                    method: 'GET',
                    success: function(response) {
                        document.getElementById('editWord').value = response.word;
                        document.getElementById('editTranslation').value = response.translation;
                        document.getElementById('editLanguage').value = response.language;
                        document.getElementById('editForm').action = `/word/${id}`;
                        document.getElementById('editWordModal').classList.remove('hidden');
                    }
                });
            }

            // Search functionality
            document.getElementById('searchInput').addEventListener('keyup', function() {
                const searchValue = this.value.toLowerCase();
                const tableRows = document.querySelectorAll('tbody tr');

                tableRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchValue) ? '' : 'none';
                });
            });

            document.getElementById('word').addEventListener('input', autoTranslate);

            async function autoTranslate() { 
                
                const wordInput = document.getElementById('word');
                const translationInput = document.getElementById('translation');
                const languageSelect = document.getElementById('select[name="language"]');
                const word = wordInput.value.trim();

                if (!word) {
                    showNotification('Please enter a word to translate', 'war_livl_2');
                    return;
                }
                if (word.value == "") {
                    showNotification('Please enter a word to translate', 'war_livl_2');
                    return;
                }


                // Check if word is already added
                 

                try {
                    // if (translationInput.value ==""){

                    // }
                    // Show loading state
                    translationInput.value = 'Translating...';

                    // Detect the language of the word
                    const detectedLang = detectLanguage(word);
                    let sourceLang = 'en'; // Default source language is English
                    let targetLang = 'ar'; // Default target language is Arabic

                    // Change language pair based on detection
                    if (detectedLang === 'en') {
                        sourceLang = 'en';
                        if (languageSelect.value === 'english<->french') {
                            targetLang = 'fr'; // English ↔ French
                        } else if (languageSelect.value === 'english<->spanish') {
                            targetLang = 'es'; // English ↔ Spanish
                        }
                    } else if (detectedLang === 'ar') {
                        sourceLang = 'ar';
                        targetLang = 'en'; // Arabic ↔ English by default
                        if (languageSelect.value === 'arabic<->english') {
                            targetLang = 'en'; // Arabic ↔ English
                        }
                    } else {
                        sourceLang = 'en';
                        targetLang = 'fr';
                    }

                    // Using MyMemory API (Free Translation API)
                    const url =
                        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${sourceLang}|${targetLang}`;
                    const response = await fetch(url);
                    const data = await response.json();

                    // Check for the "MYMEMORY WARNING"
                    if (data.responseData && data.responseData.translatedText && data.responseData.translatedText.includes(
                            'MYMEMORY WARNING')) {
                        console.warn('Translation limit reached');
                        translationInput.value = ''; // Empty the input value
                        return;
                    }

                    // Handle translation response
                    if (!data.responseData || !data.responseData.translatedText) {
                        throw new Error('Translation failed');
                    }

                    translationInput.value = data.responseData.translatedText;
                } catch (error) {
                    console.error('Translation error:', error);
                    translationInput.value = '';
                }
            }
            // Show Notification
            function showNotification(message, livl) {
                notification.textContent = message;
                notification.classList.remove('hidden');

                if (livl == 'war_livl_1') {
                    notification.style.backgroundColor = "#fd7d53";
                    setTimeout(() => {
                        notification.classList.add('hidden');
                    }, 4000);

                } else if (livl == 'war_livl_2') {
                    setTimeout(() => {
                        notification.classList.add('hidden');
                    }, 2000);
                    notification.style.backgroundColor = "#9bd100";

                } else if (livl == '' || livl == undefined || livl == null || livl == 'war_livl_0') {
                    setTimeout(() => {
                        notification.classList.add('hidden');
                    }, 3000);
                }
            }
        </script>
</body>

</html>

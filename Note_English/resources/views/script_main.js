

let words = [
    { word: "Hello", translation: "مرحبًا", category: "general", language: "english<->arabic", example: "Hello, how are you?", isFavorite: false, isMastered: false },
    { word: "Thank you", translation: "شكرًا", category: "general", language: "english<->arabic", example: "Thank you for your help.", isFavorite: false, isMastered: false },
    { word: "Goodbye", translation: "وداعًا", category: "general", language: "english<->arabic", example: "Goodbye, see you later.", isFavorite: false, isMastered: false },
    { word: "Please", translation: "من فضلك", category: "general", language: "english<->arabic", example: "Please pass me the salt.", isFavorite: false, isMastered: false },
    { word: "Sorry", translation: "آسف", category: "general", language: "english<->arabic", example: "I am sorry for being late.", isFavorite: false, isMastered: false },

    { word: "Profit", translation: "ربح", category: "business", language: "english<->arabic", example: "The company made a high profit this year.", isFavorite: false, isMastered: false },
    { word: "Meeting", translation: "اجتماع", category: "business", language: "english<->arabic", example: "We have a meeting at 10 AM.", isFavorite: false, isMastered: false },
    { word: "Contract", translation: "عقد", category: "business", language: "english<->arabic", example: "The contract is valid for two years.", isFavorite: false, isMastered: false },

    { word: "Internet", translation: "الإنترنت", category: "technology", language: "english<->arabic", example: "The internet connects people worldwide.", isFavorite: false, isMastered: false },
    { word: "Software", translation: "البرمجيات", category: "technology", language: "english<->arabic", example: "This software helps manage accounts.", isFavorite: false, isMastered: false },
    { word: "Hardware", translation: "الأجهزة", category: "technology", language: "english<->arabic", example: "The computer hardware includes the processor and memory.", isFavorite: false, isMastered: false },

    { word: "Gravity", translation: "الجاذبية", category: "science", language: "english<->arabic", example: "Gravity keeps us on the ground.", isFavorite: false, isMastered: false },
    { word: "Atom", translation: "ذرة", category: "science", language: "english<->arabic", example: "An atom is the smallest unit of matter.", isFavorite: false, isMastered: false },
    { word: "Experiment", translation: "تجربة", category: "science", language: "english<->arabic", example: "The scientist conducted an experiment.", isFavorite: false, isMastered: false },

    { word: "Airport", translation: "مطار", category: "travel", language: "english<->arabic", example: "The flight departs from the airport.", isFavorite: false, isMastered: false },
    { word: "Hotel", translation: "فندق", category: "travel", language: "english<->arabic", example: "We booked a hotel for the night.", isFavorite: false, isMastered: false },
    { word: "Passport", translation: "جواز سفر", category: "travel", language: "english<->arabic", example: "You need a passport to travel abroad.", isFavorite: false, isMastered: false },

    { word: "Doctor", translation: "طبيب", category: "health", language: "english<->arabic", example: "The doctor checked my health.", isFavorite: false, isMastered: false },
    { word: "Medicine", translation: "دواء", category: "health", language: "english<->arabic", example: "You need to take your medicine.", isFavorite: false, isMastered: false },
    { word: "Exercise", translation: "تمرين", category: "health", language: "english<->arabic", example: "Exercise is good for the heart.", isFavorite: false, isMastered: false },

    { word: "Happy", translation: "سعيد", category: "emotions", language: "english<->arabic", example: "I feel happy today.", isFavorite: false, isMastered: false },
    { word: "Angry", translation: "غاضب", category: "emotions", language: "english<->arabic", example: "He was angry about the mistake.", isFavorite: false, isMastered: false },
    { word: "Sad", translation: "حزين", category: "emotions", language: "english<->arabic", example: "She felt sad after the news.", isFavorite: false, isMastered: false }
];


const mainBody = document.getElementById('mainBody');
const wordsTableBody = document.getElementById('wordsTableBody');
const totalWords = document.getElementById('totalWords');
const learningStreak = document.getElementById('learningStreak');
const masteredWords = document.getElementById('masteredWords');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const languageFilter = document.getElementById('languageFilter');
const sortFilter = document.getElementById('sortFilter');
const addWordModal = document.getElementById('addWordModal');
const flashcardModal = document.getElementById('flashcardModal');
const dailyChallengeModal = document.getElementById('dailyChallengeModal');
const notification = document.getElementById('notification');


function toggleTheme() {
    if (mainBody.classList.contains('dark')) {
        mainBody.classList.remove('dark');
        mainBody.classList.add('light');
    } else {
        mainBody.classList.remove('light');
        mainBody.classList.add('dark');
    }
}


function toggleImportExportMenu() {
    const menu = document.getElementById('importExportMenu');
    menu.classList.toggle('hidden');
}


function exportWords() {
    const dataStr = JSON.stringify(words);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'words.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Words exported successfully!', 'war_livl_0', 'war_livl_0');
}


function importWords(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            words = JSON.parse(content);
            renderWordsTable();
            showNotification('Words imported successfully!', 'war_livl_0');
        };
        reader.readAsText(file);
    }
}


function showAddModal() {
    const addWordForm = document.getElementById('addWordForm');
    addWordForm.reset();

    addWordModal.classList.remove('animate__fadeIn', 'animate__slideInUp');

    addWordModal.classList.remove('hidden');

    addWordModal.classList.add('animate__animated', 'animate__fadeIn');
    addWordModal.querySelector('.animate__slideInUp').classList.add('animate__animated', 'animate__slideInUp');

    const firstInput = addWordForm.querySelector('input[name="word"]');
    firstInput.focus();

    centerModal(addWordModal);
}


function centerModal(modal) {
    const modalContent = modal.querySelector('.animate__slideInUp');
    const windowHeight = window.innerHeight;
    const modalHeight = modalContent.offsetHeight;

    const topMargin = (windowHeight - modalHeight) / 2;
    modalContent.style.marginTop = `${Math.max(topMargin, 20)}px`; // Ensure it's at least 20px from the top
}


function hideAddModal() {
    addWordModal.classList.add('animate__animated', 'animate__fadeOut');
    addWordModal.querySelector('.animate__slideInUp').classList.add('animate__animated', 'animate__slideOutDown');

    setTimeout(() => {
        addWordModal.classList.add('hidden');
        addWordModal.classList.remove('animate__fadeOut');
        addWordModal.querySelector('.animate__slideInUp').classList.remove('animate__slideOutDown');
    }, 300); // Match the duration of the animation
}


function hideAddModal() {
    addWordModal.classList.add('hidden');
}


document.getElementById('addWordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let wordInput = document.getElementById('word');
    let translation = document.getElementById('translation');
    const word = wordInput.value.trim();
    const translationValue = translation.value.trim();

    if (word && translationValue) {
        const existingWord = checkExistingWord(word, translationValue);

        if (existingWord) {
            showNotification(`This word "${word}" or its translation already exists!`, 'war_livl_1');

            const existingRow = document.querySelector(`tr:contains('${existingWord.word}')`);
            if (existingRow) {
                existingRow.classList.add('bg-yellow-100');
                setTimeout(() => {
                    existingRow.classList.remove('bg-yellow-100');
                }, 3000);
            }

            e.target.reset();
            return;
        }

        const formData = new FormData(e.target);
        const newWord = {
            word: formData.get('word'),
            translation: formData.get('translation'),
            category: formData.get('category'),
            language: formData.get('language'),
            example: formData.get('example'),
            isFavorite: false,
            isDone: false,
            isMastered: false,
            dateAdded: new Date().toISOString()
        };

        words.unshift(newWord);
        saveToLocalStorage();
        renderWordsTable();
        hideAddModal();
        showNotification('Word added successfully!', 'war_livl_0');
        e.target.reset();
    } else if (!word && translationValue) {
        showNotification('Please enter a word to translate', 'war_livl_1');
    } else if (word && !translationValue) {
        showNotification('Please enter a translation for word', 'war_livl_2');
    }
});

function renderWordsTable() {
    wordsTableBody.innerHTML = '';

    const sortedWords = [...words].sort((a, b) => {
        if (a.isDone && !b.isDone) return 1;
        if (!a.isDone && b.isDone) return -1;
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    sortedWords.forEach((word, index) => {
        const actualIndex = words.findIndex(w => w.word === word.word);
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                     <button onclick="toggleDone(${actualIndex})" class="text-green-400 hover:text-green-500 ml-2">
                                <i class="fas ${word.isDone ? 'fa-square-check' : 'fa-stop'}" style="color:${word.isDone ? '#63E6BE' : '#B197FC'}"></i>
                            </button>
                            </td>
                <td class="px-6 py-4 whitespace-nowrap">  
                        
  <div class="relative">
                        <input type="text" value='${word.word}' name="wordtable" id="wordtable"
                            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <button type="button" onclick="speakWord(this)"
                                class="absolute right-2 top-3 text-gray-400 hover:text-white">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                    
            </td>
                <td class="px-6 py-4 whitespace-nowrap">${word.translation}</td>
                <td class="px-6 py-4 whitespace-nowrap">${word.category}</td>
                <td class="px-6 py-4 whitespace-nowrap">${word.language}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button onclick="toggleFavorite(${actualIndex})" class="text-yellow-400 hover:text-yellow-500">
                        <i class="fas ${word.isFavorite ? 'fa-star' : 'fa-star'}" style="color:${word.isDone ? '#FFD43B' : 'rgba(255, 213, 59, 0.1)'}"></i>  
                    </button> 
                    <button onclick="deleteWord(${actualIndex})" class="text-red-400 hover:text-red-500 ml-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        if (word.isDone) {
            row.style.backgroundColor = 'rgba(114, 222, 172, 0.13)';
            row.style.animation = 'wordDoneAnimation 0.1s ease-in-out forwards';


        }

        wordsTableBody.appendChild(row);
    });
    updateProgress();
}

function toggleFavorite(index) {
    words[index].isFavorite = !words[index].isFavorite;

    if (words[index].isFavorite) {
        showNotification(`"${words[index].word}" added to important words!`, 'war_livl_2');
    } else {
        showNotification(`"${words[index].word}" removed from important words`, 'war_livl_1');
    }

    saveToLocalStorage();
    renderWordsTable();
    updateStatistics();
    renderFavoriteWords();
}

function deleteWord(index) {
    words.splice(index, 1);
    saveToLocalStorage();
    renderWordsTable();
    showNotification('Word deleted successfully!', 'war_livl_0');
}
function toggleDone(index) {
    words[index].isDone = !words[index].isDone;

    if (words[index].isDone) {
        words[index].completedDate = new Date().toISOString();
        showNotification(`Great job! You've completed learning "${words[index].word}"!`, 'war_livl_2');

        if (!words[index].isMastered) {
            words[index].isMastered = true;
        }
    } else {
        delete words[index].completedDate;
        words[index].isMastered = false;
        showNotification(`"${words[index].word}" marked as not completed`, 'war_livl_1');
    }

    saveToLocalStorage();
    renderWordsTable();
    updateStatistics();
}

function updateProgress() {
    totalWords.textContent = words.length;
    const doneWords = words.filter(word => word.isDone).length;
    const progressPercentage = Math.round((doneWords / words.length) * 100) || 0;

    masteredWords.textContent = words.filter(word => word.isMastered).length;

    const doneWordsElement = document.getElementById('doneWords');
    if (doneWordsElement) {
        doneWordsElement.textContent = doneWords;
    }

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);
    }
}

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


let currentCardIndex = 0;
let isFlipped = false;

function showFlashcards() {
    flashcardModal.classList.remove('hidden');
    showCard(currentCardIndex);
}

function hideFlashcardModal() {
    flashcardModal.classList.add('hidden');
}

function showCard(index) {
    const card = words[index];
    const flashcardContent = document.getElementById('flashcardContent');
    flashcardContent.textContent = isFlipped ? card.translation : card.word;
}

function flipCard() {
    isFlipped = !isFlipped;
    showCard(currentCardIndex);
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % words.length;
    isFlipped = false;
    showCard(currentCardIndex);
}

function previousCard() {
    currentCardIndex = (currentCardIndex - 1 + words.length) % words.length;
    isFlipped = false;
    showCard(currentCardIndex);
}


function showDailyChallenge() {
    dailyChallengeModal.classList.remove('hidden');
    const randomWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('dailyWord').textContent = randomWord.word;
    document.getElementById('dailyDefinition').textContent = randomWord.translation;
    document.getElementById('dailyExample').textContent = `Example: ${randomWord.example}`;
}

function hideDailyChallengeModal() {
    dailyChallengeModal.classList.add('hidden');
}

function markLearned() {
    const word = document.getElementById('dailyWord').textContent;
    const wordIndex = words.findIndex(w => w.word === word);
    if (wordIndex !== -1) {
        words[wordIndex].isMastered = true;
        updateProgress();
        showNotification('Word marked as learned!', 'war_livl_0');
    }
    hideDailyChallengeModal();
}


function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        filterWords();
    };
    recognition.start();
}


function filterWords() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const language = languageFilter.value;
    const sort = sortFilter.value;

    let filteredWords = words.filter(word => {
        return (word.word.toLowerCase().includes(searchTerm) ||
            word.translation.toLowerCase().includes(searchTerm)) &&
            (category === '' || word.category === category) &&
            (language === '' || word.language === language);
    });

    filteredWords.sort((a, b) => {
        if (a.isDone && !b.isDone) return 1;
        if (!a.isDone && b.isDone) return -1;

        switch (sort) {
            case 'newest':
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            case 'alphabetical':
                return a.word.localeCompare(b.word);
            default:
                return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
    });

    renderFilteredWords(filteredWords);
}
function renderFilteredWords(filteredWords) {
    wordsTableBody.innerHTML = '';
    filteredWords.forEach((word, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                     <button onclick="toggleDone(${actualIndex})" class="text-green-400 hover:text-green-500 ml-2">
                                <i class="fas ${word.isDone ? 'fa-square-check' : 'fa-stop'}" style="color:${word.isDone ? '#63E6BE' : '#B197FC'}"></i>
     
                            </button>
                            </td>
                <td class="px-6 py-4 whitespace-nowrap">  
                        
  <div class="relative">
                        <input type="text" value='${word.word}' name="wordtable" id="wordtable"
                            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <button type="button" onclick="speakWord(this)"
                                class="absolute right-2 top-3 text-gray-400 hover:text-white">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                    
            </td>
                <td class="px-6 py-4 whitespace-nowrap">${word.translation}</td>
                <td class="px-6 py-4 whitespace-nowrap">${word.category}</td>
                <td class="px-6 py-4 whitespace-nowrap">${word.language}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button onclick="toggleFavorite(${actualIndex})" class="text-yellow-400 hover:text-yellow-500">
                        <i class="fas ${word.isFavorite ? 'fa-star' : 'fa-star'}" style="color:${word.isDone ? '#FFD43B' : 'rgba(255, 213, 59, 0.1)'}"></i>  
                    </button> 
                    <button onclick="deleteWord(${actualIndex})" class="text-red-400 hover:text-red-500 ml-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
        wordsTableBody.appendChild(row);
    });
}


searchInput.addEventListener('input', filterWords);
categoryFilter.addEventListener('change', filterWords);
languageFilter.addEventListener('change', filterWords);
sortFilter.addEventListener('change', filterWords);


renderWordsTable();
//speack

function speakWord(button) {
    const inputField = button.previousElementSibling;

    const word = inputField.value.trim();

    if (word === "") {
        alert("Please enter a word to speak.");
        return;
    }

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);

        const languagePair = document.querySelector('select[name="language"]').value;

        switch (languagePair) {
            case "english<->arabic":
                utterance.lang = "ar-SA"; // Arabic (Saudi Arabia)
                break;
            case "english<->french":
                utterance.lang = "fr-FR"; // French (France)
                break;
            case "english<->spanish":
                utterance.lang = "es-ES"; // Spanish (Spain)
                break;
            default:
                utterance.lang = "en-US"; // Default to English (US)
                break;
        }

        const voices = speechSynthesis.getVoices();

        const selectedVoice = voices.find(voice => voice.lang === utterance.lang);
        if (selectedVoice) {
            utterance.voice = selectedVoice; // Use the matching voice
        } else {
            console.warn("No matching voice found for the selected language. Using default voice.");
        }

        utterance.pitch = 1; // Range: 0 to 2
        utterance.rate = 1; // Speed: 0.1 to 10
        utterance.volume = 1; // Range: 0 to 1

        speechSynthesis.speak(utterance);
    } else {
        alert("Your browser does not support the Web Speech API.");
    }
}

function submitForm(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(document.getElementById('addWordForm'));

    console.log(Object.fromEntries(formData.entries()));


}
document.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        showAddModal();
    }
    if (event.key === "Enter") {
        showAddModal();
    }
});

document.getElementById('word').addEventListener('input', autoTranslate);

async function autoTranslate() {
    const wordInput = document.getElementById('word');
    const translationInput = document.querySelector('input[name="translation"]');
    const languageSelect = document.querySelector('select[name="language"]');
    const word = wordInput.value.trim();

    if (!word) {
        showNotification('Please enter a word to translate', 'war_livl_2');
        return;
    }
    if (word.value == "") {
        showNotification('Please enter a word to translate', 'war_livl_2');
        return;
    }


    if (isWordAlreadyAdded(word)) {
        showNotification('This word has already been translated', 'war_livl_1');
        return;
    }

    try {

        translationInput.value = 'Translating...';

        const detectedLang = detectLanguage(word);
        let sourceLang = 'en'; // Default source language is English
        let targetLang = 'ar'; // Default target language is Arabic

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

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${sourceLang}|${targetLang}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseData && data.responseData.translatedText && data.responseData.translatedText.includes('MYMEMORY WARNING')) {
            console.warn('Translation limit reached');
            translationInput.value = ''; // Empty the input value
            return;
        }

        if (!data.responseData || !data.responseData.translatedText) {
            throw new Error('Translation failed');
        }

        translationInput.value = data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        translationInput.value = '';
    }
}

function isWordAlreadyAdded(word) {
    const alreadyTranslatedWords = ['hello', 'world']; // Example array, replace with actual storage/logic
    return alreadyTranslatedWords.includes(word.toLowerCase());
}



function detectLanguage(word) {
    const arabicPattern = /[\u0600-\u06FF]/; // Arabic range in Unicode
    const englishPattern = /^[a-zA-Z\s]*$/; // English letters only (ignores spaces)

    if (arabicPattern.test(word)) {
        return 'ar'; // Arabic
    } else if (englishPattern.test(word)) {
        return 'en'; // English
    } else {
        return 'unknown'; // Unknown language
    }
}


const wordSets = {
    general: [
        { word: "analyze", translation: "تحليل", category: "general", language: "english<->arabic", example: "We need to analyze the data before making decisions." },
        { word: "sequence", translation: "تسلسل", category: "general", language: "english<->arabic", example: "The sequence of events led to a surprising conclusion." },
        { word: "Exceptions", translation: "استثناءات", category: "general", language: "english<->arabic", example: "There are exceptions to this rule." }
    ],
    business: [
        { word: "investment", translation: "استثمار", category: "business", language: "english<->arabic", example: "This is a long-term investment." },
        { word: "strategy", translation: "استراتيجية", category: "business", language: "english<->arabic", example: "We need a new marketing strategy." }
    ],
    technology: [
        { word: "algorithm", translation: "خوارزمية", category: "technology", language: "english<->arabic", example: "The algorithm processes data efficiently." },
        { word: "database", translation: "قاعدة بيانات", category: "technology", language: "english<->arabic", example: "The database stores customer information." }
    ]
};

let addedSets = new Set();
function newWord() {
    const button = document.getElementById('btnAddNewData');
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    try {
        const availableSets = Object.keys(wordSets).filter(set => {
            const remainingWords = wordSets[set].filter(word =>
                !words.some(w => w.word === word.word)
            );
            return remainingWords.length > 0;
        });

        if (availableSets.length === 0) {
            showNotification('All available words have been added! Try adding custom words instead.', 'war_livl_1');
            return;
        }

        const randomSet = availableSets[Math.floor(Math.random() * availableSets.length)];

        let newWords = wordSets[randomSet].filter(word =>
            !words.some(w => w.word === word.word)
        );

        if (newWords.length === 0) {
            showNotification(`No new words available in the ${randomSet} set.`);
            return;
        }

        const randomWords = [];
        const count = Math.min(3, newWords.length); // Adjust number of words to add
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * newWords.length);
            randomWords.push(newWords.splice(randomIndex, 1)[0]);
        }

        const wordsToAdd = randomWords.map(word => ({
            ...word,
            dateAdded: new Date().toISOString(),
            isFavorite: false,
            isMastered: false,
            id: generateUniqueId() // Add unique ID for each word
        }));

        words.push(...wordsToAdd);

        saveToLocalStorage();

        renderWordsTable();

        showNotification(`Added ${wordsToAdd.length} new ${randomSet} words successfully!`);

        animateNewWords(wordsToAdd);

    } catch (error) {
        console.error('Error adding new words:', error);
        showNotification('Error adding new words. Please try again.', 'war_livl_2');
    } finally {
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
        }, 1000);
    }
}


function saveToLocalStorage() {
    localStorage.setItem('vocabularyWords', JSON.stringify(words));
}

function loadFromLocalStorage() {
    const savedWords = localStorage.getItem('vocabularyWords');
    if (savedWords) {
        words = JSON.parse(savedWords);
        renderWordsTable();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadFromLocalStorage();

    const savedSets = localStorage.getItem('addedWordSets');
    if (savedSets) {
        addedSets = new Set(JSON.parse(savedSets));
    }

    searchInput.addEventListener('input', filterWords);
    categoryFilter.addEventListener('change', filterWords);
    languageFilter.addEventListener('change', filterWords);
    sortFilter.addEventListener('change', filterWords);

    updateStatistics();
    renderFavoriteWords();

    const chartData = generateChartData();
});




function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


function animateNewWords(newWords) {
    const rows = document.querySelectorAll('#wordsTableBody tr');
    rows.forEach(row => {
        const wordId = row.dataset.wordId;
        if (newWords.some(word => word.id === wordId)) {
            row.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                row.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000);
        }
    });
}


function checkExistingWord(word, translation) {
    return words.find(w =>
        w.word.toLowerCase() === word.toLowerCase() ||
        w.translation.toLowerCase() === translation.toLowerCase()
    );
}











document.querySelector = document.querySelector || function (selector) {
    if (selector.includes(':contains')) {
        const text = selector.match(/'([^']+)'/)[1];
        return Array.from(document.getElementsByTagName('tr')).find(el =>
            el.textContent.includes(text)
        );
    }
    return document.querySelector(selector);
};




function updateStatistics() {
    const stats = {
        totalWords: words.length,
        completedToday: getCompletedToday(),
        favoriteWords: words.filter(word => word.isFavorite).length,
        learningStreak: calculateLearningStreak()
    };

    localStorage.setItem('vocabularyStats', JSON.stringify(stats));

    updateStatsDisplay(stats);
}


function getCompletedToday() {
    const today = new Date().toDateString();
    return words.filter(word => {
        if (!word.completedDate) return false;
        return new Date(word.completedDate).toDateString() === today;
    }).length;
}


function calculateLearningStreak() {
    const dates = words
        .filter(word => word.completedDate)
        .map(word => new Date(word.completedDate).toDateString());

    const uniqueDates = [...new Set(dates)].sort();

    let streak = 0;
    let currentDate = new Date();

    while (uniqueDates.includes(currentDate.toDateString())) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}








function renderFavoriteWords() {
    const favoriteWordsContainer = document.getElementById('favoriteWordsContainer');
    if (!favoriteWordsContainer) return;

    const favoriteWords = words.filter(word => word.isFavorite);

    favoriteWordsContainer.innerHTML = favoriteWords.map(word => `
        <div class="p-4 bg-yellow-50 rounded-lg">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-semibold">${word.word}</h4>
                    <p class="text-sm text-gray-600">${word.translation}</p>
                </div>
                <i class="fas fa-star text-yellow-500"></i>
            </div>
            <p class="text-sm text-gray-500 mt-2">${word.example || 'No example available'}</p>
        </div>
    `).join('');
}


function generateChartData() {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toDateString();
    }).reverse();

    const progressData = last7Days.map(date => ({
        date: date.split(' ')[0], // Get day name
        completed: words.filter(word =>
            word.completedDate &&
            new Date(word.completedDate).toDateString() === date
        ).length,
        favorites: words.filter(word =>
            word.isFavorite &&
            word.dateAdded &&
            new Date(word.dateAdded).toDateString() === date
        ).length
    }));

    const categoryData = Object.entries(
        words.reduce((acc, word) => {
            acc[word.category] = (acc[word.category] || 0) + 1;
            return acc;
        }, {})
    ).map(([category, count]) => ({
        category,
        count
    }));

    return { progressData, categoryData };
}




//gameL 
(() => {
    // -----------------------------
    // Data & Utility Functions
    // -----------------------------
   const vocabularyWords =
      JSON.parse(localStorage.getItem("vocabularyWords")) ||
      [
        { word: "Apple", translation: "Pomme", example: "I ate an apple." },
        { word: "Cat", translation: "Chat", example: "The cat is sleeping." },
        { word: "Dog", translation: "Chien", example: "The dog barked loudly." },
        { word: "Book", translation: "Livre", example: "She is reading a book." },
        { word: "House", translation: "Maison", example: "They live in a big house." },
        { word: "Car", translation: "Voiture", example: "He drives a red car." },
        { word: "Tree", translation: "Arbre", example: "The tree is tall." },
        { word: "Water", translation: "Eau", example: "She drinks water every morning." },
        { word: "Chair", translation: "Chaise", example: "This chair is very comfortable." },
        { word: "Table", translation: "Table", example: "The table is made of wood." },
        { word: "Window", translation: "Fenêtre", example: "I opened the window to let in fresh air." },
        { word: "Sun", translation: "Soleil", example: "The sun is shining brightly." }
      ];

  
    const challengesData =
      JSON.parse(localStorage.getItem("challenges")) ||
      [
        { task: "Translate 5 words", completed: false },
        { task: "Complete Memory Game", completed: false },
        { task: "Win Speed Challenge", completed: false }
      ];
  
    // Update localStorage (if changes occur)
    const updateLocalStorage = () => {
      localStorage.setItem("vocabularyWords", JSON.stringify(vocabularyWords));
      localStorage.setItem("challenges", JSON.stringify(challengesData));
    };
  
    // Show modal for feedback (uses your existing #gameResultsModal)
    const showModal = (message) => {
      const modal = document.getElementById("gameResultsModal");
      const content = document.getElementById("gameResultsContent");
      content.innerHTML = `<p style="color:black; text-shadow: 0;">${message}</p>`;
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 900);
    };
  
    // -----------------------------
    // Game Display & Routing
    // -----------------------------
    const showGame = (gameId) => {
      // Hide all game containers
      document.querySelectorAll(".game-container").forEach((container) => {
        container.classList.add("hidden");
      });
      // Clear any previous content by resetting innerHTML (to reinitialize each game)
      const gameContainer = document.getElementById(gameId);
      gameContainer.classList.remove("hidden");
      gameContainer.innerHTML = "";
  
      // Call the corresponding game function
      switch (gameId) {
        case "wordMatch":
          startWordMatch(gameContainer);
          break;
        case "speedChallenge":
          startSpeedChallenge(gameContainer);
          break;
        case "memoryGame":
          startMemoryGame(gameContainer);
          break;
        case "dailyChallenge":
          startDailyChallenge(gameContainer);
          break;
        case "wordQuizChallenge":
          startWordQuizChallenge(gameContainer);
          break;
        case "askTranslateChallenge":
          startAskTranslateChallenge(gameContainer);
          break;
        case "efmQuestions":
          startEFMQuestions(gameContainer);
          break;
        default:
          gameContainer.innerHTML = "<p style='color:black; text-shadow: 0;' >Select a game!</p>";
      }
    };
  
    // Attach showGame to the global scope for any inline onclick calls.
    window.showGame = showGame;
  
    // -----------------------------
    // 1. Word Match Game
    // -----------------------------
    const startWordMatch = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">Match Words with Translations</h3>
        <div class="grid grid-cols-2 gap-4 mb-4" id="wmGrid" style="color:black; text-shadow: 0;"></div>
        <div class="mt-4 text-white">Score: <span id="wmScore">0</span> | Time: <span id="wmTimer">60</span>s</div>
      `;
      let score = 0;
      let timeLeft = 60;
      let firstSelection = null;
      const grid = document.getElementById("wmGrid");
      const scoreDisplay = document.getElementById("wmScore");
      const timerDisplay = document.getElementById("wmTimer");
  
      // Create arrays of words and translations then shuffle
      const words = vocabularyWords.map((item) => item.word);
      const translations = vocabularyWords.map((item) => item.translation);
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      const shuffledTranslations = [...translations].sort(() => Math.random() - 0.5);
  
      // Create a card element with improved hover/animation effects
      const createCard = (text, type) => {
        const card = document.createElement("div");
        card.className =
          "bg-blue-100 p-2 rounded text-center cursor-pointer transition transform hover:scale-105";
        card.innerText = text;
        card.addEventListener("click", () => {
          // If no card selected, mark as first selection
          if (!firstSelection) {
            firstSelection = { text, card, type };
            card.classList.add("bg-yellow-300");
          } else {
            // Prevent clicking the same card twice
            if (firstSelection.card === card) return;
            // Check if the selected pair is a valid match
            const isMatch = vocabularyWords.some((item) => {
              return (
                (item.word === firstSelection.text && item.translation === text) ||
                (item.translation === firstSelection.text && item.word === text)
              );
            });
            if (isMatch && firstSelection.type !== type) {
              score++;
              scoreDisplay.innerText = score;
              firstSelection.card.classList.replace("bg-yellow-300", "bg-green-300");
              card.classList.replace("bg-blue-100", "bg-green-300");
              // Disable further clicks on matched cards
              firstSelection.card.style.pointerEvents = "none";
              card.style.pointerEvents = "none";
              showModal("🎉 Correct Match!");
            } else {
              card.classList.add("bg-red-300");
              showModal("❌ Incorrect Match!");
              setTimeout(() => {
                card.classList.replace("bg-red-300", "bg-blue-100");
                firstSelection.card.classList.replace("bg-yellow-300", "bg-blue-100");
              }, 500);
            }
            firstSelection = null;
          }
        });
        return card;
      };
  
      // Append shuffled word and translation cards
      shuffledWords.forEach((word) => grid.appendChild(createCard(word, "word")));
      shuffledTranslations.forEach((trans) =>
        grid.appendChild(createCard(trans, "translation"))
      );
  
      // Timer countdown
      const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showModal(`Time's up! Final Score: ${score}`);
        }
      }, 1000);
    };
  
    // -----------------------------
    // 2. Speed Challenge
    // -----------------------------
    const startSpeedChallenge = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">Speed Translation Challenge</h3>
        <div class="text-center mb-4">
          <div id="scWord" class="text-3xl text-white mb-4">Ready?</div>
          <input type="text" id="scInput" class="w-64 p-2 rounded border" style="color:black; text-shadow: 0;" placeholder="Type translation here">
        </div>
        <div class="text-white">Score: <span id="scScore">0</span> | Time: <span id="scTimer">30</span>s</div>
      `;
      let score = 0;
      let timeLeft = 30;
      const wordDisplay = document.getElementById("scWord");
      const inputField = document.getElementById("scInput");
      const scoreDisplay = document.getElementById("scScore");
      const timerDisplay = document.getElementById("scTimer");
  
      const newWord = () => {
        const randomItem =
          vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
        wordDisplay.innerText = randomItem.word;
        inputField.value = "";
        inputField.focus();
        inputField.onkeyup = () => {
          if (
            inputField.value.trim().toLowerCase() ===
            randomItem.translation.toLowerCase()
          ) {
            score++;
            scoreDisplay.innerText = score;
            showModal("🎉 Correct!");
            newWord();
          }
        };
      };
      newWord();
  
      const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showModal(`Time's up! Final Score: ${score}`);
        }
      }, 1000);
    };
  
    // -----------------------------
    // 3. Memory Game
    // -----------------------------
    const startMemoryGame = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">Memory Cards</h3>
        <div class="grid grid-cols-4 gap-4 mb-4" id="mgGrid" style="color:black; text-shadow: 0;"></div>
        <div class="text-white">Matches: <span id="mgMatches">0</span> | Moves: <span id="mgMoves">0</span></div>
      `;
      let matches = 0,
        moves = 0;
      const grid = document.getElementById("mgGrid");
      const matchesDisplay = document.getElementById("mgMatches");
      const movesDisplay = document.getElementById("mgMoves");
  
      // Create an array of cards containing both word and translation values
      const cards = vocabularyWords.flatMap((item) => [item.word, item.translation]);
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      let flippedCards = [];
  
      shuffledCards.forEach((text) => {
        const card = document.createElement("div");
        card.className =
          "bg-white p-4 rounded text-center text-3xl cursor-pointer shadow transition transform hover:scale-105";
        card.innerText = text;
        card.style.visibility = "hidden";
        card.addEventListener("click", () => {
          if (flippedCards.length < 2 && card.style.visibility === "hidden") {
            card.style.visibility = "visible";
            flippedCards.push(card);
            if (flippedCards.length === 2) {
              moves++;
              movesDisplay.innerText = moves;
              const [first, second] = flippedCards;
              const isMatch = vocabularyWords.some((item) => {
                return (
                  (item.word === first.innerText && item.translation === second.innerText) ||
                  (item.translation === first.innerText && item.word === second.innerText)
                );
              });
              if (isMatch) {
                matches++;
                matchesDisplay.innerText = matches;
                first.style.backgroundColor = "lightgreen";
                second.style.backgroundColor = "lightgreen";
                first.style.pointerEvents = "none";
                second.style.pointerEvents = "none";
                showModal("🎉 Match Found!");
                flippedCards = [];
              } else {
                setTimeout(() => {
                  first.style.visibility = "hidden";
                  second.style.visibility = "hidden";
                  showModal("❌ Not a match!");
                  flippedCards = [];
                }, 800);
              }
            }
          }
        });
        grid.appendChild(card);
      });
    };
  
    // -----------------------------
    // 4. Daily Challenge
    // -----------------------------
    const startDailyChallenge = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">Daily Challenge</h3>
        <div id="dcList" class="space-y-4 mb-4" style="color:black; text-shadow: 0;"></div>
        <div class="text-black">Progress: <span id="dcProgress">0</span>/${challengesData.length}</div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">    
          <div id="dcProgressBar" class="bg-yellow-500 h-2.5 rounded-full" style="width:0%"></div>
        </div>
      `;
      const listContainer = document.getElementById("dcList");
      challengesData.forEach((challenge, index) => {
        const item = document.createElement("div");
        item.className = "flex justify-between items-center bg-white p-3 rounded";
        item.innerHTML = `
          <span>${challenge.task}</span>
          <input type="checkbox" ${challenge.completed ? "checked" : ""} data-index="${index}" class="dc-checkbox">
        `;
        listContainer.appendChild(item);
      });
  
      const completed = challengesData.filter((ch) => ch.completed).length;
      document.getElementById("dcProgress").innerText = completed;
      document.getElementById("dcProgressBar").style.width = `${(completed / challengesData.length) * 100}%`;
  
      // Attach checkbox event listeners to update challenge completion
      document.querySelectorAll(".dc-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          const idx = parseInt(e.target.dataset.index);
          challengesData[idx].completed = e.target.checked;
          updateLocalStorage();
          startDailyChallenge(container);
        });
      });
    };
  
    // -----------------------------
    // 5. Word Quiz Challenge
    // -----------------------------
    const startWordQuizChallenge = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">Word Quiz Challenge</h3>
        <div id="wqContent" class="text-white"></div>
        <button id="wqNext" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Next Question</button>
      `;
      const contentDiv = document.getElementById("wqContent");
  
      const loadQuestion = () => {
        if (vocabularyWords.length === 0) {
          contentDiv.innerHTML = `<p>No vocabulary words available!</p>`;
          return;
        }
        const randomItem =
          vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
        const correct = randomItem.translation;
        let options = [correct];
        const otherOptions = vocabularyWords
          .filter((item) => item.translation !== correct)
          .map((item) => item.translation);
        otherOptions.sort(() => Math.random() - 0.5);
        options = options.concat(otherOptions.slice(0, Math.min(3, otherOptions.length)));
        options.sort(() => Math.random() - 0.5);
  
        contentDiv.innerHTML = `
          <p class="mb-4">What is the translation for: <strong>${randomItem.word}</strong>?</p>
          <div id="wqOptions" class="space-y-2"></div>
          <div id="wqFeedback" class="mt-4"></div>
        `;
        const optionsDiv = document.getElementById("wqOptions");
        options.forEach((option) => {
          const btn = document.createElement("button");
          btn.className = "w-full px-4 py-2 border rounded hover:bg-gray-200 transition";
          btn.innerText = option;
          btn.addEventListener("click", () => {
            checkWordQuizAnswer(option, correct);
          });
          optionsDiv.appendChild(btn);
        });
      };
  
      const checkWordQuizAnswer = (selected, correct) => {
        const feedback = document.getElementById("wqFeedback");
        if (selected === correct) {
          feedback.innerHTML = `<p class="text-green-500 font-bold">🎉 Correct!</p>`;
        } else {
          feedback.innerHTML = `<p class="text-red-500 font-bold">❌ Incorrect! The correct answer is ${correct}.</p>`;
        }
      };
  
      loadQuestion();
      document.getElementById("wqNext").addEventListener("click", loadQuestion);
    };
  
    // -----------------------------
    // 6. Ask Translate Challenge
    // -----------------------------
    const startAskTranslateChallenge = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">Ask Translate Challenge</h3>
        <div id="atContent" class="text-white"></div>
      `;
      const contentDiv = document.getElementById("atContent");
  
      const loadChallenge = () => {
        if (vocabularyWords.length === 0) {
          contentDiv.innerHTML = `<p>No vocabulary words available!</p>`;
          return;
        }
        const randomItem =
          vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
        const direction = Math.random() < 0.5;
        const prompt = direction ? randomItem.word : randomItem.translation;
        const correct = direction ? randomItem.translation : randomItem.word;
  
        contentDiv.innerHTML = `
          <p class="mb-4">Translate the following: <strong>${prompt}</strong></p>
          <input type="text" id="atInput" class="w-full px-4 py-2 border rounded" style="color:black; text-shadow: 0;" placeholder="Type your translation here">
          <div id="atFeedback" class="mt-4"></div>
        `;
        const inputField = document.getElementById("atInput");
        inputField.focus();
        inputField.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            const userAnswer = inputField.value.trim();
            const feedback = document.getElementById("atFeedback");
            if (userAnswer.toLowerCase() === correct.toLowerCase()) {
              feedback.innerHTML = `<p class="text-green-500 font-bold">🎉 Correct!</p>`;
              setTimeout(loadChallenge, 1500);
            } else {
              feedback.innerHTML = `<p class="text-red-500 font-bold">❌ Incorrect! Try again.</p>`;
            }
          }
        });
      };
      loadChallenge();
    };
  
    // -----------------------------
    // 7. EFM Questions Challenge
    // -----------------------------
    const startEFMQuestions = (container) => {
      container.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-white">EFM Questions Challenge</h3>
        <div id="efmContent" class="text-white"></div>
        <button id="efmNext" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Next Question</button>
      `;
      const contentDiv = document.getElementById("efmContent");
  
      const loadQuestion = () => {
        if (vocabularyWords.length === 0) {
          contentDiv.innerHTML = `<p>No vocabulary words available!</p>`;
          return;
        }
        const randomItem =
          vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
        const correctExample = randomItem.example || "No example available";
        let options = [correctExample];
        const otherExamples = vocabularyWords
          .filter((item) => item.example && item.example !== correctExample)
          .map((item) => item.example);
        otherExamples.jfijesort(() => Math.random() - 0.5);
        options = options.concat(otherExamples.slice(0, Math.min(3, otherExamples.length)));
        options.sort(() => Math.random() - 0.5);
  
        contentDiv.innerHTML = `
          <p class="mb-4">Select the correct example sentence for: <strong>${randomItem.word}</strong></p>
          <div id="efmOptions" class="space-y-2"></div>
          <div id="efmFeedback" class="mt-4"></div>
        `;
        const optionsDiv = document.getElementById("efmOptions");
        options.forEach((option) => {
          const btn = document.createElement("button");
          btn.className = "w-full px-4 py-2 border rounded hover:bg-gray-200 transition";
          btn.innerText = option;
          btn.addEventListener("click", () => {
            checkEFMAnswer(option, correctExample);
          });
          optionsDiv.appendChild(btn);
        });
      };
  
      const checkEFMAnswer = (selected, correct) => {
        const feedback = document.getElementById("efmFeedback");
        if (selected === correct) {
          feedback.innerHTML = `<p class="text-green-500 font-bold">🎉 Correct!</p>`;
        } else {
          feedback.innerHTML = `<p class="text-red-500 font-bold">❌ Incorrect! The correct answer is: ${correct}</p>`;
        }
      };
  
      loadQuestion();
      document.getElementById("efmNext").addEventListener("click", loadQuestion);
    };
 
    window.addEventListener("DOMContentLoaded", () => {
      updateLocalStorage(); 
      // Also initialize the Daily Challenge container, if desired.
      startDailyChallenge(document.getElementById("dailyChallenge"));
    });
  })();
       

var darkMode = localStorage.getItem('mode') && localStorage.getItem('mode') === 'dark'
if (darkMode) {
  document.documentElement.dataset.mode = 'dark'
}
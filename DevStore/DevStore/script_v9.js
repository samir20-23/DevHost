let heroinnerBtn = document.getElementById('heroinnerBtn');
let heroinnerBtn_v2 = document.getElementById('heroinnerBtn_v2');


let hero__inner = document.getElementById('hero__inner');
heroinnerBtn_v2.addEventListener('click', () => {
    hero__inner.style.display = "none"; // Hides the hero__inner element
    window.scrollTo(0, 0); // Scrolls the page to the top
});
heroinnerBtn.addEventListener('click', () => {
    hero__inner.style.display = "none"; // Hides the hero__inner element
    window.scrollTo(0, 0); // Scrolls the page to the top
});

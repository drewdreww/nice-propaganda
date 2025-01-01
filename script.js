const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let index = 0;


function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${index * 100}%)`; 
}

// Add event listeners for buttons
prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : 3; 
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    index = (index < 3) ? index + 1 : 0; 
    updateCarousel();
});

// Add touch events for swipe gestures
let startX = 0;
let endX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        // Swipe left
        index = (index < 3) ? index + 1 : 0;
    } else if (startX < endX - 50) {
        // Swipe right
        index = (index > 0) ? index - 1 : 3;
    }
    updateCarousel();
});

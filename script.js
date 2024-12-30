const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let index = 0;

prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : 3; // Wrap around to the last image
    carouselContainer.style.transform = `translateX(-${index * 600}px)`;
});

nextBtn.addEventListener('click', () => {
    index = (index < 3) ? index + 1 : 0; // Wrap around to the first image
    carouselContainer.style.transform = `translateX(-${index * 600}px)`;
});

document.addEventListener('DOMContentLoaded', function () {
	// Додаємо елемент з класом "fader" у #header
	const fader = document.createElement('span');
	fader.classList.add('fader');
	document.getElementById('header').appendChild(fader);
  
	// Додаємо подію кліку для кнопки "open-menu"
	const openMenuButton = document.querySelector('.open-menu');
	if (openMenuButton) {
	  openMenuButton.addEventListener('click', function (event) {
		event.preventDefault(); // Забороняємо стандартну поведінку
		document.body.classList.toggle('menu-opened');
	  });
	}
  
	// Додаємо подію кліку для елемента "fader"
	fader.addEventListener('click', function () {
	  document.body.classList.remove('menu-opened');
	});
  });

  const carousel = document.getElementById('customCarousel');
  const currentSlideElement = document.querySelector('.curent-slide');
  const totalSlidesElement = document.querySelector('.total-slides');
  const totalSlides = carousel.querySelectorAll('.carousel-item').length;

  totalSlidesElement.textContent = totalSlides;

  // Оновлення поточного слайду
  carousel.addEventListener('slid.bs.carousel', function () {
    const activeIndex = [...carousel.querySelectorAll('.carousel-item')].indexOf(carousel.querySelector('.carousel-item.active'));
    currentSlideElement.textContent = activeIndex + 1;
  });
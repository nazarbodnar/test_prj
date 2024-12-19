$(document).ready(function () {
	$('<span class="fader"/>').appendTo('#header');
	$('.open-menu').click(function () {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').click(function () {
		$('body').removeClass('menu-opened');
	});//mobile-menu
	
});




dom.addEventListener("click", document.querySelectorAll('header .mobile-menu-trigger, header nav .menu-closed'), function(e)
{
	// dom.body.classList.toggle("overlay");
	var mainMenu = document.getElementById("main-menu");
	mainMenu.classList.toggle("mobile-nav");
	mainMenu.classList.toggle("open");
});

// ----- HAMBURGER MENU ----- //
function mobileMenuToggle(){
	let hamburgerMenu = document.getElementById('hamburger-menu');
	let mobileMenu = document.querySelector('nav');
		hamburgerMenu.addEventListener('click', function(){
			if (hamburgerMenu.classList.contains('is-active')){
				hamburgerMenu.classList.remove('is-active');
				mobileMenu.style.width = 0;

			} else {
				hamburgerMenu.classList.add('is-active');
				mobileMenu.style.width = '200px';
			}
		});
};
mobileMenuToggle();

// ----- UPDATING THE SINGULAR IMAGE IN THE LIST OF SERVICES ----- //
document.querySelector('#plastering-img-container').addEventListener("mouseover", (e) =>{
	document.getElementById('plaster-img').src = "icons/plasteringblack.png";
	console.log(e.target);
});

document.querySelector('#plastering-img-container').addEventListener("mouseleave", (e) =>{
	document.getElementById('plaster-img').src = "icons/plasteringwhite.png";
	console.log(e.target);
});


// ----- DYNAMICALLY SET THE WELCOME SECTION HEIGHT BASED ON HEADER HEIGHT ----- //
function setWelcomeSectionHeight(){
	let headerHeight = document.getElementById('header').clientHeight;
	document.getElementById('section-welcome').style.height = (window.innerHeight - headerHeight) + "px";
}
setWelcomeSectionHeight();

// ----- SCROLL FUNCTION TO MAKE CONTENT DYNAMICALLY APPEAR ----- //
window.addEventListener('scroll', function() {
	let triggeredCard, triggeredServices;
    if(window.scrollY > 200 && triggeredCard !== true) {
        Array.from(document.querySelectorAll(".card"), e => e.style.opacity = "1");
        triggeredCard = true;
    }

    if(window.scrollY > 900 && triggeredServices !== true) {
    	document.querySelector(".skills-list").style.opacity = "1";
    	triggeredServices = true;
    }
});

// ----- INITIALISE MATERIALIZED ----- //
M.AutoInit();

// ----- INITIALISE MATERIALIZED GALLERY ----- //
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.materialboxed');
	var instances = M.Materialbox.init(elems);
});

//----- INITIALISE MATERIALIZE CAROUSEL ----- //
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.carousel');
	console.log(elems);
	var instance = M.Carousel.init({
		fullWidth: true,
		indicators: true
	  });
  });



  




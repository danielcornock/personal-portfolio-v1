window.onload = () =>{
    sessionStorage.setItem('visited', true);
}

if(sessionStorage.getItem('visited')){
    if (document.querySelector('.hero__logo')){
        document.querySelector('.header').classList.add('header--no-anim');
        document.querySelector('.hero__logo').style.animation = "none";
        document.querySelector('.hero__title').style.animationDelay = "0s";
        document.querySelector('.hero__subtext').style.animationDelay = "0.6s";
        document.querySelector('.hero__icon').style.animationDelay = "1s";
    }
}


const headerResize = function(){
    const header = document.querySelector('.header');
    const headerLogo = header.querySelector('.header__logo');
    const headerWrapper = header.querySelector('.wrapper');
    const headerSub = header.querySelector('.header__branding__text span');
    const nav = header.querySelector('.nav');
    let prevScrollPos = window.pageYOffset;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150){
            headerLogo.classList.add("header__logo--small");
            headerWrapper.classList.add("wrapper--fixed-header");
            header.classList.add("header--fixed");
            nav.classList.add("nav--fixed");
            if(headerSub){
                headerSub.style.display = "none";
                headerSub.style.transform = "scale(0)";
            }
            
        } else if (window.scrollY < 150){
            headerLogo.classList.remove("header__logo--small");
            headerWrapper.classList.remove("wrapper--fixed-header");
            header.classList.remove("header--fixed");
            nav.classList.remove("nav--fixed");

            if(headerSub){
                headerSub.style.display = "block";
                headerSub.style.transform = "scale(1)";

            }
        }

    })
}();

const mobileMenuToggle = function(){
	const hamburgerBtn = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navItems = nav.querySelectorAll('.nav__item');
    const header = document.querySelector('.header--main');
    let transparentHeader = true;
		hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            nav.classList.toggle('nav--active'); 
            navItems.forEach(item => {
                item.classList.toggle('nav__item--active');
            });
        });

        navItems.forEach(item => item.addEventListener("click", () =>{
            nav.classList.remove('nav--active');
            navItems.forEach(navItem => navItem.classList.remove('nav__item--active'));
            hamburgerBtn.classList.remove('is-active');
        }));
    
}();

if(sessionStorage.getItem('inverted') == "true"){
    setLights();
}

function setLights(){
    const body = document.querySelector('main');
    const images = document.querySelectorAll('main img');
    const lightText = document.querySelector('.lights__text');
    const hero = document.querySelector('.hero');

    if (hero){
        hero.classList.toggle('inverted');
    }
    body.classList.toggle('inverted');
    images.forEach(image => image.classList.toggle('inverted'));
    
    if(sessionStorage.getItem('inverted') == "true"){
        lightText.innerHTML = "LIGHTS OFF!";
    } else {
        lightText.innerHTML = "LIGHTS ON!";
    }
}

const lightsOnLightsOff = function() {
    const button = document.querySelector('.lights');

    if (!button){
        return;
    }
    
    button.addEventListener("click", () => {
        if (sessionStorage.getItem('inverted') == "true"){
            sessionStorage.setItem('inverted', "false");
        } else {
            sessionStorage.setItem('inverted', "true");
        }
        setLights();
    });
}();

function checkForTags(entry, tag){
    entryTags = entry.getAttribute('data-filter');
    if (entryTags.includes(tag)){
        return true;
    }
}
const filterWork = function (){
    if (!document.querySelector('.portfolio__filter-tags')){
        return;
    }

    const tags = document.querySelectorAll('.portfolio__filter-tag');
    const workContainer = document.querySelector('.portfolio__content');
    const workList = document.querySelectorAll('.portfolio__entry');
    const workListArray = Array.from(workList);
    

    tags.forEach(tag => tag.addEventListener("click", () =>{
        let newList = workListArray.filter(entry => checkForTags(entry, tag.innerHTML));

        // Animation for filtering entries
        workContainer.classList.add('portfolio-leave-anim');

        setTimeout(function(){
            // Removes all child nodes
            while (workContainer.firstChild) {
                workContainer.removeChild(workContainer.firstChild);
            }
            // Adds new child nodes
            newList.forEach(node => {
                workContainer.appendChild(node);
            })
        }, 500);

        // Remove animation so it can be used again
        setTimeout(function(){
            workContainer.classList.remove('portfolio-leave-anim');

        },1000)

        
    }))
}();

const searchTagsMatch = (post, searchCriteria) => {
    tag = post.dataset.search.toUpperCase();
    return tag.includes(searchCriteria);
}
const searchTitleMatch = (post, searchCriteria) => {
    title = post.querySelector('.blog-entry--wide__title').textContent.toUpperCase();
    return title.includes(searchCriteria);
}
const searchDescriptionMatch = (post, searchCriteria) => {
    title = post.querySelector('.blog-entry--wide__description').textContent.toUpperCase();
    return title.includes(searchCriteria);
}

const searchPosts = function() {
    if (!window.location.hash) {
        return;
    }
    const postList = document.querySelector('.blog-posts--vertical');
    const allPosts = Array.from(document.querySelectorAll('.blog-entry--wide'));

    let rawSearchCriteria = window.location.hash.substr(1);
    let searchCriteria = rawSearchCriteria.toUpperCase();
    let searchCount = 0;

    let filteredPosts = allPosts.filter(post => {
        if (searchTagsMatch(post, searchCriteria)) {
            searchCount++;
            return true;
        } else if (searchTitleMatch(post, searchCriteria)) {
            searchCount++;
            return true;
        } else if (searchDescriptionMatch(post, searchCriteria)) {
            searchCount++;
            return true;
        }
    })

    if (rawSearchCriteria) {
        while (postList.firstChild) {
            postList.removeChild(postList.firstChild);
        }
        // Adds new child nodes
        filteredPosts.forEach(post => {
            postList.appendChild(post);
        })

        document.querySelector('.blog__header').style.display = 'none';
        document.querySelector('.blog__search-title').style.display = 'block';
        document.querySelector('#search-amount').innerHTML = searchCount;
        if (0 < searchCount && searchCount < 2) {
            document.querySelector('#search-plural').style.display = 'none';
        }
        document.querySelectorAll('.search-query').forEach(span => {
            span.innerHTML = rawSearchCriteria;
        });

        if(!searchCount){
            document.querySelector('.blog__search-title').style.marginTop = '100px';
            document.querySelector('.search-apology').style.display = 'block';
        }
    }
}();

const sendSearch = () => {

}
const listenForSearch = function () {
    const baseUrl = window.location.origin;
    const path = '/blog/archive/';
    const searchBar = document.querySelector('.blog-header__search');
    const searchButton = document.querySelector('.blog-header__search-submit');
    const tags = document.querySelectorAll('.blog-entry__tag');
    let searchToken = false;

    searchBar.addEventListener('keypress', (e) => {
        if (e.keyCode == 13){
            window.location.href = `${baseUrl}${path}#${searchBar.value}`;
            if (window.location.pathname === path){
                location.reload();
            }
            
        }
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            window.location.href = `${baseUrl}${path}${tag.textContent.trim()}`;
            console.log(`${baseUrl}${path}${tag.textContent.trim()}`)
            if (window.location.pathname === path){
                location.reload();
            }
        })
    })

    searchButton.addEventListener('click', () => {
        console.log('he');
        window.location.href = `${baseUrl}${path}#${searchBar.value}`;
        if (window.location.pathname === path){
            location.reload();
        }

    })
    
}();



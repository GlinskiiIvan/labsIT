// меню
console.log("aaaa");
const menuIcon = document.querySelector('.menu-icon');
const navbarList = document.querySelector('.navbar__list');
const body = document.querySelector('body');
if(menuIcon) {
    menuIcon.addEventListener("click", function(e) {
        body.classList.toggle('_lock');
        menuIcon.classList.toggle('_active');
        navbarList.classList.toggle('_active');
    })
}

// прокрутка к секции

const menuLinks = document.querySelectorAll('.navbar__item--link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(link => {
        link.addEventListener("click", onMenuLinkClick);
    })

    function onMenuLinkClick(e) {
        const link = e.target;
        if(link.dataset.goto && document.querySelector(link.dataset.goto)) {
            const gotoBlock = document.querySelector(link.dataset.goto);
            const gotoBlockPosition = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if(menuIcon.classList.contains('_active')) {
                body.classList.remove('_lock');
                menuIcon.classList.remove('_active');
                navbarList.classList.remove('_active');                
            }

            window.scrollTo({
                top: gotoBlockPosition,
                behavior: "smooth"
            })
            e.preventDefault();
        }
    }
}


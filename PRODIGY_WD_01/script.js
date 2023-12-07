//!============= SHOW DROPDOWN MODAL =========
let dropdownModals = document.querySelectorAll('.dropdown__modal');
let menu = document.querySelector('.nav__menu');
let menuToggle=document.querySelector('.menu__toggle')
let menuToggleIcon = document.querySelector('.menu__toggle i');

function removeAllModals() {
    dropdownModals.forEach(modal => {
        modal.classList.remove('show');
    });
}

document.addEventListener('click', (event) => {
    if (event.target.matches('.dropdown__link')) {
        let link = event.target;
        if (link.nextElementSibling.classList.contains('show')) {
            link.nextElementSibling.classList.remove('show');
        } else {
            removeAllModals();
            link.nextElementSibling.classList.add('show');
        }
    } else {
        removeAllModals();
    }
});



//!============== SHOW MENU ==========
menuToggle.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menuToggleIcon.classList.replace('ri-close-fill', 'ri-menu-fill');
    } else {
        menu.classList.add('show');
        menuToggleIcon.classList.replace('ri-menu-fill', 'ri-close-fill');
    }
})
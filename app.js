const navBar = document.querySelector('#nav-bar');
const navContainer = document.querySelector('#nav-container');


window.addEventListener('scroll', e  => {
    navBar.classList.toggle('solid', window.scrollY > 0);
})


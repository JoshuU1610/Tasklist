const navBar = document.querySelector('#nav-bar');
const taskInput = document.querySelector('#list-text');
const buttonAgg = document.querySelector('#main-button-agg');


window.addEventListener('scroll', e  => {
    navBar.classList.toggle('solid', window.scrollY > 0);
})

taskInput.addEventListener('input', e => {
    if(!taskInput.value){
        buttonAgg.disabled = true;
    } else {
        buttonAgg.disabled = false
    }
})
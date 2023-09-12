const navBar = document.querySelector('#nav-bar');
const taskInput = document.querySelector('#list-text');
const buttonAgg = document.querySelector('#main-button-agg');
const form = document.querySelector('#main-head');
const ButtonAll = document.getElementById('filter-all');
const ButtonSuccess = document.getElementById('filter-success');
const ButtonIncomplete = document.getElementById('filter-incomplete');
const buttonsFilter = document.getElementById('main-filter');
let contSuccess = 0;
let contIncompletes = 0;
const regex = /^(?!.*\s{2,})[^ ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s\d!@#$%^&*()-=_+{}\[\]|;:'",.<>\/?\\]{0,279}(?!\s)$/;

const show = (clase1,clase2) => {
    const allTask = document.getElementsByClassName(clase2);
    [...allTask].forEach(a => a.setAttribute('style', 'display: none'));
    let task = document.getElementsByClassName(clase1);
    [...task].forEach(a => a.setAttribute('style', 'display: flex'));
}

window.onload = () => {
    myUL.innerHTML = localStorage.getItem('task');
    buttonsFilter.innerHTML= localStorage.getItem('buttons');
    contIncompletes = JSON.parse(localStorage.getItem('contIncompletes'));
    if (contIncompletes === null) {
        contIncompletes = 0;
    }
    contSuccess = JSON.parse(localStorage.getItem('contSuccess'));
    if ( contSuccess === null) {
         contSuccess = 0;
    }

      buttonsFilter.innerHTML = `<button id="filter-all" class="button-filter">todas</button>
            <button id="filter-success" class="button-filter" >Hechas ${contSuccess}</button>
            <button id="filter-incomplete" class="button-filter" >sin terminar ${contIncompletes}</button>`;
}

window.addEventListener('scroll', e  => {
    navBar.classList.toggle('solid', window.scrollY > 0);
})

taskInput.addEventListener('input', e => {
    const validation = regex.test(taskInput.value);

    if(!validation){
        buttonAgg.disabled = true;
    } else {
        buttonAgg.disabled = false
    }
})


form.addEventListener('submit', e => {
    
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `<p class="task">${taskInput.value}</p>
    
    <div class="buttons">
    <button class="item-delete">
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    </button>
    
    <button class="item-check">
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    </button>
        
    </div>`;
    li.classList.add('item');
    myUL.append(li);
    contIncompletes++;
    buttonsFilter.innerHTML = `<button id="filter-all" class="button-filter">todas</button>
    <button id="filter-success" class="button-filter" >Hechas ${contSuccess}</button>
    <button id="filter-incomplete" class="button-filter" >sin terminar ${contIncompletes}</button>`;
    localStorage.setItem('task', myUL.innerHTML);
    localStorage.setItem('buttons', buttonsFilter.innerHTML);
    localStorage.setItem('contIncompletes', JSON.stringify(contIncompletes));
    taskInput.value = '';
})

myUL.addEventListener('click', e => {
    
    if(e.target.closest('.item-delete')){
        
        e.target.closest('.item-delete').parentElement.parentElement.remove();
        localStorage.setItem('task', myUL.innerHTML);
        clase = e.target.closest('.item-delete').parentElement.parentElement.classList.contains('item');
        console.log(clase);
        if (clase) {
            contIncompletes--;
            console.log('a');
        } else {
            contSuccess--;
            console.log('a2');
        }
        buttonsFilter.innerHTML = `<button id="filter-all" class="button-filter">todas</button>
        <button id="filter-success" class="button-filter" >Hechas ${contSuccess}</button>
        <button id="filter-incomplete" class="button-filter" >sin terminar ${contIncompletes}</button>`;
        localStorage.setItem('buttons', buttonsFilter.innerHTML);
        localStorage.setItem('contIncompletes', JSON.stringify(contIncompletes));
        localStorage.setItem('contSuccess', JSON.stringify(contSuccess));
    }
    
    
    if(e.target.closest('.item-check')){
        const selec = e.target.closest('.item-check').parentElement.parentElement;
        const button = e.target.closest('.item-check');
        
        if(!selec.classList.contains('success')){
            selec.classList.add('success');
            
            button.innerHTML = `<svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
            </svg>`;

            selec.classList.remove('item');
            contIncompletes--;
            contSuccess++;
            buttonsFilter.innerHTML = `<button id="filter-all" class="button-filter">todas</button>
            <button id="filter-success" class="button-filter" >Hechas ${contSuccess}</button>
            <button id="filter-incomplete" class="button-filter" >sin terminar ${contIncompletes}</button>`;
            
        } else {
            selec.classList.remove('success');
            
            button.innerHTML = `<svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`;

            selec.classList.add('item');
            contIncompletes++;
            contSuccess--;
            buttonsFilter.innerHTML = `<button id="filter-all" class="button-filter">todas</button>
            <button id="filter-success" class="button-filter" >Hechas ${contSuccess}</button>
            <button id="filter-incomplete" class="button-filter" >sin terminar ${contIncompletes}</button>`;
        }
        localStorage.setItem('task', myUL.innerHTML);
        localStorage.setItem('buttons', buttonsFilter.innerHTML);
        localStorage.setItem('contIncompletes', JSON.stringify(contIncompletes));
        localStorage.setItem('contSuccess', JSON.stringify(contSuccess));
    }

})

document.addEventListener('click', e => {
    const target = e.target;
  
    // Verificar si el botón correspondiente fue clickeado
    if (target.matches('#filter-success')) {
      show('success', 'item');
    } else if (target.matches('#filter-incomplete')) {
      show('item', 'success');
    } else if (target.matches('#filter-all')) {
      show('item', 'item');
      show('success', 'success');
    }
  });

function switchTheme(e) {
    e.preventDefault();
    for(let el of form.elements) {
        if(el.name === 'theme' && el.checked) {
            document.documentElement.setAttribute('class', el.value);
            localStorage.theme = JSON.stringify(el.value);
        }
    }
    
}

function setTheme() {
    let theme;
    try {
        theme = JSON.parse(localStorage.theme);
    } catch {
        theme = '';
    }
     
    if(theme != null) document.documentElement.setAttribute('class', theme);
    for(let el of form.elements) {
        if(el.name === 'theme') {
            el.checked = el.value===theme;
        }
    }
}

let form = document.querySelector('.settings__form');
form.addEventListener('submit', switchTheme);
setTheme();
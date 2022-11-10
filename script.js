function openDropdownHandler(e) {
    if(e.target.tagName != 'DIV') return;
    let classListIncludes = e.target.classList.contains('settings__input-element') 
        || e.target.classList.contains('select')
        || e.target.classList.contains('dropdown')
        || e.target.classList.contains('option');
    
        let id = e.target.id;
    
    if(e.target.nextElementSibling.style.display === 'none' || e.target.classList.contains('settings__img')) {
        e.target.nextElementSibling.style.display = 'block';
        dropdownOpen = true;
        focusSelect(dropdownOpen, id);
    }
    else if(e.target.nextElementSibling.style.display != 'none' || classListIncludes) {
        e.target.nextElementSibling.style.display = 'none';
        dropdownOpen = false;
        focusSelect(dropdownOpen, id);
    }
}
function focusSelect(bool, id) {
    for(let triangle of triangles) {
        if(triangle.classList.contains(id)) {
            if(bool) {
                triangle.classList.add('rotated');
            }
            else {
                triangle.classList.remove('rotated');
            }
        }
        else triangle.classList.remove('rotated');
    }
    for(let input of inputs) {
        if(input.id === id) {
            if(bool) {
                input.classList.add('focused');
            }
            else {
                input.classList.remove('focused');
            }
        }
        else input.classList.remove('focused');
    }
}
function selectionHandler(e) {
    let name = e.target.attributes.name.nodeValue;
    let field = document.getElementById(name);
    field.innerText = e.target.innerText;
    localStorage[name] = JSON.stringify(e.target.innerText);
    e.target.parentNode.style.display = 'none';
}
function saveOnChange(e) {
    let v = e.target.value;
    let fieldName = e.target.id;
    localStorage[fieldName] = JSON.stringify(v);
}
function drawFields(fields, options) {
    for(let f of fields) {
        let fieldName = f.id;
        let v;
        try {
            v = JSON.parse(localStorage[fieldName]);
        } catch {
            v = '';
        }
        if(v !=  null) 
            if(f.tagName === 'DIV') f.innerText = v;
            if(f.tagName === 'INPUT') f.value = v;
    }
}


let inputs = document.querySelectorAll('.settings__input-element');
let options = document.querySelectorAll('.option');
let dropdowns = document.querySelectorAll('.dropdown');
let triangles = document.querySelectorAll('.settings__img');
let dropdownOpen = false;

document.body.addEventListener('click', (e) =>{
    let contains = e.target.classList.contains('settings__input-element')
        || e.target.classList.contains('select')
        || e.target.classList.contains('dropdown');
    if (!contains) {
        for(let drop of dropdowns) {
            drop.style.display = 'none';
            dropdownOpen = false;
            focusSelect(dropdownOpen);
        }
    }
})
for(let i of inputs) {
    let bool = false;
    i.addEventListener('click', openDropdownHandler);
    if(i.tagName === 'INPUT') i.addEventListener('change', saveOnChange);
}
for(let option of options) {
    option.addEventListener('click', selectionHandler);
}
drawFields(inputs, options);


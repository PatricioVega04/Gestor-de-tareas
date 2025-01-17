const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#listaTareas');
const input = document.querySelector('#input');
const btnAgregar = document.querySelector('#btn-agregar');
const elemento = document.querySelector('#elemento');
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id;
let list = [];

function guardarDatos(){
    localStorage.setItem('TODO', JSON.stringify(list))
}

function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) {return}

    const REALIZADO = realizado ? check : uncheck;

    const LINE = realizado ? lineThrough: ''

    //const ELIMINADO = eliminado ? 'none' : 'block';

    const elemento = `<li id="elemnto">
                    <i class="far ${REALIZADO}" id="${id}" data="realizado"></i>
                    <p class="text ${LINE}" >${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}""></i>
                    </li>
                   `
    lista.insertAdjacentHTML("beforeend", elemento)

}

btnAgregar.addEventListener('click', () => {
    const tarea = input.value;

    if (!tarea.trim()) {
        console.log('La tarea está vacía');
        return;
    }
    
    agregarTarea(tarea, id, false, false)
    list.push({
          nombre: tarea,
          id: id,
          realizado: false,
          eliminado: false
        })
     guardarDatos()
     input.value = ' '
     id++
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const tarea = input.value;
        if (!tarea.trim()) {
            console.log('La tarea está vacía');
            return;
        }
        agregarTarea(tarea, id, false, false)
        list.push({
              nombre: tarea,
              id: id,
              realizado: false,
              eliminado: false})
        guardarDatos()
        input.value = ' '
        id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.getAttribute('data');
    
    
    if (elementData === 'realizado')
        {
        tareaRealizada(element)
        }
        else if (elementData === 'eliminado'){
            tareaEliminada(element)
        }
     guardarDatos()
})

function tareaRealizada(element)
{
element.classList.toggle(check);
element.classList.toggle(uncheck);
element.parentNode.querySelector('.text').classList.toggle(lineThrough);
list[element.id].realizado =list[element.id].realizado ? false : true;
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    list[element.id].eliminado = true;
    console.log(list)
}

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {weekday: 'long',month: 'long', day: 'numeric'})

let data = localStorage.getItem('TODO')
if (data){
    list = JSON.parse(data)
    console.log(list)
    id = list.length
    cargarLista(list)}

else
{
    list = []
    id = 0
}

function cargarLista(DATA){
   DATA.forEach(function(item)
{
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
})
}
const usernameInput = document.getElementById('username');
        const enterButton = document.getElementById('enterButton');
        const textArea = document.getElementById('textArea');
        const userNameDisplay = document.getElementById('userName');
        const saveButton = document.getElementById('saveButton');
        const savedText = document.getElementById('savedText');
        const userText = document.getElementById('userText');
        const deleteNameButton = document.getElementById('deleteNameButton');
      
      
        const storedName = localStorage.getItem('username');
        const storedText = localStorage.getItem('savedText');
        if (storedName) {
            document.getElementById('greeting').textContent = `Bienvenido de nuevo, ${storedName}`;
            document.getElementById('loginSection').style.display = 'none';
            textArea.style.display = 'block';
            userNameDisplay.textContent = storedName;
        }
        if (storedText) {
            savedText.textContent = storedText;
        }

        

       
        saveButton.addEventListener('click', () => {
            const text = userText.value.trim();
            if (text) {
                localStorage.setItem('savedText', text);
                savedText.textContent = text;
            }
        });

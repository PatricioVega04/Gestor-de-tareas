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
const nombreUsuario = document.getElementById('username');
const botonEntrar = document.getElementById('enterButton');
const areaTexto = document.getElementById('textArea');
const mostrarNombreUsuario = document.getElementById('userName');
const botonGuardar = document.getElementById('saveButton');
const textoGuardado = document.getElementById('savedText');
const textoUsuario = document.getElementById('userText');
const botonBorrarNombre = document.getElementById('deleteNameButton');

const nombreAlmacenado = localStorage.getItem('username');
const textoAlmacenado = localStorage.getItem('savedText');

if (nombreAlmacenado) {
    document.getElementById('greeting').textContent = `Bienvenido de nuevo, ${nombreAlmacenado}`;
    document.getElementById('loginSection').style.display = 'none';
    areaTexto.style.display = 'block';
    mostrarNombreUsuario.textContent = nombreAlmacenado;
}
if (textoAlmacenado) {
    textoGuardado.textContent = textoAlmacenado;
}

botonEntrar.addEventListener('click', () => {
    const nombre = nombreUsuario.value.trim();
    if (nombre) {
        localStorage.setItem('username', nombre);
        document.getElementById('greeting').textContent = `Bienvenido, ${nombre}`;
        document.getElementById('loginSection').style.display = 'none';
        areaTexto.style.display = 'block';
        mostrarNombreUsuario.textContent = nombre;
    }
});

botonGuardar.addEventListener('click', () => {
    const texto = textoUsuario.value.trim();
    if (texto) {
        localStorage.setItem('savedText', texto);
        textoGuardado.textContent = texto;
    }
});

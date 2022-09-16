let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarProducto(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click',(evento) => actualizarProducto(evento) )

let producto = document.getElementById('nombre-producto')
let cantidad = document.getElementById('cantidad')
let categoria = document.getElementById('categoria')
let fecha = document.getElementById('fecha')
let contenedor = document.getElementById ('lista')
let productoEnEdicion 



let nombres =[]

function agregarProducto(evento) {
    evento.preventDefault()

    
    const nombre = {
        producto: producto.value,
        cantidad: cantidad.value,
        categoria: categoria.value,
        fecha: fecha.value
    }

    
 nombres.push(nombre)

 guardarEnLS()
 mostrarProductos()
 limpiarInput()
}

function editarProducto(boton, item) {
    productoEnEdicion = nombres.find(nombre=> nombre.producto == item)
    console.log(boton)
    console.log(productoEnEdicion)
    producto.value = productoEnEdicion.producto
    cantidad.value = productoEnEdicion.cantidad
    categoria.value = productoEnEdicion.categoria
    fecha.value = productoEnEdicion.fecha
   
    botonActualizar.classList.remove('d-none')
    botonAgregar.classList.add('d-none')
    
}

function actualizarProducto(){
    console.log(productoEnEdicion)
    let nuevoProducto = {
        
            producto: producto.value,
            cantidad: cantidad.value,
            categoria: categoria.value,
            fecha: fecha.value
        }
console.log(nuevoProducto)
let indice = nombres.findIndex(nombre=> nombre.producto == productoEnEdicion.producto)
nombres.splice(indice,1,nuevoProducto)
    
    botonActualizar.classList.add('d-none')
    botonAgregar.classList.remove('d-none')
    guardarEnLS()
    mostrarProductos()
    limpiarInput()
}

function eliminarProducto(boton, producto) {
    boton.parentElement.parentElement.remove()
    
    nombres = nombres.filter((nombre) => nombre.producto !== producto)
    
    guardarEnLS()

}

function leerProductos() {
   let nombresEnLS = window.localStorage.getItem('nombres')
   if(nombresEnLS === null) {
    nombres = []
   }else  nombres = JSON.parse(nombresEnLS)
   

   mostrarProductos()
  
}
function limpiarInput() {
    producto.value = ''
    cantidad.value = ''
    categoria.value = ''
}

function mostrarProductos() {
    contenedor.innerHTML = ''

    let categorias =[]
    nombres.forEach(nombre=>{
        
        if(!categorias.includes(nombre.categoria)){
            categorias.push(nombre.categoria)
        }
    })

    categorias.forEach (cat =>{
        contenedor.innerHTML += `
        <div class="categoria" id="${cat}"> 
        <h3>${cat}</h3>
        </div>
        `
        let filtrados = nombres.filter(nombre=>nombre.categoria == cat) 
        
        let contenedorCategoria = document.getElementById(cat)
        
        filtrados.forEach(nombre =>{
            contenedorCategoria.innerHTML +=  ` 
            <article class="d-flex mb-1">
            <div class="card d-flex flex-row ">
            <p class="me-5 ms-5">${nombre.producto}</p>
            <p class="me-5">${nombre.cantidad}</p>
            <p class="me-5">${nombre.categoria}</p>
    
            <p class="me-5">${nombre.fecha}</p>
            </div>
            <div class="d-flex flex-row">
            <button class="btn btn-dark" onClick="editarProducto(this,'${nombre.producto}')"> Editar </button>
            <button class="btn btn-dark" onClick="eliminarProducto(this,'${nombre.producto}')">Borrar </button>
             </div>
        </article>
    
            ` 

        } )

    } )

 }

function guardarEnLS() {
        let arrayConvertidoAString = JSON.stringify(nombres)
    window.localStorage.setItem('nombres',arrayConvertidoAString)

}

leerProductos();
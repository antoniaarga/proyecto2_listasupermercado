let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarProducto(evento))

let producto = document.getElementById('nombre-producto')
let cantidad = document.getElementById('cantidad')
let categoria = document.getElementById('categoria')
let fecha = document.getElementById('fecha')
let = contenedor = document.getElementById ('lista')

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

function editarProducto(boton, producto) {
    // let productoEnEdicion = nombres.find(nombres=> nombre.product == nombre)
    
}

function eliminarProducto(boton, producto) {
    boton.parentElement.parentElement.remove()
    console.log(producto)
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
    nombres.forEach((nombre) =>{
        
        contenedor.innerHTML +=  ` 
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
    })
 }

function guardarEnLS() {
        let arrayConvertidoAString = JSON.stringify(nombres)
    window.localStorage.setItem('nombres',arrayConvertidoAString)

}

leerProductos()
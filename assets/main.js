let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarProducto(evento))

let producto = document.getElementById('nombre-producto')
let cantidad = document.getElementById('cantidad')
let categoria = document.getElementById('categoria')
let = contenedor = document.getElementById ('lista')

let nombres =[]

function agregarProducto(evento) {
    evento.preventDefault()

    
    const nombre = {
        producto: producto.value,
        cantidad: cantidad.value,
        categoria:categoria.value

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
        <article>
        <div>
        <p>${nombre.producto}</p>
        <p>${nombre.cantidad}</p>
        <p>${nombre.categoria}</p>
        </div>
        <div>
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
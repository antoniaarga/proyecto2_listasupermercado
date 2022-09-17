let botonAgregar = document.getElementById('agregar')
botonAgregar.addEventListener('click', (evento) => agregarProducto(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click',(evento) => actualizarProducto(evento) )

let producto = document.getElementById('nombre-producto')
let cantidad = document.getElementById('cantidad')
let categoria = document.getElementById('categoria')

let contenedor = document.getElementById ('lista')
let productoEnEdicion 

let nombres =[]

function agregarProducto(evento) {
    evento.preventDefault()

    const nombre = {
        producto: producto.value,
        cantidad: cantidad.value,
        categoria: categoria.value,
        
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
    
   
    botonActualizar.classList.remove('d-none')
    botonAgregar.classList.add('d-none')  
}

function actualizarProducto(){
    console.log(productoEnEdicion)
    let nuevoProducto = {
        
            producto: producto.value,
            cantidad: cantidad.value,
            categoria: categoria.value,
            
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
   console.log(nombresEnLS)
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
        <h5>${cat}</h5>
        </div>
        `
        let filtrados = nombres.filter(nombre=>nombre.categoria == cat) 
        
        let contenedorCategoria = document.getElementById(cat)
        
        filtrados.forEach(nombre =>{
            
            contenedorCategoria.innerHTML +=  ` 
         <article class="card  mb-1 d-flex ">
             <div class="d-flex  justify-content-around align-items-center">

             
                    <div class="d-flex justify-content-around ">
                    <p class="nombre-producto  ">${nombre.producto}</p>
                    </div>
                   
                    <div class="d-flex  justify-content-around ">
                    <p class="nombre-cantidad ms-4 me-4  text-secondary">${nombre.cantidad}</p>
                    </div>
            

                    <div class="d-flex justify-content-around ">
                    <button class="boton btn btn-dark me-1 " onClick="editarProducto(this,'${nombre.producto}')"> <i class="fa-regular fa-pen-to-square edit "></i> </button>
                    <button class="boton btn btn-dark" onClick="eliminarProducto(this,'${nombre.producto}')"><i class="fa-regular fa-trash-can delete"></i></button>
                    </div>
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
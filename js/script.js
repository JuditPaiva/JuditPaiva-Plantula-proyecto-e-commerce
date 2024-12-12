const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});
cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

// // --------------------------------

// -----------------------------------------
// // // Json

// const productos = [
//   {
//     id: 1,
//     nombre: "Croton",
//     precio: 400,
//     imagen: "card-1.com.png",
//     descripcion:
//       "Estas plantas son originarias principalmente del sur de la India,",
//     categoria: "Interior",
//     stock: 15,
//   },

//   {
//     id: 2,
//     nombre: "Cactus",
//     precio: 500,
//     imagen: "card-2.com.png",
//     descripcion:
//       "Los cactus son plantas que se caracterizan por soportar temperaturas y almacenar agua",
//     categoria: "Exterior",
//     stock: 7,
//   },

//   {
//     id: 3,
//     nombre: "Violeta",
//     precio: 850,
//     imagen: "card-3.com.png",
//     descripcion:
//       "Estas son ideales para dar vida a cualquier rincón de tu hogar.",
//     categoria: "Exterior",
//     stock: 20,
//   },

//   {
//     id: 4,
//     nombre: "Dieffenbachia",
//     precio: 900,
//     imagen: "card-4.com.png",
//     descripcion: "La diefembaquia es una especie nativa del sur de México,",
//     categoria: "Interior",
//     stock: 50,
//   },

//   {
//     id: 5,
//     nombre: "violeta de los alpes",
//     precio: 500,
//     imagen: "card-5.com.png",
//     descripcion:
//       "Esta planta brota en otoño y florece durante el invierno y la primavera",
//     categoria: "Exterior",
//     stock: 5,
//   },

//   {
//     id: 6,
//     nombre: "potus",
//     precio: 2000,
//     imagen: "card-6.com.png",
//     descripcion:
//       "Planta de interior que se caracteriza por su follaje variegado",
//     categoria: "Interior",
//     stock: 21,
//   },

//   {
//     id: 7,
//     nombre: "Suculentas",
//     precio: 1000,
//     imagen: "card-7.com.png",
//     descripcion:
//       "Las suculentas son plantas que se adaptan a diferentes climas",
//     categoria: "Exterior",
//     stock: 15,
//   },

//   {
//     id: 8,
//     nombre: "hortensias",
//     precio: 4000,
//     imagen: "card-8.com.png",
//     descripcion: "Plantas ornamentales nativas del sur y este de Asia",
//     categoria: "Exterior",
//     stock: 12,
//   },

//   {
//     id: 9,
//     nombre: "jazmin",
//     precio: 3000,
//     imagen: "card-9.com.png",
//     descripcion: "Árbol es nativo del oeste de África.",
//     categoria: "Exterior",
//     stock: 20,
//   },
// ];

// ------------


// ------------

  


let productos = [];  

// Función para cargar productos desde JSON  
async function cargarProductos() {  
  try {  
    const response = await fetch("productos.json");  
    if (!response.ok) throw new Error("Error al cargar los productos");  

    productos = await response.json();  
    guardarProductosEnStorage(); // Guarda los productos en localStorage  
    mostrarProductos(); // Llama a la función para mostrar productos  
  } catch (error) {  
    console.error("Error:", error);  
  }  
}  

// Función para guardar los productos en localStorage  
function guardarProductosEnStorage() {  
  localStorage.setItem("productos", JSON.stringify(productos));  
}  

// Función para mostrar productos en las tarjetas  
function mostrarProductos() {  
  productos.forEach((producto) => {  
    agregarContenido(`card-${producto.id}`, producto);  
  });  
}  

// Llamar a la función de carga de productos al cargar la página  
document.addEventListener("DOMContentLoaded", () => {  
  cargarProductos(); // Cargar productos desde el JSON  
  mostrarCarrito(); // Mostrar el carrito  
});  

// Función para agregar contenido a un artículo específico  
function agregarContenido(articuloId, producto) {  
  const articulo = document.getElementById(articuloId);  

  // Agregar contenido al artículo sin el input de cantidad  
  articulo.innerHTML = `  
      <figure>  
        <img src="./img/${producto.imagen}" alt="${producto.nombre}" />           
      </figure>   
      <h3 class="subtitulo-card">${producto.nombre}</h3>  
      <p class="descripcion-card">${producto.descripcion}</p>  
      <p class="precio-producto-card">Precio: $${producto.precio.toFixed(2)}</p>  
      <button class="boton-productos" data-id="${producto.id}">Añadir al carrito</button>  
  `;  

  // Añadir evento al botón de añadir al carrito  
  const button = articulo.querySelector('.boton-productos');  
  button.addEventListener('click', () => {  
    agregarAlCarrito(producto); // Agregar el producto al carrito al hacer clic  
  });  
}  

// ---------------


let cantidadProductos = 0;  

function agregarAlCarrito() {  
    cantidadProductos++;  
    document.querySelector('.indice-carrito').textContent = cantidadProductos;  
}  

// ------------  

// Al cargar la página, mostrar el carrito  
window.onload = mostrarCarrito;  

// Función para agregar un producto al carrito  
function agregarAlCarrito(producto) {  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];  
    
    // Crear una copia del producto con cantidad 1  
    const productoConCantidad = { ...producto, cantidad: 1 };   
    
    const productoExistente = carrito.find(item => item.id === producto.id);  
    
    if (productoExistente) {  
        productoExistente.cantidad += 1; // Aumentar la cantidad si ya existe  
    } else {  
        carrito.push(productoConCantidad); // Agregar nuevo producto si no existe  
    }  
    
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage  
    mostrarCarrito(); // Actualizar la vista del carrito  
}  

// Función para mostrar el carrito  
function mostrarCarrito() {  
    const cartList = document.getElementById('carro-container');  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener el carrito  

    cartList.innerHTML = ''; // Limpiar el contenedor  

    let totalCantidad = 0;  
    let subtotal = 0;  

    if (carrito.length === 0) {  
        cartList.innerHTML = '<p class= "error-carrito">El carrito está vacío.</p>';  
        actualizarResumen(0, 0);  
        return;   
    }  

    carrito.forEach(producto => {  
        const article = document.createElement('article'); // Crear un artículo para cada producto  
        article.className = 'articulo'; // Agregar clase para estilización  
        
        // Crear el HTML para cada artículo  
        article.innerHTML = `  
            <div class= "articulo-container"> 
            <label for="cantidad-${producto.id}">Cantidad</label>  
             <input type="number" name="cantidad" id="cantidad-${producto.id}" value="${producto.cantidad}" min="1" onchange="actualizarCantidad('${producto.id}', this.value)"> 
                <figure class="art-img">  
                    <img src="./img/${producto.imagen}" alt="${producto.nombre}">  
                </figure>  
                <div class="detalle">  
                    <h4>${producto.nombre}</h4>  
                    <p class="art-descripcion">${producto.descripcion}</p>  
                    <p class="art-precio">$${producto.precio.toFixed(2)}</p>     
                </div>  
                <div class="cancel">  
                    <button class="remove" data-id="${producto.id}"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0m-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5zm-3.841 26.147a4.75 4.75 0 0 0 4.733 4.353h11.216a4.75 4.75 0 0 0 4.734-4.353L36.324 13.5H11.676zM21.5 20.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0zM27.75 19c.69 0 1.25.56 1.25 1.25v14.5a1.25 1.25 0 1 1-2.5 0v-14.5c0-.69.56-1.25 1.25-1.25"/></svg></button>  
                </div>  
            </div>  
        `;  
        
        cartList.appendChild(article); // Añadir el artículo al contenedor  

        totalCantidad += producto.cantidad;  
        subtotal += producto.precio * producto.cantidad;  
        
        // Asignar evento de clic al botón de eliminar  
        article.querySelector('.remove').addEventListener('click', function() {  
            eliminarDelCarrito(producto.id); // Eliminar producto al hacer clic  
        });  
    });  

    actualizarResumen(totalCantidad, subtotal); // actualizar el resumen después de mostrar los artículos  
}  

// Función para eliminar un producto del carrito  
function eliminarDelCarrito(productId) {  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  
    carrito = carrito.filter(producto => producto.id !== productId); // Filtrar el carrito  
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado  
    mostrarCarrito(); // Mostrar el carrito actualizado  
}  

// Función para actualizar la cantidad de productos  
function actualizarCantidad(productId, cantidad) {  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  
    const producto = carrito.find(item => item.id === productId);  
    if (producto) {  
        producto.cantidad = parseInt(cantidad); // Actualizar cantidad  
        if (producto.cantidad <= 0) {  
            eliminarDelCarrito(productId); // Si la cantidad es 0, eliminar el producto  
        } else {  
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito  
            mostrarCarrito(); // Mostrar el carrito actualizado  
        }  
    }  
}  

// Función para actualizar el resumen del carrito  
function actualizarResumen(totalCantidad, subtotal) {  
    document.getElementById('cantidad-productos').textContent = `${totalCantidad} unidades`;  
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;  
    const envio = subtotal > 0 ? 2500 : 0; // Ejemplo de envío: cuesta \$2500 si hay productos  
    document.getElementById('envio').textContent = `$${envio}`;  
    const total = subtotal + envio;   
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;  
}  
// -------------------


function validateForm() {  
  // Limpiar mensajes de error  
  clearErrors();  

  const nombre = document.getElementById('nombre').value;  
  const apellido = document.getElementById('apellido').value;  
  const email = document.getElementById('mail').value;  
  const comentario = document.getElementById('textarea').value;  

  let isValid = true;  
  
  // Validar nombre  
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nombre) || nombre.trim() === '') {  
      document.getElementById('nombreError').textContent = 'Por favor, ingresa un nombre válido (solo letras).';  
      isValid = false;  
  }  

  // Validar apellido  
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(apellido) || apellido.trim() === '') {  
      document.getElementById('apellidoError').textContent = 'Por favor, ingresa un apellido válido (solo letras).';  
      isValid = false;  
  }  

  // Validar email  
  if (!validateEmail(email)) {  
      document.getElementById('emailError').textContent = 'Por favor, ingresa un email válido.';  
      isValid = false;  
  }  

  // Validar comentario  
  if (comentario.length <= 5) {  
      document.getElementById('comentarioError').textContent = 'El comentario debe tener más de 5 caracteres.';  
      isValid = false;  
  }  

  return isValid; // Permite el envío del formulario si todas las validaciones pasan  
}  

function validateEmail(email) {  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar emails  
  return re.test(String(email).toLowerCase());  
}  

function clearErrors() {  
  document.getElementById('nombreError').textContent = '';  
  document.getElementById('apellidoError').textContent = '';  
  document.getElementById('emailError').textContent = '';  
  document.getElementById('comentarioError').textContent = '';  
}  

// Nueva función para limpiar el mensaje de error de un campo específico al hacer clic  
function clearError(errorId) {  
  document.getElementById(errorId).textContent = '';  
}  
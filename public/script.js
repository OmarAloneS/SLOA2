// Seleccionamos los elementos del Modelo de los Objetos del Documento
const listaProductos = document.getElementById('productos');
const formularioProducto = document.getElementById('formulario-producto');

// Función para cargar y mostrar los productos
function cargarProductos() {
    fetch('/producto') 
        .then(response => response.json())
        .then(productos => {
            listaProductos.innerHTML = ''; // Limpiamos la lista antes de mostrar productos
            productos.forEach(producto => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span><strong>${producto.nombre}</strong> - $${producto.precio}</span>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                `;
                listaProductos.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

// Función para agregar un producto
formularioProducto.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe por defecto
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const nuevoProducto = { nombre, precio: parseFloat(precio) };
    
    fetch('/producto', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => response.json())
    .then(() => {
        cargarProductos(); // Recargamos la lista de productos
        formularioProducto.reset(); // Limpiamos el formulario
    })
    .catch(error => console.error('Error al agregar producto:', error));
});

// Función para eliminar un producto
function eliminarProducto(id) {
    fetch(`/producto/${id}`, { 
        method: 'DELETE'
    })
    .then(() => cargarProductos()) // Volvemos a cargar los productos después de eliminar
    .catch(error => console.error('Error al eliminar producto:', error));
}

// Cargar los productos al iniciar la página
cargarProductos();

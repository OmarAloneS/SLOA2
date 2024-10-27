// Importamos la librería Express
const express = require('express');
// Creamos la aplicación Express
const app = express();
// Definimos el puerto en el que escuchará nuestro servidor
const puerto = 3000;
// Middleware para manejar datos en formato JSON
app.use(express.json());
app.use(express.static('public')); // Sirve los archivos estáticos (HTML, CSS, JS)

// Ruta básica de bienvenida
app.get('/', (req, res) => {
 res.send('Bienvenido a la API de E-commerce');
});

// Simulamos una base de datos con un array
let producto = [
    { id: 1, nombre: 'Camiseta', precio: 20.00 },
    { id: 2, nombre: 'Pantalón', precio: 35.00 }
];
// Obtener todos los productos
app.get('/producto', (req, res) => {
    res.json(producto);
});
// Crear un nuevo producto
app.post('/producto', (req, res) => {
    const nuevoProducto = req.body; // El producto nuevo viene en el cuerpo de la solicitud
    nuevoProducto.id = producto.length + 1; // Asignamos un ID al producto
    producto.push(nuevoProducto); // Lo agregamos al array de productos
    res.status(201).json(nuevoProducto); // Respondemos con el producto creado
});
// Actualizar un producto
app.put('/producto/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtenemos el ID desde la URL
    const productoActualizado = req.body; // El producto actualizado viene en el cuerpo de la solicitud
    // Buscamos el producto en el array
    const index = producto.findIndex(p => p.id === id);
    if (index !== -1) {
    producto[index] = { id, ...productoActualizado }; // Actualizamos el producto
    res.json(producto[index]); // Devolvemos el producto actualizado
    } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});
// Eliminar un producto
app.delete('/producto/:id', (req, res) => {
    const id = parseInt(req.params.id);
   
    // Buscamos el índice del producto
    const index = producto.findIndex(p => p.id === id);
    if (index !== -1) {
    const productoEliminado = producto.splice(index, 1); // Eliminamos el producto
    res.json(productoEliminado[0]); // Devolvemos el producto eliminado
    } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});
// Iniciamos el servidor
app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});

app.use(express.json());
app.use(express.static('public')); // Sirve los archivos estáticos (HTML, CSS, JS)

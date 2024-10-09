const express = require('express')
const app = express();
const PORT = 3000;
 
app.use(express.json());
 
// Datos ficticios para estudiantes
let estudiantes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Mónica Gómez' },
    { id: 3, nombre: 'José Ruiz' }
];
 
// GET: Obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
    res.json(estudiantes);
});
 
// GET: Obtener un estudiante por ID
app.get('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = estudiantes.find(e => e.id === id);
    if (estudiante) {
        res.json(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
});
 
// POST: Crear un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre
    };
    estudiantes.push(nuevoEstudiante);
    res.status(201).json(nuevoEstudiante);
});
 
// PUT: Actualizar un estudiante por ID
app.put('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = estudiantes.find(e => e.id === id);
    if (estudiante) {
        estudiante.nombre = req.body.nombre;
        res.json(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
});
 
// DELETE: Eliminar un estudiante por ID
app.delete('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = estudiantes.findIndex(e => e.id === id);
    if (index !== -1) {
        estudiantes.splice(index, 1);
        res.send('Estudiante eliminado');
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
});
 
 
 
 
//Inicia el servidor
 
app.listen(PORT,() =>{
    console.log('Servidor corriendo en http://localhost:$PORT');
})
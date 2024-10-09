const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [
  { id: 1, title: "Comprar comida", completed: false },
  { id: 2, title: "Hacer ejercicio", completed: false },
  { id: 3, title: "Leer un libro", completed: false },
  { id: 4, title: "Programar una API", completed: true },
  { id: 5, title: "Limpiar la casa", completed: false }
];

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Todos');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get('/todos', (req, res) => {
    res.json(todos);
  });
  
  app.post('/todos', (req, res) => {
    const newTodo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: req.body.completed || false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });
  
  app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
  
    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    
    res.json(todo);
  });
  

  app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
  
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  
    todos.splice(todoIndex, 1);
    res.status(204).send();
  });
  
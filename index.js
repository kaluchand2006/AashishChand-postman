const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory array to store todos
let todos = [];
let nextId = 1;

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET a single todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const newTodo = { id: nextId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  const deleted = todos.splice(index, 1);
  res.json({ message: 'Todo deleted', todo: deleted[0] });
});

// Start server
app.listen(port, () => {
  console.log(`To-Do API running at http://localhost:${port}`);
});

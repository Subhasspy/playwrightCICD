const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/forms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forms.html'));
});

app.get('/api-demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-demo.html'));
});

// API endpoints
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Simple mock authentication
  if (username === 'testuser' && password === 'password123') {
    res.json({ success: true, message: 'Login successful', token: 'mock-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/users', (req, res) => {
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  setTimeout(() => res.json(users), 1000); // Simulate delay
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Simulate processing
  setTimeout(() => {
    res.json({ success: true, message: 'Message sent successfully' });
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
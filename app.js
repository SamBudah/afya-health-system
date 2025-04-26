const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./config/firebase');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.send('Afya Health System API is running');
});

// Import routes
const clientRoutes = require('./routes/clients');
const programRoutes = require('./routes/programs');
const enrollmentRoutes = require('./routes/enrollments');

// Use routes
app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/enrollments', enrollmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ====================================
  Afya Health System API
  ====================================
  Status:  Running
  Port:    ${PORT}
  Time:    ${new Date().toISOString()}
  ====================================
  `);
});
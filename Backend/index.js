require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/profile', require('./routes/profile'));
app.use('/forgot-password', require('./routes/forgotPassword'));
app.use('/reset-password', require('./routes/resetPassword'));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => console.error('MongoDB connection error:', err));

// Démarrage serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const express = require('express');
const session = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
require('./middleware/passportSetup'); // Passport config
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_SECRET]
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// In-memory stats storage
let statsData = [];

// Function to simulate processing stats
const processStats = () => {
  const newStat = {
    timestamp: new Date(),
    value: Math.random() * 100 // Simulating some random stat value
  };
  statsData.push(newStat); // Store it in memory
};

// Example interval for processing stats (every minute)
setInterval(processStats, 60000);

// Route to display stats
app.get('/stats', (req, res) => {
  res.json(statsData); // Return the in-memory stats data
});

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', authMiddleware, dashboardRoutes);
app.use('/admin', authMiddleware, adminRoutes);

// Static files for frontend
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

//package
// {
//   "name": "youtube-comment-analysis",
//   "version": "1.0.0",
//   "description": "YouTube channel comment analysis and recommendation system",
//   "main": "server.js",
//   "scripts": {
//     "build": "npm i",
//     "dev": "nodemon server.js"
//   },
//   "dependencies": {
//     "dotenv": "^16.0.3",
//     "express": "^4.18.2",
//     "passport": "^0.6.0",
//     "passport-google-oauth20": "^2.0.0",
//     "mongoose": "^6.10.0",
//     "cookie-session": "^2.0.0",
//     "axios": "^1.0.0"
//   }
// }

const express = require('express');
const app = express();
const port = 3000;

// Middleware to check if it's working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const hourOfDay = currentDate.getHours();

  // Check if it's Monday to Friday and between 9 AM and 5 PM
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Use the workingHoursMiddleware for all routes
app.use(workingHoursMiddleware);

// Set up static files (CSS, images)
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
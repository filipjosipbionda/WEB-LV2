const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root route - redirect to the gallery
app.get('/', (req, res) => {
  res.redirect('/slike');
});

// Gallery route - load images from the folder
app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`,
      largeUrl: `/images/${file}` // You can modify this if you have different sizes
    }));

  res.render('slike', { images });
});

// Alternative route - load images from JSON file
app.get('/slike-json', (req, res) => {
  const dataPath = path.join(__dirname, 'images.json');
  const images = JSON.parse(fs.readFileSync(dataPath));
  res.render('slike', { images });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
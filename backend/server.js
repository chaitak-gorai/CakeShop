const express = require('express');
const products = require('./data/products.js');
const app = express();
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(5000, () => console.log('Server started on port 5000'));

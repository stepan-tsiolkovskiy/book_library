import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

import bookCatalogController from './book/routes/book.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api', bookCatalogController);

const imagesDir = path.join(__dirname, '../images');

// Route to get image files
app.get('/api/images/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(imagesDir, filename));
});

app.get('/api', (req, res) => {
  res.send('Welcome to the API!');
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});

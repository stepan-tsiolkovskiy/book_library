import express from 'express';
import cors from 'cors';

import bookCatalogController from './book/routes/book.router.js';
import { serveImage } from './image/controllers/image.controller.js';

const app = express();

app.use(cors({ origin: process.env.DEVELOP_STAGING }));

app.use('/api', bookCatalogController);
app.use('/api/images/:filename', serveImage);

app.use('/api', (req, res) => {
  res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});

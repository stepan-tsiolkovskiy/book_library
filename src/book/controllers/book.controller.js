import {
  getBooksAll,
  getBookById,
  createBook,
  updateBook,
  deleteBookById,
} from '../services/book.service.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const getAllController = async (req, res) => {
  try {
    const page = req.query.page;
    const books = req.query.books;
    const searchQuery = req.query.search;
    const booksCatalogData = await getBooksAll(page, books, searchQuery);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const imagePath = path.join(
      __dirname,
      '../../../',
      'images',
      'default.png'
    );
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Замініть image посиланням на base64-представлення зображення
    const booksWithBase64Image = booksCatalogData.map((book) => ({
      ...book,
      image: `data:image/png;base64,${base64Image}`,
    }));

    res.json(booksWithBase64Image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const bookByIdData = await getBookById(id);
    res.json(bookByIdData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBookController = async (req, res) => {
  try {
    const { name, year } = req.body;
    let imagePath = 'images/default.png'; // Set default image path

    // Check if a file is uploaded
    if (req.file) {
      imagePath = req.file.path; // Use the uploaded image path
    }

    if (!name || !year) {
      res.sendStatus(422);
      return;
    }

    const book = await createBook(imagePath, name, year);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year } = req.body;

    console.log(`id===${id}`);

    const book = await getBookById(id);
    if (!book) {
      res.sendStatus(404);
      return;
    }

    if (typeof name !== 'string' || typeof year !== 'string') {
      res.sendStatus(422);
      return;
    }

    const updatedBook = updateBook({ id, name, year });
    res.status(201).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await deleteBookById(id);

    if (deletedCount === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

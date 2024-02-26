import {
  getBooksAll,
  getBookById,
  createBook,
  updateBook,
  deleteBookById,
} from '../services/book.service.js';

export const getAllController = async (req, res) => {
  try {
    const page = req.query.page;
    const books = req.query.books;
    const searchQuery = req.query.search;
    const booksCatalogData = await getBooksAll(page, books, searchQuery);

    res.json(booksCatalogData);
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
    let imagePath = 'images/default.png';

    if (req.file) {
      imagePath = req.file.path;
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

    let image = '';

    if (req.file) {
      image = req.file.path;
    }

    const book = await getBookById(id);

    if (!book) {
      res.sendStatus(404);
      return;
    }

    if (typeof name !== 'string' || typeof year !== 'string') {
      res.sendStatus(422);
      return;
    }

    const updatedBook = updateBook({ id, image, name, year });
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

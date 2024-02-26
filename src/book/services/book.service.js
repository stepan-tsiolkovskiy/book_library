import { Book } from '../models/book.model.js';

const getBooksAll = async () => {
  try {
    const result = await Book.findAll({
      order: [['createdAt']],
    });

    return result;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

const getBookById = async (id) => {
  return await Book.findByPk(id);
};

const createBook = async (image, name, year) => {
  return await Book.create({ image, name, year });
};

const updateBook = async ({ id, image, name, year }) => {
  return await Book.update({ image, name, year }, { where: { id } });
};

const deleteBookById = async (id) => {
  return await Book.destroy({ where: { id } });
};

export { getBooksAll, getBookById, createBook, updateBook, deleteBookById };

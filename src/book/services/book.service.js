import { Book } from '../models/book.model.js';
import { Op } from 'sequelize';
import { sequelize } from '../../db/db.js';

const getBooksAll = async (page, limit = 5, searchQuery) => {
  const offset = (page - 1) * limit;
  const whereCondition = searchQuery
    ? sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {
        [Op.like]: '%' + searchQuery.toLowerCase() + '%',
      })
    : {};

  try {
    const result = await Book.findAll({
      limit,
      offset,
      where: whereCondition,
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

const updateBook = async ({ id, name, year }) => {
  return await Book.update({ name, year }, { where: { id } });
};

const deleteBookById = async (id) => {
  return await Book.destroy({ where: { id } });
};

export { getBooksAll, getBookById, createBook, updateBook, deleteBookById };

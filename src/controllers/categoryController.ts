import { Request, Response } from 'express';
import { Category } from '../models';

const getCategories = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;

  try {
    const [total, categories] = await Promise.all([
      Category.count({ status: true }),
      Category.find({ status: true }, '', {
        populate: { path: 'User', select: 'name' },
        skip: Number(from),
        limit: Number(limit),
      }),
    ]);

    res.status(200).json({
      total,
      categories,
    });
  } catch (err) {
    console.error(err);
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate('User', 'name');

    res.status(200).json({
      category,
    });
  } catch (err) {
    console.error(err);
  }
};

const createCategory = async (req: Request, res: Response) => {
  const name = req.body.name.toUpperCase();

  const isExistCategoryInDB = await Category.findOne({ name });

  if (isExistCategoryInDB) {
    return res.status(400).json({
      msg: `La categoria ${isExistCategoryInDB.name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json(category);
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { status, user, ...data } = req.body;

  try {
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json({
      msg: 'Put- API - Controllador',
      category,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
      msg: 'Delete- API - Controllador',
      id,
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
};

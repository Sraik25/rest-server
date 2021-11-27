import { Request, Response } from 'express';
import { ProductDto } from '../dtos/productDto';
import { Product } from '../models';

const getProducts = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;

  try {
    const [total, produts] = await Promise.all([
      Product.count({ status: true }),
      Product.find({ status: true }, '', {
        populate: [
          { path: 'User', select: 'name' },
          { path: 'Category', select: 'name' },
        ],
        skip: Number(from),
        limit: Number(limit),
      }),
    ]);

    res.status(200).json({
      total,
      produts,
    });
  } catch (err) {
    console.error(err);
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Product.findById(id)
      .populate('User', 'name')
      .populate('Category', 'name');

    res.status(200).json({
      category,
    });
  } catch (err) {
    console.error(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  const { name, status, user, ...rest } = <ProductDto>req.body;

  const isExistProductInDB = await Product.findOne({ name });

  if (isExistProductInDB) {
    return res.status(400).json({
      msg: `El producto ${isExistProductInDB.name} ya existe`,
    });
  }

  const data = {
    ...rest,
    name: name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { status, ...rest } = <ProductDto>req.body;

  try {
    if (rest.name) {
      rest.name = rest.name.toUpperCase();
    }
    rest.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, rest, { new: true });

    res.json({
      msg: 'Put- API - Controllador',
      product,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productDelete = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    res.json({
      msg: 'Delete- API - Controllador',
      productDelete,
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
};

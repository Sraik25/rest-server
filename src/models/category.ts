import { Document, model, Schema } from 'mongoose';
import { CategoryDto } from '../dtos/categoryDto';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export default model<CategoryDto & Document>('Category', CategorySchema);

import { ObjectId } from 'mongoose';

export interface ProductDto {
  name: string;
  status: boolean;
  user: ObjectId;
  price: number;
  category: ObjectId;
  description: string;
  available: boolean;
}

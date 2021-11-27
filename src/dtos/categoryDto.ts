import { ObjectId } from "mongoose";

export interface CategoryDto {
  name: string;
  status: boolean;
  user: ObjectId;
}

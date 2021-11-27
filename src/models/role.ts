import { Document, model, Schema } from 'mongoose';
import { RoleDto } from '../dtos/roleDto';

const RoleSchema = new Schema<RoleDto>({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
  },
});

export default model<RoleDto & Document>('Roles', RoleSchema);

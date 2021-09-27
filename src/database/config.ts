import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URL;

const dbConecction = async () => {
  try {
    await mongoose.connect(url ?? '');

    console.log(`Database connected`);
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la bases de datos');
  }
};

export { dbConecction };

import express, { Express } from 'express';
import cors from 'cors';

import { dbConecction } from '../database/config';

class Server {
  app: Express;
  port: number;
  paths: {
    auth: string;
    users: string;
    categories: string;
    products: string;
  };

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
    };

    // database
    this.database();

    // Middleware
    this.middleware();

    // Rutes
    this.routes();
  }

  async database() {
    await dbConecction();
  }

  middleware() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('src/public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/user'));
    this.app.use(this.paths.categories, require('../routes/category'));
    this.app.use(this.paths.products, require('../routes/product'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on http://localhost:${this.port}`);
      console.log(this.port);
    });
  }
}

export default Server;

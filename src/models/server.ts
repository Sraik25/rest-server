import express, { Express } from 'express';
import cors from 'cors';
import users from '../routes/user';

class Server {
  app: Express;
  port: number;
  userRoutePath: string;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    this.userRoutePath = '/api/users';

    // Middleware
    this.middleware();

    // Rutes
    this.routes();
  }

  middleware() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('src/public'));
  }

  routes() {
    this.app.use(this.userRoutePath, users);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on http://localhost:${this.port}`);
      console.log(this.port);
    });
  }
}

export default Server;

import { User } from 'src/schemas/User.schema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

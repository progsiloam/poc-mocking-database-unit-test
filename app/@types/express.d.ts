import 'express';
import { UserData } from '../types/auth.type';

declare module 'express' {
  interface Request {
    user?: UserData;
  }
}

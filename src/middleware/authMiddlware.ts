import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyAccessToken } from '../utils/tokenutils';

dotenv.config();

interface UserInterface {
  // Define the structure of your decoded user data here
  id: string;
  email: string;
  password:string;
}

interface RequestWithUser extends Request {
  user?: UserInterface; // Optional user property
}

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user  = decoded as UserInterface; // Add decoded user info to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

export default authMiddleware;
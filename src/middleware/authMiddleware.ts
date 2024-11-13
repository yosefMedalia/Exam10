import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401); 

  // אימות הטוקן
  jwt.verify(token, process.env.JWT_SECRET || '', (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user; 
    next();
  });
};

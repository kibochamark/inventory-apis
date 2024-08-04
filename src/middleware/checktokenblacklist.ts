import { getTokenBlacklist, getUser } from '../drizzle/authFunctions';
import express from 'express';
import { getPayloadFromToken } from '../utils/tokenutils';

const checkTokenBlacklist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token missing or malformed' });
    }

    try{

        const userpayload = await getPayloadFromToken(authHeader);
        const user = await getTokenBlacklist(userpayload?.id)

        if (user && user[0]?.blacklisted) {
            return res.status(403).json({ message: 'Token is blacklisted' });
        }
    
        next();
    }catch (err) {
        res.status(403).json({ message: 'Invalid or expired access token' });
      }

};

export default checkTokenBlacklist;
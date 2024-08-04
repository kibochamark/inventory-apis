import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const generateTokens = (user: { email: string; id: number; username:string; }) => {
    const accessToken = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, {
        expiresIn: '1h'
    });

    const refreshToken = jwt.sign({ id: user.id, email: user.email, username: user.username }, REFRESH_SECRET, {
        expiresIn: '7d'
    });

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
};

export const generateRefreshToken = (user: { id: any; email: any; username:string }) => {
    return jwt.sign({ id: user.id, email: user.email, username:user.username }, REFRESH_SECRET, { expiresIn: '7d' });
};







export const getPayloadFromToken = (authHeader: string): JwtPayload | null => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Invalid or missing authorization header');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
};
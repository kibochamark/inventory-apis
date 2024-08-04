import checkTokenBlacklist from '../middleware/checktokenblacklist';
import { loginUser, logout, registerUser } from '../controllers/auth';
import express from 'express';
import authMiddleware from '../middleware/authMiddlware';


const routes = express.Router();


// // auth user

// routes.get("/getusers", authenticateJWT, getusers)
routes.post("/registeruser", registerUser )
routes.post("/login",loginUser)
routes.get("/logout", authMiddleware, checkTokenBlacklist, logout)

export default routes;
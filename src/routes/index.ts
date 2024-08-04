import checkTokenBlacklist from '../middleware/checktokenblacklist';
import { loginUser, logout, registerUser } from '../controllers/auth';
import express from 'express';
import authMiddleware from '../middleware/authMiddlware';
import { insertCategory, putCategory, removeCategory, retrieveCategories, retrieveCategory, retrieveInventoriesCountByCategory } from '../controllers/category';
import { InsertInventory, putInventory, removeInvetory, retrieveInventories, retrieveInventory } from '../controllers/inventory';


const routes = express.Router();


// // auth user
routes.post("/registeruser", registerUser )
routes.post("/login",loginUser)
routes.get("/logout", authMiddleware, checkTokenBlacklist, logout)

// category
routes.post("/createcategory", authMiddleware, checkTokenBlacklist, insertCategory )
routes.patch("/updatecategory/:id",authMiddleware, checkTokenBlacklist, putCategory)
routes.get("/getcategory/:id",authMiddleware, checkTokenBlacklist, retrieveCategory)
routes.get("/getcategories",authMiddleware, checkTokenBlacklist, retrieveCategories)
routes.get("/getinventoriescountbycategory",authMiddleware, checkTokenBlacklist, retrieveInventoriesCountByCategory)
routes.delete("/deletecategory/:id",authMiddleware, checkTokenBlacklist, removeCategory)

// inventories
routes.post("/createinventory", authMiddleware, checkTokenBlacklist, InsertInventory)
routes.patch("/updateinventory/:id",authMiddleware, checkTokenBlacklist, putInventory)
routes.get("/getinventory/:id",authMiddleware, checkTokenBlacklist, retrieveInventory)
routes.get("/getinventories",authMiddleware, checkTokenBlacklist, retrieveInventories)
routes.delete("/deleteinventory/:id",authMiddleware, checkTokenBlacklist, removeInvetory)


export default routes;
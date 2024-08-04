import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import compression from "compression"
import cookieParser from "cookie-parser"
import routes from "./routes/index"
import fs from 'fs';
import path from 'path';
import { InsertInventory } from "./controllers/inventory"
import { createInventory } from "./drizzle/inventoryFunctions"






dotenv.config()

// initialize our app
const app = express(

)


// configure some settings


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use("/api/v1", routes)



// was used to seed data into the inventory table
// app.use(express.json());

// // Read JSON file
// const dataFilePath = path.join(__dirname, 'inventoryData.json');
// const inventoryData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// app.post('/api/v1/populate-inventory', async (req: express.Request, res: express.Response) => {
//     try {
//         for (const category of inventoryData) {
//             for (const item of category.items) {
//                 await createInventory(
//                     {
//                         ...item,
//                         category_id: category.categoryid
//                     }
//                 ); // Cast as any for simplicity
//             }
//         }
//         res.status(200).send('Inventory populated successfully');
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });



app.listen(8000, ()=>{
    console.log(`Server is running on port 8000`)
})
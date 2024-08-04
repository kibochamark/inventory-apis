import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import compression from "compression"
import cookieParser from "cookie-parser"
import routes from "./routes/index"






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




app.listen(8000, ()=>{
    console.log(`Server is running on port 8000`)
})
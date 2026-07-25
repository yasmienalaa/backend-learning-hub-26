import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import  express from "express"
import {routes} from "./routes/userRoutes"

dotenv.config();
const app=express();
app.use(cookieParser());
app.use(express.json())
app.use("/auth", routes)
const port=process.env.PORT 

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
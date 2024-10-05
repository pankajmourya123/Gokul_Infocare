import app from "./app.js";
import dotenv from "dotenv"
import database from "./config/database.js";

dotenv.config({path:"./config/config.env"})
database();
const PORT=process.env.PORT||7000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
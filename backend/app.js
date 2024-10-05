import express from 'express'
import { errorMiddleware } from './middlewares/error.js';
import user from "./routes/users.js";
import cors from 'cors';
const app=express();
// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE', 
  };
  
  app.use(cors(corsOptions));
  

app.use("/api/users", user);

app.get("/",(req,res)=>{
  res.send("HELOO")
})


app.use(errorMiddleware);
export default app;
import express, { response } from 'express'
import { errorMiddleware } from './middlewares/error.js';
import user from "./routes/users.js";
import cors from 'cors';
const app=express();
// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    origin:'https://gokul-infocare.vercel.app/',
    methods: 'GET,POST,PUT,DELETE', 
  };
  
  app.use(cors(corsOptions));
  

app.use("/api/users", user);

app.get("/", (req, res) => {
  res.json({
    message: "Hello, Welcome!",
    routes: {
      "create user (POST)": "https://gokul-infocare.onrender.com/api/users/create",
      "update user (PUT)": "https://gokul-infocare.onrender.com/api/users/:id",
      "get all users (GET)": "https://gokul-infocare.onrender.com/api/users/",
      "delete user (DELETE)": "https://gokul-infocare.onrender.com/api/users/:id"
    }
  });
});



app.use(errorMiddleware);
export default app;
import express from "express"
import dotenv from "dotenv"
import { studentsRouter } from "./Routers/students.js";


// configure the environment
dotenv.config();
const PORT = process.env.PORT

//initiating server
const app = express();
//middleware
app.use(express.json());

//students routers
app.use("/students", studentsRouter)

//starting the server
app.listen(PORT, ()=> console.log("Sever running in the localhost:9090"))

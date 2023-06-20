import express from "express"
import dotenv from "dotenv"
import { studentsRouter } from "./Routers/students.js";
import { mentorsRouter} from "./Routers/mentors.js"
import { userRouter } from "./Routers/users.js";
import { isAuthenticated } from "./Authtentication/auth.js";


// configure the environment
dotenv.config();
const PORT = process.env.PORT

//initiating server
const app = express();
//middleware
app.use(express.json());

//students routers
app.use("/students",isAuthenticated, studentsRouter)
app.use("/mentors", mentorsRouter)
app.use("/users",userRouter)


//starting the server
app.listen(PORT, ()=> console.log("Sever running in the localhost:9090"))

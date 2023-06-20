import express from 'express'
import bcrypt from "bcrypt"
import { addUsers, generateJwtToken, getUser } from '../Controllers/Users.js';

const router = express.Router();

router.post("/signup", async(req, res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const user = await getUser(req.body.email) 
    if(!user){
        //logic
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        const hashedUser = await {...req.body, password: hashedpassword}
        const result = await addUsers(hashedUser)
        return res.status(200).json({result, data: "Added Successfully"})
    }    
    res.status(400).json({data: "Given user already exist"})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: "Internal Server Error" });
    }
})


router.post("/login", async(req, res)=>{
    try {
        //is user available
        const user = await getUser(req.body.email);
        if(!user){
            return res.status(404).json({data: "Invalid Email"})
        }
        //is password valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(400).json({data:"Invalid Passowrd"})
        }
        const token = generateJwtToken(user._id);
        res.status(200).json({data:{
            message: "Successfully loggedIn",
            token : token
        }})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: "Internal Server Error" });
    }
})
export const userRouter = router;
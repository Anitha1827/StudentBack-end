import express from "express";
import { addMentorsData, deleteMentorsData, getAllMentors, getAllMentorsById, updateMentorsData } from "../Controllers/mentors.js";
import { client } from "../db.js";

const router = express.Router();
//create mentors
router.post("/add", async (req, res)=>{
    try {
        const newMentor = req.body;
        if(!newMentor){
            res.status(400).json({data: "No details provided"})
        }
        const result = await addMentorsData(newMentor)
        res.status(200).json({data: {result : result, message: "Added Successfully"}})
    } catch (error) {
       
        console.log(error)
        res.status(500).json ({data: "Internal server Error"})  
    }
})


router.get("/all", async(req,res)=>{
    try {
        if(req.query.experience){
            req.query.experience = +req.query.experience
        }
        if (req.query.taskCompletion){
            req.query.taskCompletion = +req.query.taskCompletion
        }

        
     const mentors = await getAllMentors(req)

     console.log(mentors)
     if(mentors.length <= 0){
         res.status(400).json({data:"User Not found"})
         return
     }
     res.status(200).json({data: mentors})
    } catch (error){ 
     console.log(error)
     res.status(500).json ({data: "Internal server Error"})
    }
})

router.get("/mentors", async(req, res)=>{
    try {
        const mentors = await client
        .db("guvi")
        .collection("mentors")
        .find()
        .toArray()
        if(!mentors){
            res.status(400).json({data: "User not found"})
        }
         res.status(200).json({data: mentors})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: "Internal server error"})
    }
})

//using query params
router.get("/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const mentors = await getAllMentorsById(id)
        if(!mentors){
            res.status(400).json({data:"User Not found"})
            return
        }
        res.status(200).json({data: mentors})
    } catch (error) {
        console.log(error)
        res.status(500).json ({data: "Internal server Error"})  
    }
})



router.put("/edit/:id",async(req, res)=>{
    try {
    const {id} = req.params;
    const updatedData = req.body;
    if(!id || !updatedData){
        res.status(400).json({data: "Wrong Request"})
    }
    const result = await updateMentorsData(id, updatedData)
    res.status(200).json({data: {result : result, message: "Updated Successfully"}})
    } catch (error) {
        console.log(error)
        res.status(500).json ({data: "Internal server Error"})
    }
})   

router.delete("/delete/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            res.status(400).json({data: "Wrong Request"})
        }
        const result = await deleteMentorsData(id);
        res.status(200).json({data: {result : result, message: "Deleted Successfully"}})
    } catch (error) {
        console.log(error)
        res.status(500).json ({data: "Internal server Error"})
    }
})
export const mentorsRouter = router
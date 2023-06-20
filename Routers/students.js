import express from "express";
import { addStudentsData, deleteStudentsData, getAllStudents, getAllStudentsById, updateStudentData } from "../Controllers/students.js";
import { client } from "../db.js";
import jwt from "jsonwebtoken"

const router = express.Router();
router.get("/all", async(req,res)=>{
    try {
        if(req.query.experience){
            req.query.experience = +req.query.experience
        }
        if (req.query.taskCompletion){
            req.query.taskCompletion = +req.query.taskCompletion
        }

        
     const students = await getAllStudents(req)

     console.log(students)
     if(students.length <= 0){
         res.status(400).json({data:"User Not found"})
         return
     }
     res.status(200).json({data: students})
    } catch (error){ 
     console.log(error)
     res.status(500).json ({data: "Internal server Error"})
    }
})

//create student
router.post("/add", async (req, res)=>{
    try {
        const newStudent = req.body;
        if(!newStudent){
            res.status(400).json({data: "No details provided"})
        }
        const result = await addStudentsData(newStudent)
        res.status(200).json({data: {result : result, message: "Added Successfully"}})
    } catch (error) {
       
        console.log(error)
        res.status(500).json ({data: "Internal server Error"})  
    }
})


// Assign a student to Mentor

router.put('/students/:studentId/assign', (req, res)=>{
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const Mentor = client
    .db("guvi")
    .collection("mentors")

    const Student = client
    .db("guvi")
    .collection("students")
    
    Promise.all([
        Mentor.findById(mentorId),
        Student.findByIdAndUpdate(studentId, { mentor: mentorId }, { new: true })
      ])
        .then(([mentor, student]) => {
          if (!mentor || !student) {
            return res.status(404).json({ error: 'Mentor or student not found' });
          }
    
          res.json({ mentor, student });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to assign mentor to student' });
        });
    });




router.get("/students", async(req, res)=>{
    try {
        const students = await client
        .db("guvi")
        .collection("students")
        .find()
        .toArray()
        if(!students){
            res.status(400).json({data: "User not found"})
        }
         res.status(200).json({data: students})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: "Internal server error"})
    }
})

//using query params
router.get("/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const students = await getAllStudentsById(id)
        if(!students){
            res.status(400).json({data:"User Not found"})
            return
        }
        res.status(200).json({data: students})
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
    const result = await updateStudentData(id, updatedData)
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
        const result = await deleteStudentsData(id);
        res.status(200).json({data: {result : result, message: "Deleted Successfully"}})
    } catch (error) {
        console.log(error)
        res.status(500).json ({data: "Internal server Error"})
    }
})
export const studentsRouter = router
import { ObjectId } from "mongodb";
import { client } from "../db.js";


export function getAllStudents(req){
    return client
    .db("guvi")
    .collection("students")
    .find(req.query) 
    .toArray()
}

export function getAllStudentsById(id){
    return client
    .db("guvi")
    .collection("students")
    .findOne({_id: new ObjectId(id)}) 
}

export function addStudentsData(data){
    return client 
    .db("guvi")
    .collection("students")
    .insertOne(data) 
}
export function updateStudentData(id, updatedData){
    return client 
    .db("guvi")
    .collection("students")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set: updatedData}) 
}

export function deleteStudentsData(id){
    return client 
    .db("guvi")
    .collection("students")
    .deleteOne({_id: new ObjectId(id)}) 
}
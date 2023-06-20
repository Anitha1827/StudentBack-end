import { ObjectId } from "mongodb";
import { client } from "../db.js";


export function getAllMentors(req){
    return client
    .db("guvi")
    .collection("mentors")
    .find(req.query) 
    .toArray()
}

export function getAllMentorsById(id){
    return client
    .db("guvi")
    .collection("mentors")
    .findOne({_id: new ObjectId(id)}) 
}


export function addMentorsData(data){
    return client 
    .db("guvi")
    .collection("mentors")
    .insertOne(data) 
}
export function updateMentorsData(id, updatedData){
    return client 
    .db("guvi")
    .collection("mentors")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set: updatedData}) 
}

export function deleteMentorsData(id){
    return client 
    .db("guvi")
    .collection("mentors")
    .deleteOne({_id: new ObjectId(id)}) 
}
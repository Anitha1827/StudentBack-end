import {MongoClient} from "mongodb"
import Obj from "mongodb"

const MongoURL = "mongodb+srv://anithah2711:anitha@cluster0.cfkorlw.mongodb.net/guvi"
async function createConnection(){
const client = new MongoClient(MongoURL);
await client.connect()
console.log("MongoDB is connected Succefully")
return client
}

export var ObjectId = Obj.ObjectId;
export const client = await createConnection();
// export { createConnection};
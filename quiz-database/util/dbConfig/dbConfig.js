import mongoose from "mongoose";
import { config } from "dotenv";

config()

async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        
        connection.on('connected', ()=>{
            console.log('MongoDb connected sucessfully')
        })

        connection.on('error', (err)=>{
            console.log('MongoDb connection error' + err)
            process.exit()
        })
    }catch(error){
        console.log(error)
    }
}

export default connect;
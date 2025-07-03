import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectedData=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connection Successfully")).catch((err)=>console.log(err))
}
export default connectedData
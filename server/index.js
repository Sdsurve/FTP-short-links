import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { postLink,getslugRedirect } from "./controllers/link.js"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const MangoDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URL)
  
    if (conn) {
      console.log(`MongoDB connected successfully ✅ 😁`);
    }
    else{
        console.log("mongoDb is not connected 😔")
    }
  };
  MangoDB();

app.get("/health", (req,res)=>
{
    res.json({
        success:true,
        message:"App Is Finde..."
    })
}
)

app.post('/link',postLink)

app.get('/:slug',getslugRedirect)





const PORT = process.env.PORT || 3000


app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)

}  
)

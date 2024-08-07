import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { postLink,getslugRedirect,getLinks } from "./controllers/link.js"
import { Signup,Login } from "./controllers/user.js"
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

app.get('/links',getLinks)
app.post('/link',postLink)
app.post('/login',Login)
app.post('/signup',Signup)

app.get('/:slug',getslugRedirect)







const PORT = process.env.PORT || 3000


app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)

}  
)

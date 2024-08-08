import {model, Schema} from "mongoose"


const LinkSchema = new Schema({
    target: {
        type:String,
        require: true
      },
      slug:{
        type:String,
        require:true,
        unique:true
      },
      title :{
        type:String,
        require:true
      },
      views :{
        type:Number,
        default:0
      },
      user:{
        type : Schema.Types.ObjectId,
        ref : "User",
        require : true
      }

},{
    timestamps:true
})

const Link = model("Link", LinkSchema);
export default Link
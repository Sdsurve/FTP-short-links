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
      }

},{
    timestamp:true
})

const Link = model("Link", LinkSchema);
export default Link
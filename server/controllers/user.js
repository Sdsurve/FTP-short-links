import User from './../model/User.js'

const Signup = async (req,res)=>{
    const {fullName,email,password,dob} = req.body

    const user = new User({
        fullName,
        email,
        password,
        dob
    })

    try {
        const savedUser = await user.save();
    
        res.json({
            message: `User SignUp successfully`,      
            success:true,
            data:savedUser
        })
      }
      catch(e){
            res.json({
            message: e.message,
            success:false,
            data:null
            })
          }

}
const Login = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({
        email:email,
        password:password
    });

    if(user){
        return res.json({
            success:true,
            message:"Login Successfully",
            data:user
        })
    }
    else{
        return res.json({
            success:false,
            message:"Invalid Credentials",
            data:null
        })
    }
}
export {Signup,Login}
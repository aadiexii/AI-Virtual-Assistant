import generateToken from "../config/token.js";
import User from "../schema/user.schema.js"
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "Email Already Exists"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Entered Password Must Be Of 6 Characters"
            })        
        }
        
        const hasdPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            password: hasdPassword,
            email
        })
        
        const token = await generateToken(user._id)

    }catch(error){

    }
}
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
        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({
            message: `Error occured while creating new user + ${error}`
        })
    }
}

const signin = async (req, res) => {
    try{
        const {email, password} = req.body
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Email Doesnt Exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                   message: "Incorrect Password"
            })
        }
        
        
        const token = await generateToken(user._id)
        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({
            message: `Error occured while logging In + ${error}`
        })
    }
}


const logout = (req, res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message: "Logged put succesfullt"
        })
    }catch(error){
        return res.status(500).json({
            message: `Error occured while logging In + ${error}`
        })        
    }
}

export {
    signup, signin, logout
}
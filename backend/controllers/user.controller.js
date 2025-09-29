import { response } from "express";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../schema/user.schema.js";
import moment from "moment/moment.js";

export const getCurrentUser = async (req, res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User Not Found"
            })
        }

        return res.status(200).json(user)
    }catch(error){
        return res.status(400).json({
            message: "Get Current User Error"
        })
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const {assistantName, imageUrl} = req.body;
        let assistantImage;
        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path)
        }else{
            assistantImage = imageUrl
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            assistantImage, assistantName
        }, {new: true}).select("-password")
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({
            message: "Update Assistant Info User Error"
        })       
    }
}

export const askToAssistant =async (req, res) => {
    try {
        const {command} = req.body;
        const user = await User.findById(req.userId);
        const userName = user.name
        const assistantName = user.assistantName;
        
        const result = await geminiResponse(command, userName, assistantName);
        
        const jsonMatch = result.match(/{[\s\S]*}/)
        if(!jsonMatch){
            return res.status(400).json({
                response: "Sorry, I can't"
            })
        }

        const gemResult = JSON.parse(jsonMatch[0]);
        const type = gemResult.type;

        switch(type){
            case 'get-date': 
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current date is ${moment().format("YYYY-MM-DD")}`
                });
            case 'get-time': 
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current time is ${moment().format("hh:mm A")}`
                });
            case 'get-day': 
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `today is ${moment().format("dddd")}`
                })
            case 'month': 
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current MOnth is ${moment().format("MMMM")}`
                })
            case 'google_search':
            case 'youtube_search':
            case 'youtube_search':
            case 'calculator_open':
            case 'instagram_open':
            case 'facebook_open':
            case 'weather-show':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.userInput
                });
            default:
                return res.status(400).json({
                    response: "I can't understand the command"
                })
        }
    } catch (error) {
        return res.status(500).json({
            response: "Assistant Ask Error"
        })
    }
}
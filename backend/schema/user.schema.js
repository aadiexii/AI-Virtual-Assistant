import mongoose, { Schema } from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    assistantName: {
        type: String,
    },
    assistantImage: {
        type: String,
    },
    history: [{
        type: String                  
    }]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User
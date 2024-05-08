import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    lastname:{
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    profileImage: {
        type: String, // Chemin de l'image de profil
    }

},{timestamps:true});

export default mongoose.model("User", UserSchema);

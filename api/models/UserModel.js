import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    lastname:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    }

});

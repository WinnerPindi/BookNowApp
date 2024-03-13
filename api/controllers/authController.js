import UserModel from "../models/UserModel.js"

export const register = async(req,res,next) =>{
    try{
        const newUser = new UserModel({
            lastname:req.body.lastname,
            firstname:req.body.firstname,
            email:req.body.email,
            password:req.body.password,
        });

        await newUser.save();
        res.status(200).send("User has been created");
    }catch{
        
    }
}
import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkauthentication",verifyToken, (req,res,next) =>{
    res.send("Hello user, you are logged in")
});*/
/*
router.get("/checkuser/:id",verifyUser, (req,res,next) =>{
    res.send("Hello user, you are logged in and you can delete you account")
});

router.get("/checkadmin/:id",verifyUser, (req,res,next) =>{
    res.send("Hello Admin, you are logged in and you can delete all accounts")
}); */

//UPDATE UN User
router.put("/:id",verifyUser,updateUser);
//DELETE UN User
router.delete("/:id", verifyUser,deleteUser);
//GET A User
router.get("/:id", verifyUser,getUser);
//GET ALL UserS
router.get("/",verifyAdmin, getUsers);

export default router;

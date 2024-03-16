import UserModel from "../models/UserModel.js";


export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateUser);
      } catch (err) {
        next(err);
      }
  };

  export const deleteUser = async (req, res, next) => {
    
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  };
  export const getUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(User);
    } catch (err) {
      next(err);
    }
  };

  export const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

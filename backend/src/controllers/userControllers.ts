import User from "../models/userModel";
import { v4 as uuidV4 } from "uuid";
import { Request, Response } from "express";

const handleCreateNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, age, hobbies } = req.body;
    const id = uuidV4();
    console.log(id, name, age, hobbies);

    const newUser = new User({
      id,
      name,
      age,
      hobbies,
    });
    await newUser.save();
    console.log("User saved successfully");
    res.status(200).send(newUser);
  } catch (error) {
    console.log("User creation error: ", error);
    res.status(500).send(error);
  }
};

const handleGetUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const getUser = await User.find({});
    if (!getUser) res.status(404).send("error during get user data");
    res.status(200).send(getUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userid } = req.params;
    const updatedUser = await User.findOneAndUpdate({ id: userid }, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).send("User Not found");
      return;
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log("User update error: ", error);
    res.status(500).send(error);
  }
};

const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    await User.deleteOne({ id: req.params.userid });
    res.status(200).send("User deeleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  handleCreateNewUser,
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
};

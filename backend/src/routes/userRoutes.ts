import express, { Router } from "express";
import {
  handleCreateNewUser,
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
} from "../controllers/userControllers";

const router: Router = express.Router();

router.get("/", handleGetUser);

router.post("/", handleCreateNewUser);

router.put(`/:userid`, handleUpdateUser);

router.delete(`/:userid`, handleDeleteUser);

export default router;

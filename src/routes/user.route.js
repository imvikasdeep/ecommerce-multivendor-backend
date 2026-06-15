import express from "express";
import { createUser, getUsers, getUserById, deleteUser, updateUser } from "../controllers/user.controller.js";
import { authorize} from "../middleware/role.middleware.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", authorize("admin"), deleteUser);

export default userRouter;
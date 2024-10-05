import express from 'express'
import{
    createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../contorllers/user.js";

const router=express.Router();

router.get("/",getAllUsers);

router.post("/create",createUser);

router.get("/:id",getUserById);

router.put("/:id",updateUser)

router.delete("/:id",deleteUser);

export default router;

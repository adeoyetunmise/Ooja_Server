import {Router} from "express"
import { signup, login, getUsers } from "../controllers/userController.js"



const userRouter = Router()

userRouter.post("/signup", signup)

userRouter.post("/login", login)

userRouter.get("/user", getUsers)

export default userRouter;
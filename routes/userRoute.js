import { Router } from "express"
import { login, signUp } from "../controllers/userController.js"
import User from "../models/userModel.js"


const userRouter = Router()

userRouter.post('/signup', signUp)


userRouter.post('/login', login)

userRouter.get('/User', User)


export default userRouter;
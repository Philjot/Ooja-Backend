import { Router } from "express"
import { login, signUp } from "../controllers/userController.js"
import User from "../models/userModel.js"


const userRouter = Router()

userRouter.post('/signup', signUp)


userRouter.post('/login', login)

userRouter.get('/User',(req, res)=>{
    res.send('users info')
} )


export default userRouter;
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const getToken = ({id}) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });
}



export const signUp = async (req, res) => {
    const { first_name, last_name, age, email, user_name, password } = req.body;
        console.log(password)
    try{
        const user = await User.signUp(first_name, last_name, age, email, user_name, password);
        res.status(200).json({ user, token: await getToken(user)});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


export const login = async(req, res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        res.status(200).json({ user, token: await getToken(user)});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcryptjs'


const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    user_name: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },
})


userSchema.statics.signUp = async function(first_name, last_name, age, email, user_name, password) {
    try{
        if(!first_name || !last_name || !age || !user_name || !email || !password){
            throw Error("All fields must be filled");
        }
        const exist = await this.findOne({ email });
        if(!validator.isEmail(email)) {
            throw Error("Email is not valid");
        }
        if (exist) {
            throw Error("Email is already in use");
        }

        const user_nameExist = await this.findOne({ user_name });
        console.log(user_nameExist)
       
        if(user_nameExist){
            throw Error("User name is not available")
        }

        if(!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough, must be atleast 8 characters long and contain at least one uppercase, one lowercase one number and a character")
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await this.create({ first_name, last_name, age, user_name, email: email.toLowerCase(), password: hash});
        return user;
    }catch (error) {
        console.log(error)
        throw error;

    }
}

userSchema.statics.login = async function(email, password) {
    try{
        if(!email || !password){
            throw Error("All fields required");
        }
    const user = await this.findOne({ email });
    if(!user){
        throw Error("Incorrect email");
    }

    
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw Error("Incorrect password");
    }
      return user;
    }catch(error){
        console.log(error)
        throw error;
    }
}

const User = mongoose.model("User", userSchema)

export default User;
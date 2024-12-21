import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:String,
    password:String
})

const UserModel= mongoose.model("Users",UserSchema)

export default UserModel
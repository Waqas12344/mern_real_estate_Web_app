import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Ddefault%2Bavatar&psig=AOvVaw0SS8fzVzJxvhDV1lUJWgFM&ust=1722083406001000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCszN_axIcDFQAAAAAdAAAAABAE"
    }

},{timestamps:true});

const User =mongoose.model('user',userSchema);

export default User;
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firstname:  {type: String, required: true},
    lastname:   {type: String, required: true},
    email:      {type: String, required: true, unique: true},
    address:    {type: String, required: true},
    flatNo:     {type: Number},
    password:   {type: String, required: true}
});

export const UserModel = mongoose.model("Users",UserSchema);
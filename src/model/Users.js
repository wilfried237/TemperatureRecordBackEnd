import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema({
    firstname:  {type: String, required: true},
    lastname:   {type: String, required: true},
    email:      {type: String, required: true, unique: true},
    address:    {type: String, required: true},
    flatNo:     {type: Schema.Types.Number},
    password:   {type: String, required: true}
});

export const UserModel = mongoose.model("Users",UserSchema);
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', UserSchema)
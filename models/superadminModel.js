import mongoose from "mongoose";

const superadmin = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const SuperAdmin = mongoose.models.superadmin || mongoose.model("superadmin", superadmin);

export default SuperAdmin;
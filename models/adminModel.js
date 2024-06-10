import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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

const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default Admin;
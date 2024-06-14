import mongoose from "mongoose";
import { boolean } from "zod";

const hostelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a hostel name"],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide a hostel price"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    capacity: {
        type: Number,
        required: [true, "Please provide capacity"],
    },
    location:{
        type:String,
        required:[true,"Please Provide Location"]
    },
    pincode: {
        type: String,
        required: [true,"Please Provide Pincode"]
    },
    amenities:{
        type: [String],
        default: [], 
    },
    featured:{
        type: Boolean,
        default:false,
    },
    imageURLs:{
        type: [String],
        required: [true,"Please provide image URLs"],
        default: [], 
    },
    owner: {
        type: String,
        required: [true, "Owner Not Found"],
        default:["Owner Not Found"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Hostel = mongoose.models.Hostel || mongoose.model("Hostel", hostelSchema);

export default Hostel;

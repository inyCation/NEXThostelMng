import mongoose from "mongoose";

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
    amenities:{
        type: [String],
        default: [], 
    },
    imageURLs:{
        type: [String],
        required: [true,"Please provide image URLs"],
        default: [], 
    }
});

const Hostel = mongoose.models.Hostel || mongoose.model("Hostel", hostelSchema);

export default Hostel;

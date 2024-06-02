import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    hostelname: {
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
    amenities:{
        type: [String],
        default: [], // Assuming most hostels have no amenities by default
    },
    imageURLs:{
        type: [String],
        required: [true,"Please provide image URLs"],
        default: [], // Assuming each hostel must have at least one image
    }
});

const Hostel = mongoose.models.Hostel || mongoose.model("Hostel", hostelSchema);

export default Hostel;

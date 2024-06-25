import mongoose from "mongoose";

const hostelBookingSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: [true, "Please provide a user email"],
    },
    checkinDate: {
        type: Date,
        required: [true, "Please provide a check-in date"],
    },
    checkoutDate: {
        type: Date,
        required: [true, "Please provide a check-out date"],
    },
    totalprice: {
        type: Number,
        required: [true, "Please provide a total price"],
    },
    gst: {
        type: Number,
        required: [true, "Please provide GST"],
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel", 
        required: [true, "Please provide a hostel ID"],
    },
    noOfPerson: {
        type: Number,
        required: [true, "Please provide No Of Person"],
    },
    ownerEmail: {
        type: String,
        required: [true, "Owner Not Found"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const HostelBooking = mongoose.models.HostelBooking || mongoose.model("HostelBooking", hostelBookingSchema);

export default HostelBooking;

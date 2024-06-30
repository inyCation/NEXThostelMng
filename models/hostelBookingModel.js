import mongoose from 'mongoose';

const HostelBookingSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: [true, "Please provide a Hostel Name"],
    },
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
    status:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const HostelBooking = mongoose.models.HostelBooking || mongoose.model("HostelBooking", HostelBookingSchema);

export default HostelBooking;

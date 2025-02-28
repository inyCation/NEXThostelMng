import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;

import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
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
    number: {
        type: String,
    }
});

// Delete the cached model to force schema refresh
if (mongoose.models.Message) {
    delete mongoose.models.Message;
}

export default mongoose.model('Message', MessageSchema);

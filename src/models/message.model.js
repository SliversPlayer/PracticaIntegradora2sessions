import mongoose from 'mongoose';

const messageCollection = "messages"

const messageSchema = new mongoose.Schema({
    sender: {type: String, ref: 'User', required: true},
    mensaje: {type: String, required: true},
});

const Message = mongoose.model(messageCollection, messageSchema);

export default Message;
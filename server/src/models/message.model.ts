import { MessageModel } from "../interfaces/model.ts";
import mongoose, { Schema, model, Document } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  messages: [messageSchema],
});

export default model<MessageModel>("message", conversationSchema);

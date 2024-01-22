import { MessageModel } from "../interfaces/model.ts";
import mongoose, { Schema, model, Document } from "mongoose";

const messageSchema = new mongoose.Schema({
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
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
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  ],
  messages: [messageSchema],
});

export default model<MessageModel>("message", conversationSchema);

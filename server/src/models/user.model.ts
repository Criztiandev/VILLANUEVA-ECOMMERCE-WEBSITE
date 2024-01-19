import { Document, Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserModel } from "../interfaces/model.ts";

interface UserDocument extends Document, Omit<UserModel, "_id"> {
  matchPassword(currentPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

// Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update: { password?: string } = this.getUpdate() as any;

  if (!update.password) {
    // If the password is not being modified, move to the next middleware
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.password, salt);

    update.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Custom Function
userSchema.methods.matchPassword = async function (
  currentPassword: string
): Promise<boolean> {
  return await bcrypt.compare(currentPassword, this.password);
};

export default model<UserDocument>("User", userSchema);

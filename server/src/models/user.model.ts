import { Document, Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserModel } from "../interfaces/model.ts";

// Extend the UserModel interface to include the matchPassword method
interface UserDocument extends Document, UserModel {
  matchPassword(currentPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, require: true },
    middleName: { type: String, require: true },
    lastName: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true },
    birthDate: { type: String, require: true },
    contact: { type: String, require: true },

    address: { type: String, require: true },
    street: { type: String, require: true },
    building: { type: String, require: true },
    houseNo: { type: String, require: true },
    postalCode: { type: String, require: true },

    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  {
    timestamps: true,
  }
);

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

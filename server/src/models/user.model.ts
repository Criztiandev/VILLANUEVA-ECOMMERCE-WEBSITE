import { Document, Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserModel } from "../interfaces/model.ts";

// Extend the UserModel interface to include the matchPassword method
interface UserDocument extends Document, UserModel {
  matchPassword(currentPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    age: { type: Number, default: 0 },
    gender: { type: String, default: "" },
    birthDate: { type: String, default: "" },
    contact: { type: String, default: "" },

    fullName: { type: String, default: "" },

    address: { type: String, default: "" },
    street: { type: String, default: "" },
    building: { type: String, default: "" },
    houseNo: { type: String, default: "" },
    postalCode: { type: String, default: "" },

    email: { type: String, require: true, unique: true },
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
  this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update: UserModel = this.getUpdate() as any;

  if (!update.password) {
    update.fullName = `${update.firstName} ${update.middleName} ${update.lastName}`;
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

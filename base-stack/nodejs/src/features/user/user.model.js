import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  username: { type: String, unique: true, sparse: true },
  gender: { type: String },
  role: {
    type: String,
    default: "member",
    enum: ["member", "admin", "superAdmin"],
  },
  avatarUrl: String,
  phoneNumber: String,
  address: String,
  birthday: String,
  work: String,
  education: String,
  bio: String,
  socialLinks: [String],
  // passport
  providerGoogle: {
    type: String,
  },
  // token
  refreshToken: {
    type: String,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      throw new Error("Error hashing password");
    }
  }
});

userSchema.methods.isPasswordMatch = async function (plainPassword) {
  try {
    return await bcrypt.compare(plainPassword, this.password);
  } catch (err) {
    throw new Error("Error comparing password");
  }
};

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;

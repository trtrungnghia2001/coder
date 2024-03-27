import mongoose, { Schema } from "mongoose";

const user_model =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        role: { type: String, enum: ["admin", "user"], default:"user" },
        refresh_token: { type: String },
        thumbnail: { type: Schema.Types.Mixed },
      },
      { timestamps: true }
    )
  );
export default user_model;

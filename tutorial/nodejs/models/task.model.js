import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    task: String,
    description: String,
    compeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.models.task || mongoose.model("task", schema);

export default taskModel;

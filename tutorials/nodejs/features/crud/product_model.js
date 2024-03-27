import mongoose, { Schema } from "mongoose";

const product_model =
  mongoose.models.Product ||
  mongoose.model(
    "Product",
    new Schema({
      title: { type: String, required: true },
      caption: { type: String },
      thumbnail: { type: Schema.Types.Mixed },
      desc: { type: String },
    },{timestamps:true})
  );
export default product_model;

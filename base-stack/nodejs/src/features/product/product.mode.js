import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema(
  {
    name: String,
    slug: String,
    price: Number,
    origin: String,
    description: String,
    thumbnail: String,
  },
  {
    timestamps: true,
  },
)

export const ProductModel =
  mongoose.models.product || mongoose.model('product', productSchema)

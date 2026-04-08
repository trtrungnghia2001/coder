import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.aggregate([
    {
      // Bước 1: Left Join với collection 'favorites'
      $lookup: {
        from: "favorites", // Tên collection của Favorite model trong MongoDB (thường là tên model viết thường, số nhiều)
        localField: "_id", // Trường từ collection 'products'
        foreignField: "productId", // Trường từ collection 'favorites'
        as: "favoriteStatus", // Kết quả join sẽ được đưa vào mảng này
      },
    },
    {
      // Bước 2: Thêm trường 'isFavorite' dựa trên kết quả join
      $addFields: {
        isFavorite: {
          $gt: [
            {
              $size: "$favoriteStatus",
            },
            0, // Nếu kích thước mảng lọc > 0, tức là có mục yêu thích
          ],
        },
      },
    },
    {
      // Bước 3: Lọc bỏ trường 'favoriteStatus' tạm thời khỏi kết quả cuối cùng
      $project: {
        favoriteStatus: 0, // Loại bỏ trường này
      },
    },
  ]);
  res.json(products);
});
router.post("/", async (req, res) => {
  const product = await Product.create({ ...req.body });
  res.status(201).json(product);
});
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;

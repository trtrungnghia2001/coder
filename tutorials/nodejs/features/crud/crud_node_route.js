import express from "express";
import product_model from "./product_model.js";

// with mongodb
const crud_node_route_mongodb = express.Router();
crud_node_route_mongodb.get(`/get-all`, async (req, res) => {
  try {
    const q = req.query.q || "";
    const limit = parseInt(req.query.limit) || 60;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const data = await product_model
      .find({
        title: { $regex: q, $options: "i" },
      })
      .limit(limit)
      .skip(skip);
    const total = await product_model.countDocuments({
      title: { $regex: q, $options: "i" },
    });
    const paginate = {
      total,
      limit,
      current_page: page,
    };

    return res
      .status(200)
      .json({ status: 200, message: "", data: data, paginate });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.get(`/get-id/:id`, async (req, res) => {
  try {
    const { id } = req.params;

    const data = await product_model.findById(id);

    return res.status(200).json({ status: 200, message: "", data: data });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.post(`/create`, async (req, res) => {
  try {
    const body = req.body;

    const data = await product_model.create(body);
    if (!data)
      return res
        .status(405)
        .json({ status: 405, message: "Create failed", data: data });

    return res
      .status(201)
      .json({ status: 201, message: "Create successfully", data: data });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.post(`/create-all`, async (req, res) => {
  try {
    const product_data = [
      { title: "title1" },
      { title: "title2" },
      { title: "title3" },
      { title: "title4" },
      { title: "title5" },
      { title: "title6" },
      { title: "title7" },
      { title: "title8" },
      { title: "title9" },
      { title: "title10" },
      { title: "title11" },
    ];

    const data = await product_model.insertMany(product_data);
    if (!data)
      return res
        .status(405)
        .json({ status: 405, message: "Create failed", data: data });

    return res
      .status(201)
      .json({ status: 201, message: "Create successfully", data: data });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.put(`/update-id/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const data = await product_model.findByIdAndUpdate(id, body, { new: true });
    if (!data)
      return res
        .status(405)
        .json({ status: 405, message: "Update failed", data: data });

    return res
      .status(201)
      .json({ status: 200, message: "Update successfully", data: data });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.put(`/update-all`, async (req, res) => {
  try {
    const text =
      "Máy chủ không thể tìm thấy tài nguyên được yêu cầu. Trong trình duyệt, điều này có nghĩa là URL không được nhận dạng. Trong API, điều này cũng có thể có nghĩa là điểm cuối hợp lệ nhưng bản thân tài nguyên không tồn tại. Máy chủ cũng có thể gửi phản hồi này thay vì 403 Forbiddenđể che giấu sự tồn tại của tài nguyên khỏi máy khách trái phép. Mã phản hồi này có lẽ được biết đến nhiều nhất do nó xuất hiện thường xuyên trên web.";

    const data = await product_model.updateMany(
      {},
      { desc: text },
      { new: true }
    );
    if (!data)
      return res
        .status(405)
        .json({ status: 405, message: "Update failed", data: data });

    return res
      .status(201)
      .json({ status: 200, message: "Update successfully", data: data });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.delete(`/delete-id/:id`, async (req, res) => {
  try {
    const id = req.params.id;

    const data = await product_model.findByIdAndDelete(id, { new: true });
    if (!data)
      return res
        .status(405)
        .json({ status: 405, message: "Delete failed", data: data });

    return res
      .status(201)
      .json({ status: 200, message: "Delete successfully", data: data });
  } catch (error) {
    console.log(error);
  }
});
crud_node_route_mongodb.delete(`/delete-all`, async (req, res) => {
  try {
    const data = await product_model.deleteMany();
    if (!data)
      return res
        .status(405)
        .json({ status: 405, message: "Delete all failed", data: data });

    return res
      .status(201)
      .json({ status: 200, message: "Delete all successfully", data: data });
  } catch (error) {
    console.log(error);
  }
});

export { crud_node_route_mongodb };

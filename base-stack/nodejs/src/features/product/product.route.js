import express from 'express'
import createHttpError from 'http-errors'
import { exportArrayToExcel, parseExcelToArray } from '#src/utils/file'
import { ProductModel } from './product.mode.js'
import upload from '#src/configs/multer'
import { adminMiddleware } from '#src/middlewares/auth.middleware'

const productRoute = express.Router()

productRoute.post(`/import`, upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file
    if (!file) return createHttpError.BadRequest('No file uploaded')

    const rows = await parseExcelToArray(file)

    const data = await ProductModel.insertMany(rows)

    return res.status(201).json({
      message: 'Imported successfully!',
      data,
      success: true,
    })
  } catch (error) {
    next(error)
  }
})
productRoute.get(`/export`, async (req, res, next) => {
  try {
    const data = await ProductModel.find().lean()
    const exportData = data.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }))

    exportArrayToExcel(res, exportData, 'users.xlsx')
  } catch (error) {
    next(error)
  }
})
productRoute.delete(`/`, adminMiddleware, async (req, res, next) => {
  try {
    const { ids } = req.body

    const data = await ProductModel.deleteMany({ _id: { $in: ids } })

    return res.status(200).json({
      message: 'Deleted selected successfully!',
      data,
      success: true,
    })
  } catch (error) {
    next(error)
  }
})
productRoute.post(`/`, async (req, res, next) => {
  try {
    const body = req.body
    const data = await ProductModel.create(body)

    return res.status(201).json({
      message: 'Created successfully!',
      data,
      success: true,
    })
  } catch (error) {
    next(error)
  }
})
productRoute.put(`/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const data = await ProductModel.findByIdAndUpdate(id, body, { new: true })

    return res.status(200).json({
      message: 'Updated successfully!',
      data,
      success: true,
    })
  } catch (error) {
    next(error)
  }
})
productRoute.delete(`/:id`, adminMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ProductModel.findByIdAndDelete(id)

    return res.status(200).json({
      message: 'Deleted successfully!',
      data,
      success: true,
    })
  } catch (error) {
    next(error)
  }
})
productRoute.get(`/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await ProductModel.findById(id).lean()

    return res.status(200).json({
      message: 'Fetch successfully!',
      data,
      success: true,
    })
  } catch (error) {
    next(error)
  }
})
productRoute.get(`/`, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = parseInt(req.query.offset) || 0
    const skip = (page - 1) * limit + offset

    const name = { $regex: req.query.name || '', $options: 'i' }
    const filters = {
      $or: [{ name: name }, { slug: name }],
    }

    // filter theo columnFilters
    if (req.query.status) {
      const statuses = req.query.status.split(',')
      filters.status = { $in: statuses }
    }

    if (req.query.role) {
      const roles = req.query.role.split(',')
      filters.role = { $in: roles }
    }

    const data = await ProductModel.find(filters)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
    const totals = await ProductModel.countDocuments(filters)
    const totalPages = Math.ceil(totals / limit)

    return res.status(200).json({
      message: 'Fetch successfully!',
      data,
      success: true,
      page,
      limit,
      offset,
      skip,
      totals,
      totalPages,
    })
  } catch (error) {
    next(error)
  }
})

export default productRoute

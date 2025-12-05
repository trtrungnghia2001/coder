import { StatusCodes } from "http-status-codes";

export function handleResponse(
  res,
  {
    status = StatusCodes.OK,
    success = true,
    message = "Operation successful!",
    data = null,
    paginate,
  }
) {
  const responseBody = {
    status,
    success,
    message,
    data,
  };

  if (paginate && Array.isArray(data)) {
    const total = paginate.total ?? data.length;
    const limit = paginate.limit;
    const page = paginate.page;
    responseBody.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  return res.status(status).json(responseBody);
}

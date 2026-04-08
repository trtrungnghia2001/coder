# 🧩 Microservice Project: Auth + Product + Favorite

Một dự án demo mô hình microservice sử dụng Node.js, React, Angular và API Gateway.

---

## 📚 Mục lục

- [1. Cấu trúc thư mục](#1-cấu-trúc-thư-mục)
- [2. Các service backend](#2-các-service-backend)
- [3. API Gateway](#3-api-gateway)
- [4. Frontend](#4-frontend)
- [5. Chia sẻ cookie giữa các subdomain](#5-chia-sẻ-cookie-giữa-các-subdomain)
- [6. Khởi động hệ thống](#6-khởi-động-hệ-thống)
- [7. Ghi chú](#7-ghi-chú)

---

## 1. Cấu trúc thư mục

```
microservice-project/
├── backend/
│   ├── auth-service/
│   ├── product-service/
│   ├── favorite-service/
│   └── api-gateway/
├── frontend/
│   ├── auth-app/        (React)
│   └── product-app/     (Angular)
```

---

## 2. Các service backend

### 🔐 Auth Service (`auth-service`)
- Đăng ký / Đăng nhập
- Trả về cookie JWT
- Mongoose, bcrypt, JWT

### 📦 Product Service (`product-service`)
- CRUD sản phẩm
- Yêu cầu xác thực token (qua middleware)

### ❤️ Favorite Service (`favorite-service`)
- Lưu sản phẩm yêu thích theo user

---

## 3. API Gateway

- Lắng nghe tại `http://localhost:5000`
- Proxy request tới từng service backend
- Sử dụng `http-proxy-middleware`

Ví dụ:

| Route               | Forward tới                     |
|--------------------|---------------------------------|
| `/auth/*`          | `http://localhost:4000/*`       |
| `/products/*`      | `http://localhost:4001/*`       |
| `/favorites/*`     | `http://localhost:4002/*`       |

---

## 4. Frontend

### 🔵 React (`auth-app`)
- Giao diện đăng ký / đăng nhập
- Gửi và nhận cookie từ server

### 🔴 Angular (`product-app`)
- Giao diện CRUD sản phẩm
- Xem và lưu sản phẩm yêu thích

---

## 5. Chia sẻ cookie giữa các subdomain

- Sử dụng cookie `HttpOnly`, `SameSite=Lax`
- Nếu deploy thật:
  - Đảm bảo các frontend chạy dưới cùng 1 **domain cha** (VD: `auth.domain.com`, `product.domain.com`)
  - Set cookie với `domain=.domain.com`

---

## 6. Khởi động hệ thống

### 📦 Backend

Chạy từng service:

```bash
cd backend/auth-service && npm install && npm run dev
cd backend/product-service && npm install && npm run dev
cd backend/favorite-service && npm install && npm run dev
cd backend/api-gateway && npm install && npm run dev
```

### 💻 Frontend

```bash
cd frontend/auth-app && npm install && npm run dev
cd frontend/product-app && npm install && ng serve
```

---

## 7. Ghi chú

- Kiểm tra kỹ `.env` cho mỗi service
- Cookie chỉ hoạt động tốt nếu frontend gửi `credentials: "include"`
- Trong API Gateway, nhớ dùng `pathRewrite` để xóa prefix

---

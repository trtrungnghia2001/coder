
# Dùng image nhẹ
FROM node:18

# Làm việc tại thư mục /app
WORKDIR /app

# Copy package.json và cài đặt
COPY package*.json ./
RUN npm install

# Copy toàn bộ code
COPY . .

# Mở port 
EXPOSE 4200

# Chạy server
CMD ["npm", "run", "start"]

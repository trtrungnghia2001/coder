import React, { useState, type ChangeEvent } from "react";
import "./Register.css"; // Chúng ta sẽ tạo file CSS này sau
import axios, { AxiosError } from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Thêm trường email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Thêm trường xác nhận mật khẩu

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    // Ở đây sau này bạn sẽ gọi API để gửi thông tin đăng ký đến backend
    await axios
      .post(
        `http://localhost:5000/auth/register`,
        {
          email,
          password,
          username,
        },
        {
          withCredentials: true,
        }
      )
      .then((value) => {
        alert(
          `${value.data.message}. Đăng ký thành công với Username: ${username}, Email: ${email}`
        );
      })
      .catch((err: AxiosError<{ message: string }>) => {
        alert(`${err.response?.data?.message}`);
      });

    // Reset form sau khi submit (tùy chọn)
    // setUsername("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Đăng ký tài khoản mới</h2>
        <div className="form-group">
          <label htmlFor="reg-username">Tên đăng nhập:</label>
          <input
            type="text"
            name="name"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-email">Email:</label>
          <input
            type="email" // Sử dụng type="email" cho validation cơ bản
            id="reg-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password">Mật khẩu:</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Xác nhận mật khẩu:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;

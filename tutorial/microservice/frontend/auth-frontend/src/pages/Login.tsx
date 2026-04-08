import React, { useState, type ChangeEvent } from "react";
import "./Login.css"; // Chúng ta sẽ tạo file CSS này sau
import axios, { AxiosError } from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

    // Ở đây sau này bạn sẽ gọi API để gửi thông tin đăng nhập đến backend
    await axios
      .post(
        `http://localhost:5000/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((value) => {
        alert(
          `${value.data.message}. Đăng nhập với Username: ${email} và Password: ${password}`
        );
        const token = value.data.token;
        localStorage.setItem("token", JSON.stringify(token));
      })
      .catch((err: AxiosError<{ message: string }>) => {
        alert(`${err.response?.data?.message}`);
      });

    // Reset form sau khi submit (tùy chọn)
    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;

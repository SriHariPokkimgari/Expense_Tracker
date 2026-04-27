import React, { useState } from "react";
import API from "../api/axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [username, setUsername] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", formData);
      console.log(res);
      setUsername(res.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleForm}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password: </label>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>

      <div>
        <h2>{username ? username : "Guest"}</h2>
      </div>
    </div>
  );
};

export default Login;

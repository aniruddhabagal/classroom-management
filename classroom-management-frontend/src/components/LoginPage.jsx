import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Teacher");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await generateToken(username, password);

      if (role === "Teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      setError("Login failed. Please check your username and password.");
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

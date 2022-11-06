import React, { useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const { getUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(email, password);
      console.log(
        getUser()[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
      navigate("/packages");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;

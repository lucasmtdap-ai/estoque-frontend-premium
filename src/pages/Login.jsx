import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { salvarAuth } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, senha });
      salvarAuth(res.data);
      navigate("/dashboard");
    } catch {
      alert("Erro no login");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2>Rosa Boutique</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button>Entrar</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { salvarAuth } from "../services/auth";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await api.post("/register", { nome, email, senha });
      salvarAuth(res.data);
      navigate("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.error || "Erro ao criar conta"
      );
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-box">
        <h2>Rosa Boutique</h2>

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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

        <button>Criar conta</button>
      </form>
    </div>
  );
}

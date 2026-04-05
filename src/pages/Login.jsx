import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { salvarAuth } from "../services/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      setCarregando(true);

      const { data } = await api.post("/auth/login", {
        email,
        senha
      });

      salvarAuth(data);
      navigate("/");
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao entrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Rosa Boutique</h1>
        <p className="auth-subtitle">Entre na sua conta</p>

        {erro ? <div className="alert alert-error">{erro}</div> : null}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
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

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-switch">
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

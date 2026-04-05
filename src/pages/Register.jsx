import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [loja, setLoja] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      setCarregando(true);

      const { data } = await api.post("/auth/register", {
        nome,
        loja,
        email,
        senha
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao criar conta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Rosa Boutique</h1>
        <p className="auth-subtitle">Crie sua conta</p>

        {erro ? <p style={{ color: "red" }}>{erro}</p> : null}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nome da loja"
            value={loja}
            onChange={(e) => setLoja(e.target.value)}
          />

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
            {carregando ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

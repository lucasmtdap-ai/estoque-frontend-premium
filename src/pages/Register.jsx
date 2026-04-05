import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { salvarAuth } from "../services/auth.js";

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    loja: "",
    email: "",
    senha: ""
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!form.nome || !form.loja || !form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setCarregando(true);

      const { data } = await api.post("/auth/register", {
        nome: form.nome,
        loja: form.loja,
        email: form.email,
        senha: form.senha
      });

      salvarAuth(data);
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

        {erro ? <div className="alert alert-error">{erro}</div> : null}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
          />

          <input
            type="text"
            name="loja"
            placeholder="Nome da loja"
            value={form.loja}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
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

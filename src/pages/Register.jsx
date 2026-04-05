import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [loja, setLoja] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Cadastro carregou. Nome: ${nome}`);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Rosa Boutique</h1>
        <p className="auth-subtitle">Crie sua conta</p>

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

          <button type="submit">Criar conta</button>
        </form>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

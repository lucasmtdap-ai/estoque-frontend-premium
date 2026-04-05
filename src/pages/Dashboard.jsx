import React from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.nome || "Usuário"}.</p>
      <p>Loja: {user?.loja || "-"}</p>

      <a href="/produtos">Ir para produtos</a>
    </div>
  );
}

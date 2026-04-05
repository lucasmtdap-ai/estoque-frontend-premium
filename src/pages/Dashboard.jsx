import React from "react";
import { getUser } from "../services/auth.js";

export default function Dashboard() {
  const user = getUser();

  return (
    <div>
      <div className="cards-grid">
        <div className="dashboard-card">
          <span>Loja</span>
          <h3>{user?.loja || "Rosa Boutique"}</h3>
        </div>

        <div className="dashboard-card">
          <span>Usuário</span>
          <h3>{user?.nome || "Administrador"}</h3>
        </div>

        <div className="dashboard-card">
          <span>Status</span>
          <h3>Online</h3>
        </div>
      </div>

      <div className="dashboard-panel">
        <h2>Bem-vindo</h2>
        <p>Seu SaaS está pronto para gerenciar produtos da sua loja.</p>
      </div>
    </div>
  );
}

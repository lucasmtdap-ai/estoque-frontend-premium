import React from "react";
import { NavLink } from "react-router-dom";
import { getUser, logout } from "../services/auth.js";

export default function Sidebar() {
  const user = getUser();

  function sair() {
    logout();
    window.location.href = "/login";
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <h2>Rosa Boutique</h2>
          <p>Painel SaaS</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/produtos" className="nav-link">
            Produtos
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <strong>{user?.nome || "Usuário"}</strong>
          <span>{user?.loja || user?.email || ""}</span>
        </div>

        <button className="logout-btn" onClick={sair}>
          Sair
        </button>
      </div>
    </aside>
  );
}

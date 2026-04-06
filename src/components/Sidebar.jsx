import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
 let user = {};

try {
  user = JSON.parse(localStorage.getItem("user") || "{}");
} catch {
  user = {};
}

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <h2>Rosa Boutique</h2>
          <p>Painel Premium</p>
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

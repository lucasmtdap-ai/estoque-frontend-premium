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
    <aside className="sidebar-final">
      <div>
        <div className="sidebar-brand-final">
          <div className="brand-icon">RB</div>
          <div>
            <h2>Rosa Boutique</h2>
            <p>SaaS Premium</p>
          </div>
        </div>

        <nav className="sidebar-nav-final">
          <NavLink to="/" end className="nav-link-final">
            Dashboard
          </NavLink>

          <NavLink to="/produtos" className="nav-link-final">
            Produtos
          </NavLink>

          <NavLink to="/vendas" className="nav-link-final">
            Vendas
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer-final">
        <div className="sidebar-user-final">
          <strong>{user?.nome || "Usuário"}</strong>
          <span>{user?.loja || user?.email || ""}</span>
        </div>

        <button className="logout-btn-final" onClick={sair}>
          Sair do sistema
        </button>
      </div>
    </aside>
  );
}

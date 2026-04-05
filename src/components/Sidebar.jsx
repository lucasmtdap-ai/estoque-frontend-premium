import { Link, useLocation } from "react-router-dom";
import { logout, getUser } from "../services/auth";

export default function Sidebar() {
  const location = useLocation();
  const user = getUser();

  function sair() {
    logout();
    window.location.href = "/";
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Rosa Boutique</h2>
        <p>Painel SaaS</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </Link>

        <Link
          to="/produtos"
          className={location.pathname === "/produtos" ? "nav-link active" : "nav-link"}
        >
          Produtos
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <strong>{user?.nome || "Usuário"}</strong>
          <span>{user?.email || ""}</span>
        </div>

        <button className="logout-btn" onClick={sair}>
          Sair
        </button>
      </div>
    </aside>
  );
}

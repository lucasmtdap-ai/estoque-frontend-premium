import React from "react";

export default function Sidebar({ pagina, setPagina }) {
  const itens = [
    { id: "dashboard", label: "Dashboard", icon: "▣" },
    { id: "produtos", label: "Produtos", icon: "◫" },
    { id: "categorias", label: "Categorias", icon: "⌁" },
    { id: "marcas", label: "Marcas", icon: "◎" },
    { id: "fornecedores", label: "Fornecedores", icon: "◌" },
    { id: "movimentacoes", label: "Movimentações", icon: "⇄" },
    { id: "vendas", label: "Vendas", icon: "◍" },
    { id: "clientes", label: "Clientes", icon: "◉" },
    { id: "relatorios", label: "Relatórios", icon: "▤" },
    { id: "financeiro", label: "Financeiro", icon: "◈" },
    { id: "usuarios", label: "Usuários", icon: "◐" },
    { id: "configuracoes", label: "Configurações", icon: "⚙" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">🛍</div>
        <div>
          <h2>StockPro</h2>
          <p>Gestão de Estoque</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {itens.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${pagina === item.id ? "active" : ""}`}
            onClick={() =>
              item.id === "dashboard" || item.id === "produtos"
                ? setPagina(item.id)
                : null
            }
            disabled={item.id !== "dashboard" && item.id !== "produtos"}
            title={
              item.id !== "dashboard" && item.id !== "produtos"
                ? "Página visual por enquanto"
                : ""
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-box">
          <div className="user-avatar">JA</div>
          <div>
            <strong>João Admin</strong>
            <p>Proprietário</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

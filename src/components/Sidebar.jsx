export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>Rosa Boutique</h2>

      <div className="menu-item" onClick={() => setPage("dashboard")}>
        Dashboard
      </div>

      <div className="menu-item" onClick={() => setPage("produtos")}>
        Produtos
      </div>
    </div>
  );
}

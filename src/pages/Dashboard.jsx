import { useEffect, useState } from "react";
import api from "../services/api";
import AppLayout from "../layout/appLayout";

export default function Dashboard() {
  const [produtos, setProdutos] = useState([]);

  async function load() {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch {
      alert("Erro ao carregar dashboard");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const totalProdutos = produtos.length;
  const estoqueBaixo = produtos.filter((p) => Number(p.estoque || 0) <= 3).length;
  const valorTotal = produtos.reduce(
    (acc, p) => acc + Number(p.preco || 0) * Number(p.estoque || 0),
    0
  );
  const semEstoque = produtos.filter((p) => Number(p.estoque || 0) <= 0).length;

  return (
    <AppLayout
      titulo="Dashboard"
      subtitulo="Visão geral da sua loja"
    >
      <div className="cards-grid">
        <div className="dashboard-card">
          <span>Total de produtos</span>
          <h3>{totalProdutos}</h3>
        </div>

        <div className="dashboard-card">
          <span>Valor em estoque</span>
          <h3>R$ {valorTotal.toFixed(2)}</h3>
        </div>

        <div className="dashboard-card">
          <span>Estoque baixo</span>
          <h3>{estoqueBaixo}</h3>
        </div>

        <div className="dashboard-card">
          <span>Sem estoque</span>
          <h3>{semEstoque}</h3>
        </div>
      </div>

      <div className="dashboard-panel">
        <h2>Alertas rápidos</h2>

        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul className="alert-list">
            {produtos
              .filter((p) => Number(p.estoque || 0) <= 3)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id}>
                  <strong>{p.nome}</strong> — estoque: {p.estoque}
                </li>
              ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}

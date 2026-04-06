import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(data);
    } catch {
      setUser({});
    }
  }, []);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get("/produtos");
        setProdutos(Array.isArray(data) ? data : []);
      } catch {
        setProdutos([]);
      }
    }

    carregar();
  }, []);

  const totalProdutos = produtos.length;

  const valorTotal = useMemo(() => {
    return produtos.reduce((total, p) => {
      return total + Number(p.preco || 0);
    }, 0);
  }, [produtos]);

  const lucroTotal = useMemo(() => {
    return produtos.reduce((total, p) => {
      return total + (Number(p.preco || 0) - Number(p.custo || 0));
    }, 0);
  }, [produtos]);

  const estoqueBaixo = useMemo(() => {
    return produtos.filter((p) => Number(p.estoque || 0) <= 3).length;
  }, [produtos]);

  return (
    <div className="premium-dashboard">
      <div className="premium-hero">
        <div>
          <span className="hero-badge">Painel inteligente</span>
          <h1 className="hero-title">Dashboard Premium</h1>
          <p className="hero-subtitle">
            Acompanhe produtos, lucro e alertas de estoque em tempo real.
          </p>
        </div>

        <div className="hero-user-card">
          <small>Conta conectada</small>
          <strong>{user?.nome || "Usuário"}</strong>
          <span>{user?.email || "Rosa Boutique"}</span>
        </div>
      </div>

      <div className="premium-cards-grid">
        <div className="premium-stat-card pink">
          <div className="stat-label">Total de produtos</div>
          <div className="stat-value">{totalProdutos}</div>
          <div className="stat-note">Itens cadastrados no sistema</div>
        </div>

        <div className="premium-stat-card purple">
          <div className="stat-label">Valor total</div>
          <div className="stat-value">R$ {valorTotal.toFixed(2)}</div>
          <div className="stat-note">Soma dos preços de venda</div>
        </div>

        <div className="premium-stat-card gold">
          <div className="stat-label">Lucro total</div>
          <div className="stat-value">R$ {lucroTotal.toFixed(2)}</div>
          <div className="stat-note">Venda menos custo</div>
        </div>

        <div className="premium-stat-card red">
          <div className="stat-label">Estoque baixo</div>
          <div className="stat-value">{estoqueBaixo}</div>
          <div className="stat-note">Produtos com estoque menor ou igual a 3</div>
        </div>
      </div>

      <div className="premium-dashboard-grid">
        <section className="premium-panel">
          <div className="panel-header">
            <h2>Resumo da operação</h2>
            <p>Visão geral do seu sistema</p>
          </div>

          <div className="summary-list">
            <div className="summary-row">
              <span>Loja</span>
              <strong>{user?.loja || "Rosa Boutique"}</strong>
            </div>

            <div className="summary-row">
              <span>Produtos cadastrados</span>
              <strong>{totalProdutos}</strong>
            </div>

            <div className="summary-row">
              <span>Valor total em cadastro</span>
              <strong>R$ {valorTotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Lucro total estimado</span>
              <strong>R$ {lucroTotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Itens com estoque baixo</span>
              <strong>{estoqueBaixo}</strong>
            </div>
          </div>
        </section>

        <section className="premium-panel">
          <div className="panel-header">
            <h2>Alertas</h2>
            <p>Produtos que precisam de atenção</p>
          </div>

          {estoqueBaixo === 0 ? (
            <div className="empty-chart">
              <p>Nenhum produto com estoque baixo no momento.</p>
            </div>
          ) : (
            <div className="summary-list">
              {produtos
                .filter((p) => Number(p.estoque || 0) <= 3)
                .map((p) => (
                  <div className="summary-row" key={p.id}>
                    <span>{p.nome}</span>
                    <strong>Estoque: {Number(p.estoque || 0)}</strong>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

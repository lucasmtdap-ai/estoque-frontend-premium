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
    return produtos.reduce((total, p) => total + Number(p.preco || 0), 0);
  }, [produtos]);

  // lucro automático simples: 30% do valor total
  const lucroEstimado = useMemo(() => {
    return valorTotal * 0.3;
  }, [valorTotal]);

  const graficoData = useMemo(() => {
    if (!produtos.length) return [];

    const maxPreco = Math.max(...produtos.map((p) => Number(p.preco || 0)), 1);

    return produtos.slice(0, 8).map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco || 0),
      altura: Math.max((Number(produto.preco || 0) / maxPreco) * 180, 18)
    }));
  }, [produtos]);

  return (
    <div className="premium-dashboard">
      <div className="premium-hero">
        <div>
          <span className="hero-badge">Painel inteligente</span>
          <h1 className="hero-title">Dashboard Premium</h1>
          <p className="hero-subtitle">
            Acompanhe seus produtos, faturamento e lucro estimado em um só lugar.
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
          <div className="stat-note">Soma dos produtos cadastrados</div>
        </div>

        <div className="premium-stat-card gold">
          <div className="stat-label">Lucro estimado</div>
          <div className="stat-value">R$ {lucroEstimado.toFixed(2)}</div>
          <div className="stat-note">Cálculo simples de 30% sobre o total</div>
        </div>
      </div>

      <div className="premium-dashboard-grid">
        <section className="premium-panel">
          <div className="panel-header">
            <h2>Gráfico de produtos</h2>
            <p>Valor dos produtos cadastrados</p>
          </div>

          {graficoData.length === 0 ? (
            <div className="empty-chart">
              <p>Nenhum produto suficiente para exibir no gráfico.</p>
            </div>
          ) : (
            <div className="bar-chart">
              {graficoData.map((item) => (
                <div className="bar-item" key={item.id}>
                  <div
                    className="bar-column"
                    style={{ height: `${item.altura}px` }}
                    title={`${item.nome} - R$ ${item.preco.toFixed(2)}`}
                  />
                  <span className="bar-price">R$ {item.preco.toFixed(2)}</span>
                  <span className="bar-name">{item.nome}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="premium-panel">
          <div className="panel-header">
            <h2>Resumo rápido</h2>
            <p>Visão geral da sua operação</p>
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
              <span>Lucro estimado atual</span>
              <strong>R$ {lucroEstimado.toFixed(2)}</strong>
            </div>
          </div>

          <div className="dashboard-tip">
            <h3>Dica</h3>
            <p>
              Quando quiser, o próximo passo é colocar custo do produto para o
              lucro ficar exato.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

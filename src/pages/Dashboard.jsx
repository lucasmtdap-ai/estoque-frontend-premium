import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

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
        const [produtosRes, vendasRes] = await Promise.all([
          api.get("/produtos"),
          api.get("/vendas")
        ]);

        setProdutos(Array.isArray(produtosRes.data) ? produtosRes.data : []);
        setVendas(Array.isArray(vendasRes.data) ? vendasRes.data : []);
      } catch {
        setProdutos([]);
        setVendas([]);
      }
    }

    carregar();
  }, []);

  const totalProdutos = produtos.length;

  const valorTotal = useMemo(() => {
    return produtos.reduce((total, p) => total + Number(p.preco || 0), 0);
  }, [produtos]);

  const lucroTotal = useMemo(() => {
    return produtos.reduce(
      (total, p) => total + (Number(p.preco || 0) - Number(p.custo || 0)),
      0
    );
  }, [produtos]);

  const estoqueBaixo = useMemo(() => {
    return produtos.filter((p) => Number(p.estoque || 0) <= 3).length;
  }, [produtos]);

  const totalVendas = vendas.length;

  const valorVendido = useMemo(() => {
    return vendas.reduce((total, v) => total + Number(v.valor_total || 0), 0);
  }, [vendas]);

  const categoriasResumo = useMemo(() => {
    const mapa = {};
    produtos.forEach((p) => {
      const cat = p.categoria || "Sem categoria";
      if (!mapa[cat]) mapa[cat] = 0;
      mapa[cat] += 1;
    });

    return Object.entries(mapa)
      .map(([categoria, quantidade]) => ({ categoria, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [produtos]);

  const plano = user?.plano || "basico";

  return (
    <div className="premium-dashboard">
      {plano !== "premium" && (
        <div className="upgrade-box">
          <strong>🚀 Desbloqueie o Premium</strong>
          <p>Tenha acesso ilimitado a produtos, vendas e relatórios.</p>
          <button onClick={() => alert("Entre em contato para ativar premium")}>
            Ativar Premium
          </button>
        </div>
      )}

      <div className="premium-hero">
        <div>
          <span className="hero-badge">Painel inteligente</span>
          <h1 className="hero-title">Dashboard Premium</h1>
          <p className="hero-subtitle">
            Acompanhe produtos, lucro, estoque, vendas e categorias em tempo real.
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
        </div>

        <div className="premium-stat-card purple">
          <div className="stat-label">Valor total</div>
          <div className="stat-value">R$ {valorTotal.toFixed(2)}</div>
        </div>

        <div className="premium-stat-card gold">
          <div className="stat-label">Lucro total</div>
          <div className="stat-value">R$ {lucroTotal.toFixed(2)}</div>
        </div>

        <div className="premium-stat-card red">
          <div className="stat-label">Estoque baixo</div>
          <div className="stat-value">{estoqueBaixo}</div>
        </div>

        <div className="premium-stat-card blue">
          <div className="stat-label">Total de vendas</div>
          <div className="stat-value">{totalVendas}</div>
        </div>

        <div className="premium-stat-card green">
          <div className="stat-label">Valor vendido</div>
          <div className="stat-value">R$ {valorVendido.toFixed(2)}</div>
        </div>
      </div>

      <div className="premium-dashboard-grid" style={{ marginTop: "20px" }}>
        <section className="premium-panel">
          <div className="panel-header">
            <h2>Resumo por categoria</h2>
            <p>Organização dos seus produtos</p>
          </div>

          {categoriasResumo.length === 0 ? (
            <div className="empty-chart">
              <p>Nenhuma categoria cadastrada ainda.</p>
            </div>
          ) : (
            <div className="summary-list">
              {categoriasResumo.map((item) => (
                <div className="summary-row" key={item.categoria}>
                  <span>{item.categoria}</span>
                  <strong>{item.quantidade} produtos</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="premium-panel">
          <div className="panel-header">
            <h2>Alertas</h2>
            <p>Itens com estoque baixo</p>
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

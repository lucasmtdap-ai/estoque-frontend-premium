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

  const lucroTotal = useMemo(() => {
    return produtos.reduce(
      (total, p) => total + (Number(p.preco || 0) - Number(p.custo || 0)),
      0
    );
  }, [produtos]);

  return (
    <div className="premium-dashboard">
      <div className="premium-hero">
        <div>
          <span className="hero-badge">Painel inteligente</span>
          <h1 className="hero-title">Dashboard Premium</h1>
          <p className="hero-subtitle">
            Acompanhe seus produtos, faturamento e lucro real em um só lugar.
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
      </div>
    </div>
  );
}

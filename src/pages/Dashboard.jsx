import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Dashboard() {
  const user = let user = {};

try {
  user = JSON.parse(localStorage.getItem("user") || "{}");
} catch {
  user = {};
  }
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get("/produtos");
        setProdutos(data);
      } catch {
        setProdutos([]);
      }
    }

    carregar();
  }, []);

  const totalProdutos = produtos.length;
  const valorEstoque = produtos.reduce(
    (acc, p) => acc + Number(p.preco || 0),
    0
  );

  return (
    <div>
      <div className="cards-grid">
        <div className="dashboard-card">
          <span>Total de produtos</span>
          <h3>{totalProdutos}</h3>
          <p>Itens cadastrados no sistema</p>
        </div>

        <div className="dashboard-card">
          <span>Valor total</span>
          <h3>R$ {valorEstoque.toFixed(2)}</h3>
          <p>Soma dos produtos cadastrados</p>
        </div>

        <div className="dashboard-card">
          <span>Usuário</span>
          <h3>{user?.nome || "Usuário"}</h3>
          <p>Conta conectada ao painel</p>
        </div>
      </div>

      <div className="dashboard-panel">
        <h2>Bem-vindo ao sistema</h2>
        <p>
          Seu SaaS já está com login, dashboard e CRUD mínimo funcionando.
        </p>
      </div>
    </div>
  );
}

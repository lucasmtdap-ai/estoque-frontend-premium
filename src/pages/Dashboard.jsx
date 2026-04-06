import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [produtos, setProdutos] = useState([]);

  // carregar usuário
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(data);
    } catch {
      setUser({});
    }
  }, []);

  // carregar produtos
  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get("/produtos");
        setProdutos(data);
      } catch (err) {
        console.log("Erro ao carregar produtos");
      }
    }

    carregar();
  }, []);

  // calcular total
  const totalProdutos = produtos.length;

  // calcular valor total
  const valorTotal = produtos.reduce((total, p) => {
    return total + Number(p.preco || 0);
  }, 0);

  return (
    <div style={{ padding: 30 }}>
      <h1>Painel</h1>
      <p>{user?.nome || "Usuário"}</p>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        
        <div style={card}>
          <h3>Total de produtos</h3>
          <p>{totalProdutos}</p>
        </div>

        <div style={card}>
          <h3>Valor total</h3>
          <p>R$ {valorTotal.toFixed(2)}</p>
        </div>

        <div style={card}>
          <h3>Usuário</h3>
          <p>{user?.email || "Sem login"}</p>
        </div>

      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Bem-vindo ao sistema</h2>
        <p>Seu SaaS está funcionando com dados reais 🚀</p>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  minWidth: 200,
};

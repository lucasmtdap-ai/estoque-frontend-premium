import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregarTudo() {
    try {
      const [produtosRes, vendasRes] = await Promise.all([
        api.get("/produtos"),
        api.get("/vendas")
      ]);

      setProdutos(produtosRes.data || []);
      setVendas(vendasRes.data || []);
    } catch {
      setErro("Erro ao carregar dados de vendas");
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  async function registrarVenda(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      await api.post("/vendas", {
        produtoId: Number(produtoId),
        quantidade: Number(quantidade)
      });

      setProdutoId("");
      setQuantidade("");
      setSucesso("Venda registrada com sucesso");
      carregarTudo();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao registrar venda");
    }
  }

  return (
    <div className="vendas-container">
      <h1>Vendas</h1>

      {erro ? <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p> : null}
      {sucesso ? <p style={{ color: "green", fontWeight: "bold" }}>{sucesso}</p> : null}

      <form onSubmit={registrarVenda} className="venda-form">
        <select
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} — Estoque: {p.estoque}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <button type="submit">Registrar venda</button>
      </form>

      <div className="vendas-grid">
        {vendas.length === 0 ? (
          <p>Nenhuma venda registrada.</p>
        ) : (
          vendas.map((v) => (
            <div key={v.id} className="venda-card">
              <h2>{v.produto_nome}</h2>
              <p>📦 Quantidade: {v.quantidade}</p>
              <p>💰 Unitário: R$ {Number(v.valor_unitario || 0).toFixed(2)}</p>
              <p>🧾 Total: R$ {Number(v.valor_total || 0).toFixed(2)}</p>
              <p>🕒 {new Date(v.created_at).toLocaleString("pt-BR")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

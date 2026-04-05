import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estoque, setEstoque] = useState("");
  const [erro, setErro] = useState("");

  async function carregarProdutos() {
    try {
      const { data } = await api.get("/produtos");
      setProdutos(data);
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao carregar produtos.");
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function cadastrarProduto(e) {
    e.preventDefault();
    setErro("");

    try {
      await api.post("/produtos", {
        nome,
        preco: Number(preco),
        categoria,
        estoque: Number(estoque)
      });

      setNome("");
      setPreco("");
      setCategoria("");
      setEstoque("");
      carregarProdutos();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao cadastrar produto.");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Produtos</h1>

      {erro ? <p style={{ color: "red" }}>{erro}</p> : null}

      <form onSubmit={cadastrarProduto} style={{ display: "grid", gap: "10px", maxWidth: "400px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />

        <button type="submit">Cadastrar produto</button>
      </form>

      <div>
        {produtos.map((produto) => (
          <div key={produto.id} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px", borderRadius: "8px" }}>
            <strong>{produto.nome}</strong>
            <p>Categoria: {produto.categoria}</p>
            <p>Preço: R$ {Number(produto.preco || 0).toFixed(2)}</p>
            <p>Estoque: {produto.estoque}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

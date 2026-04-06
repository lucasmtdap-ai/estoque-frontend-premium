import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  async function carregar() {
    const { data } = await api.get("/produtos");
    setProdutos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function cadastrar(e) {
    e.preventDefault();

    await api.post("/produtos", {
      nome,
      preco,
      quantidade
    });

    setNome("");
    setPreco("");
    setQuantidade("");
    carregar();
  }

  async function excluir(id) {
    await api.delete(`/produtos/${id}`);
    carregar();
  }

  return (
    <div className="produtos-container">

      <h1>Produtos</h1>

      {/* FORM */}
      <form onSubmit={cadastrar} className="produto-form">
        <input
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <input
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      {/* LISTA */}
      <div className="produtos-grid">
        {produtos.map((p) => (
          <div className="produto-card" key={p.id}>
            
            <h2>{p.nome}</h2>

            <p>💰 R$ {Number(p.preco).toFixed(2)}</p>
            <p>📦 Estoque: {p.quantidade}</p>

            <div className="acoes">
              <button className="btn-excluir" onClick={() => excluir(p.id)}>
                Excluir
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

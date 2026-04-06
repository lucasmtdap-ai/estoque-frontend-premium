import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const [editando, setEditando] = useState(null);

  async function carregar() {
    const { data } = await api.get("/produtos");
    setProdutos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function cadastrar(e) {
    e.preventDefault();

    await api.post("/produtos", { nome, preco });

    setNome("");
    setPreco("");
    carregar();
  }

  async function excluir(id) {
    await api.delete(`/produtos/${id}`);
    carregar();
  }

  async function salvarEdicao() {
    await api.put(`/produtos/${editando.id}`, {
      nome: editando.nome,
      preco: editando.preco
    });

    setEditando(null);
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

        <button type="submit">Cadastrar</button>
      </form>

      {/* LISTA */}
      <div className="produtos-grid">
        {produtos.map((p) => (
          <div className="produto-card" key={p.id}>
            <h2>{p.nome}</h2>
            <p>💰 R$ {Number(p.preco).toFixed(2)}</p>

            {/* ALERTA VISUAL (simples) */}
            {Number(p.preco) < 20 && (
              <span className="alerta">⚠ Produto barato</span>
            )}

            <div className="acoes">
              <button onClick={() => setEditando(p)}>Editar</button>

              <button className="btn-excluir" onClick={() => excluir(p.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editando && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Produto</h2>

            <input
              value={editando.nome}
              onChange={(e) =>
                setEditando({ ...editando, nome: e.target.value })
              }
            />

            <input
              value={editando.preco}
              onChange={(e) =>
                setEditando({ ...editando, preco: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={salvarEdicao}>Salvar</button>

              <button onClick={() => setEditando(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

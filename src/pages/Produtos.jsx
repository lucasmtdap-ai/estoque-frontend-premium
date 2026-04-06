import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [custo, setCusto] = useState("");
  const [estoque, setEstoque] = useState("");
  const [editando, setEditando] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregar() {
    try {
      const { data } = await api.get("/produtos");
      setProdutos(data);
    } catch {
      setErro("Erro ao carregar produtos");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      await api.post("/produtos", {
        nome,
        preco: Number(preco),
        custo: Number(custo || 0),
        estoque: Number(estoque || 0)
      });

      setNome("");
      setPreco("");
      setCusto("");
      setEstoque("");
      setSucesso("Produto cadastrado com sucesso");
      carregar();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao cadastrar produto");
    }
  }

  async function excluir(id) {
    try {
      await api.delete(`/produtos/${id}`);
      carregar();
    } catch {
      setErro("Erro ao excluir produto");
    }
  }

  async function salvarEdicao() {
    try {
      await api.put(`/produtos/${editando.id}`, {
        nome: editando.nome,
        preco: Number(editando.preco),
        custo: Number(editando.custo || 0),
        estoque: Number(editando.estoque || 0)
      });

      setEditando(null);
      carregar();
    } catch {
      setErro("Erro ao editar produto");
    }
  }

  return (
    <div className="produtos-container">
      <h1>Produtos</h1>

      {erro ? <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p> : null}
      {sucesso ? <p style={{ color: "green", fontWeight: "bold" }}>{sucesso}</p> : null}

      <form onSubmit={cadastrar} className="produto-form">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Preço de venda"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Custo do produto"
          value={custo}
          onChange={(e) => setCusto(e.target.value)}
        />

        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <div className="produtos-grid">
        {produtos.map((p) => {
          const lucro = Number(p.preco || 0) - Number(p.custo || 0);
          const baixo = Number(p.estoque || 0) <= 3;

          return (
            <div className="produto-card" key={p.id}>
              <h2>{p.nome}</h2>
              <p>💰 Venda: R$ {Number(p.preco || 0).toFixed(2)}</p>
              <p>🧾 Custo: R$ {Number(p.custo || 0).toFixed(2)}</p>
              <p>📈 Lucro: R$ {lucro.toFixed(2)}</p>
              <p>📦 Estoque: {Number(p.estoque || 0)}</p>

              {lucro <= 0 && <span className="alerta">⚠ Sem lucro</span>}
              {baixo && <span className="alerta-estoque">🔴 Estoque baixo</span>}

              <div className="acoes">
                <button type="button" onClick={() => setEditando(p)}>
                  Editar
                </button>

                <button
                  type="button"
                  className="btn-excluir"
                  onClick={() => excluir(p.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>

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

            <input
              value={editando.custo || ""}
              onChange={(e) =>
                setEditando({ ...editando, custo: e.target.value })
              }
            />

            <input
              value={editando.estoque || ""}
              onChange={(e) =>
                setEditando({ ...editando, estoque: e.target.value })
              }
            />

            <div className="modal-actions">
              <button type="button" onClick={salvarEdicao}>
                Salvar
              </button>

              <button type="button" onClick={() => setEditando(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

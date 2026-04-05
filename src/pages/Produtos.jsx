import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    categoria: "",
    estoque: ""
  });
  const [editandoId, setEditandoId] = useState(null);
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvarProduto(e) {
    e.preventDefault();
    setErro("");

    try {
      const payload = {
        nome: form.nome,
        preco: Number(form.preco),
        categoria: form.categoria,
        estoque: Number(form.estoque || 0)
      };

      if (editandoId) {
        await api.put(`/produtos/${editandoId}`, payload);
      } else {
        await api.post("/produtos", payload);
      }

      setForm({
        nome: "",
        preco: "",
        categoria: "",
        estoque: ""
      });
      setEditandoId(null);
      carregarProdutos();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao salvar produto.");
    }
  }

  function editarProduto(produto) {
    setForm({
      nome: produto.nome || "",
      preco: produto.preco || "",
      categoria: produto.categoria || "",
      estoque: produto.estoque || ""
    });
    setEditandoId(produto.id);
  }

  async function excluirProduto(id) {
    try {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao excluir produto.");
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h3>Produtos</h3>
          <p>Cadastre, edite e exclua produtos</p>
        </div>
      </div>

      {erro ? <div className="alert alert-error">{erro}</div> : null}

      <form className="product-form" onSubmit={salvarProduto}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
        />
        <input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
        />
        <input
          name="estoque"
          placeholder="Estoque"
          value={form.estoque}
          onChange={handleChange}
        />

        <button type="submit">
          {editandoId ? "Atualizar produto" : "Cadastrar produto"}
        </button>
      </form>

      <div className="products-list">
        {produtos.length === 0 ? (
          <div className="empty-box">Nenhum produto cadastrado.</div>
        ) : (
          produtos.map((produto) => (
            <div className="product-card" key={produto.id}>
              <div>
                <strong>{produto.nome}</strong>
                <p>Categoria: {produto.categoria || "-"}</p>
                <p>Preço: R$ {Number(produto.preco || 0).toFixed(2)}</p>
                <p>Estoque: {produto.estoque}</p>
              </div>

              <div className="action-buttons">
                <button
                  className="secondary-btn"
                  onClick={() => editarProduto(produto)}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => excluirProduto(produto.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

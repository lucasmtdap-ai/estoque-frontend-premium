import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro("");
      const { data } = await api.get("/produtos");
      setProdutos(data);
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function limparFormulario() {
    setNome("");
    setPreco("");
    setEditandoId(null);
  }

  function preencherEdicao(produto) {
    setNome(produto.nome || "");
    setPreco(String(produto.preco || ""));
    setEditandoId(produto.id);
    setErro("");
    setSucesso("");
  }

  async function salvarProduto(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      setCarregando(true);

      const payload = {
        nome,
        preco: Number(preco)
      };

      if (editandoId) {
        await api.put(`/produtos/${editandoId}`, payload);
        setSucesso("Produto atualizado com sucesso.");
      } else {
        await api.post("/produtos", payload);
        setSucesso("Produto cadastrado com sucesso.");
      }

      limparFormulario();
      await carregarProdutos();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao salvar produto.");
    } finally {
      setCarregando(false);
    }
  }

  async function excluirProduto(id) {
    const confirmar = window.confirm("Deseja excluir este produto?");
    if (!confirmar) return;

    try {
      setCarregando(true);
      setErro("");
      setSucesso("");

      await api.delete(`/produtos/${id}`);
      setSucesso("Produto excluído com sucesso.");

      if (editandoId === id) {
        limparFormulario();
      }

      await carregarProdutos();
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao excluir produto.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px" }}>
      <h1>Produtos</h1>

      {erro ? <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p> : null}
      {sucesso ? <p style={{ color: "green", fontWeight: "bold" }}>{sucesso}</p> : null}
      {carregando ? <p>Carregando...</p> : null}

      <form
        onSubmit={salvarProduto}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "500px",
          marginBottom: "30px"
        }}
      >
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
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">
            {editandoId ? "Atualizar produto" : "Cadastrar produto"}
          </button>

          {editandoId ? (
            <button type="button" onClick={limparFormulario}>
              Cancelar edição
            </button>
          ) : null}
        </div>
      </form>

      <div style={{ display: "grid", gap: "12px" }}>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          produtos.map((produto) => (
            <div
              key={produto.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "12px"
              }}
            >
              <strong>{produto.nome}</strong>
              <p>Preço: R$ {Number(produto.preco || 0).toFixed(2)}</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => preencherEdicao(produto)}>
                  Editar
                </button>

                <button type="button" onClick={() => excluirProduto(produto.id)}>
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

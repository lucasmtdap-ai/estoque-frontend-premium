import React, { useEffect, useState, useMemo } from "react";

const API = "https://stock-backend-hp9t.onrender.com/produtos";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);
const [mostrarForm, setMostrarForm] = useState(false);
  async function carregar() {
    try {
      const res = await fetch(API);
      const dados = await res.json();
      setProdutos(Array.isArray(dados) ? dados : []);
    } catch (e) {
      console.error(e);
      alert("Erro ao carregar produtos.");
    }
  }

  async function salvar(e) {
    e.preventDefault();

    if (!nome || !preco) {
      alert("Preencha nome e preço.");
      return;
    }

    try {
      setSalvando(true);

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          preco: Number(preco),
        }),
      });

      await res.json();

      setNome("");
      setPreco("");
      await carregar();

    } catch (e) {
      console.error(e);
      alert("Erro ao salvar produto.");
    } finally {
      setSalvando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const filtrados = useMemo(() => {
    return produtos.filter((p) =>
      (p.nome || "").toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Estoque</h1>

      <form onSubmit={salvar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button type="submit">
          {salvando ? "Salvando..." : "Salvar produto"}
        </button>
      </form>

      <input
        placeholder="Buscar"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <ul>
        {filtrados.map((p, i) => (
          <li key={i}>
            {p.nome} - R$ {p.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

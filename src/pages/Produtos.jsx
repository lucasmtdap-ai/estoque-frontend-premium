import { useState } from "react";

export default function Produtos({ produtos, setProdutos }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  function adicionar() {
    const novo = { id: Date.now(), nome, preco };
    setProdutos([...produtos, novo]);
    setNome("");
    setPreco("");
  }

  function excluir(id) {
    setProdutos(produtos.filter(p => p.id !== id));
  }

  return (
    <div className="card">
      <h2>Produtos</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <button onClick={adicionar}>Adicionar</button>

      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>
                <button onClick={() => excluir(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

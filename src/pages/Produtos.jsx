import React, { useMemo, useState } from "react";

const initialForm = {
  nome: "",
  preco: "",
  categoria: "",
  estoque: "",
};

export default function Produtos({
  API,
  produtos,
  setProdutos,
  carregarProdutos,
  carregando,
}) {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [form, setForm] = useState(initialForm);

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return produtos.filter((p) => {
      return (
        (p.nome || "").toLowerCase().includes(termo) ||
        (p.categoria || "").toLowerCase().includes(termo)
      );
    });
  }, [produtos, busca]);

  function abrirNovo() {
    setEditandoId(null);
    setForm(initialForm);
    setErro("");
    setSucesso("");
    setModalAberto(true);
  }

  function abrirEditar(produto) {
    setEditandoId(produto.id);
    setForm({
      nome: produto.nome || "",
      preco: produto.preco ?? "",
      categoria: produto.categoria || "",
      estoque: produto.estoque ?? "",
    });
    setErro("");
    setSucesso("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditandoId(null);
    setForm(initialForm);
  }

  function onChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function salvar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!form.nome.trim() || form.preco === "") {
      setErro("Preencha nome e preço.");
      return;
    }

    try {
      setSalvando(true);

      const payload = {
        nome: form.nome.trim(),
        preco: Number(form.preco),
        categoria: form.categoria.trim(),
        estoque: Number(form.estoque || 0),
      };

      const url = editandoId ? `${API}/${editandoId}` : API;
      const method = editandoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao salvar produto");

      const dados = await res.json();

      if (editandoId) {
        setProdutos((prev) => prev.map((p) => (p.id === editandoId ? dados : p)));
        setSucesso("Produto atualizado com sucesso.");
      } else {
        setProdutos((prev) => [...prev, dados]);
        setSucesso("Produto criado com sucesso.");
      }

      setTimeout(() => {
        fecharModal();
        setSucesso("");
      }, 600);
    } catch (e) {
      console.error(e);
      setErro("Erro ao salvar produto.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(id) {
    const confirmar = window.confirm("Deseja excluir este produto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");

      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir produto.");
    }
  }

  return (
    <div className="produtos-page">
      <div className="panel panel-full">
        <div className="panel-header products-header">
          <div>
            <h3>Produtos cadastrados</h3>
            <p>Gerencie estoque, categorias e preços</p>
          </div>

          <div className="products-actions">
            <input
              className="search-input"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button className="primary-btn" onClick={abrirNovo}>
              + Novo Produto
            </button>
          </div>
        </div>

        {carregando ? (
          <div className="empty-box">Carregando produtos...</div>
        ) : filtrados.length === 0 ? (
          <div className="empty-box">Nenhum produto encontrado.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) => {
                  const estoque = Number(p.estoque || 0);
                  const total = Number(p.preco || 0) * estoque;

                  return (
                    <tr key={p.id}>
                      <td>
                        <strong>{p.nome}</strong>
                      </td>
                      <td>
                        <span className="category-badge">
                          {p.categoria || "Sem categoria"}
                        </span>
                      </td>
                      <td>R$ {Number(p.preco || 0).toFixed(2)}</td>
                      <td>
                        <span
                          className={`stock-pill ${
                            estoque <= 0 ? "out" : estoque <= 3 ? "low" : "ok"
                          }`}
                        >
                          {estoque}
                        </span>
                      </td>
                      <td>R$ {total.toFixed(2)}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => abrirEditar(p)}>
                            Editar
                          </button>
                          <button className="delete-btn" onClick={() => excluir(p.id)}>
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h3>{editandoId ? "Editar produto" : "Novo produto"}</h3>
                <p>Preencha os dados do produto</p>
              </div>

              <button className="close-btn" onClick={fecharModal}>
                ×
              </button>
            </div>

            {erro ? <div className="alert alert-error">{erro}</div> : null}
            {sucesso ? <div className="alert alert-success">{sucesso}</div> : null}

            <form onSubmit={salvar} className="modal-form">
              <div className="form-group full">
                <label>Nome do produto</label>
                <input
                  value={form.nome}
                  onChange={(e) => onChange("nome", e.target.value)}
                  placeholder="Ex: Camiseta premium"
                />
              </div>

              <div className="form-group">
                <label>Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.preco}
                  onChange={(e) => onChange("preco", e.target.value)}
                  placeholder="Ex: 89.90"
                />
              </div>

              <div className="form-group">
                <label>Estoque</label>
                <input
                  type="number"
                  value={form.estoque}
                  onChange={(e) => onChange("estoque", e.target.value)}
                  placeholder="Ex: 10"
                />
              </div>

              <div className="form-group full">
                <label>Categoria</label>
                <input
                  value={form.categoria}
                  onChange={(e) => onChange("categoria", e.target.value)}
                  placeholder="Ex: Feminina"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="primary-btn" disabled={salvando}>
                  {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Criar produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

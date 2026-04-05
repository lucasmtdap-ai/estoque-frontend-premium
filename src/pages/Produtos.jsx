import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import AppLayout from "../layout/appLayout";

const initialForm = {
  nome: "",
  preco: "",
  categoria: "",
  estoque: ""
};

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(initialForm);

  async function load() {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch {
      alert("Erro ao carregar produtos");
    }
  }

  useEffect(() => {
    load();
  }, []);

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
    setModalAberto(true);
  }

  function abrirEditar(produto) {
    setEditandoId(produto.id);
    setForm({
      nome: produto.nome || "",
      preco: produto.preco || "",
      categoria: produto.categoria || "",
      estoque: produto.estoque || ""
    });
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

      fecharModal();
      load();
    } catch {
      alert("Erro ao salvar produto");
    }
  }

  async function excluir(id) {
    const confirmar = window.confirm("Deseja excluir este produto?");
    if (!confirmar) return;

    try {
      await api.delete(`/produtos/${id}`);
      load();
    } catch {
      alert("Erro ao excluir produto");
    }
  }

  return (
    <AppLayout
      titulo="Produtos"
      subtitulo="Gerencie seus produtos da Rosa Boutique"
    >
      <div className="products-toolbar">
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

      <div className="table-card">
        <table className="products-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.categoria || "Sem categoria"}</td>
                <td>R$ {Number(p.preco || 0).toFixed(2)}</td>
                <td>{p.estoque}</td>
                <td>
                  <div className="table-actions">
                    <button className="edit-btn" onClick={() => abrirEditar(p)}>
                      Editar
                    </button>

                    <button className="delete-btn" onClick={() => excluir(p.id)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{editandoId ? "Editar Produto" : "Novo Produto"}</h3>
              <button className="close-btn" onClick={fecharModal}>
                ×
              </button>
            </div>

            <form onSubmit={salvar} className="modal-form">
              <input
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => onChange("nome", e.target.value)}
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={form.preco}
                onChange={(e) => onChange("preco", e.target.value)}
              />

              <input
                placeholder="Categoria"
                value={form.categoria}
                onChange={(e) => onChange("categoria", e.target.value)}
              />

              <input
                type="number"
                placeholder="Estoque"
                value={form.estoque}
                onChange={(e) => onChange("estoque", e.target.value)}
              />

              <button className="primary-btn">
                {editandoId ? "Salvar alterações" : "Criar produto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

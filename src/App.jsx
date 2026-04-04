import React, { useEffect, useState, useMemo } from "react";

const API = "https://stock-backend-hp9t.onrender.com/produtos";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);
const filtrados = produtos.filter((p) =>
  p.nome.toLowerCase().includes(busca.toLowerCase())
);
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

  const totalProdutos = filtrados.length;
  const valorTotal = filtrados.reduce(
    (acc, p) => acc + Number(p.preco || 0),
    0
  );

  const card = {
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  };

  const input = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  const label = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
    display: "block",
  };

  const botao = {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f9fafb 0%, #eef2ff 50%, #f5f3ff 100%)",
        padding: "30px 16px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              color: "#111827",
            }}
          >
            Rosa Boutique
          </h1>
          <p
            style={{
              marginTop: "8px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Painel simples de estoque conectado ao seu backend
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ ...card, padding: "18px" }}>
            <div style={{ color: "#6b7280", fontSize: "14px" }}>
              Total de produtos
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "30px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {totalProdutos}
            </div>
          </div>

          <div style={{ ...card, padding: "18px" }}>
            <div style={{ color: "#6b7280", fontSize: "14px" }}>
              Valor total
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "30px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              R$ {valorTotal.toFixed(2)}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: "20px",
          }}
        >
          <div style={{ ...card, padding: "20px", height: "fit-content" }}>
            <h2
              style={{
                marginTop: 0,
                marginBottom: "18px",
                color: "#111827",
              }}
            >
              Novo produto
            </h2>

            <form onSubmit={salvar}>
              <div style={{ marginBottom: "14px" }}>
                <label style={label}>Nome do produto</label>
                <input
                  placeholder="Ex: Camisa básica"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={input}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={label}>Preço</label>
                <input
                  placeholder="Ex: 39.90"
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  style={input}
                />
              </div>

              <button type="submit" style={botao} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar produto"}
              </button>
            </form>
          </div>

          <div style={{ ...card, padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                  }}
                >
                  Produtos cadastrados
                </h2>
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Lista atual do estoque
                </p>
              </div>

              <div style={{ minWidth: "260px", flex: 1, maxWidth: "320px" }}>
                <input
                  placeholder="Buscar produto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  style={input}
                />
              </div>
            </div>

            {filtrados.length === 0 ? (
              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                  color: "#6b7280",
                  border: "1px dashed #d1d5db",
                  borderRadius: "14px",
                }}
              >
                Nenhum produto encontrado.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "500px",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "14px",
                          borderBottom: "1px solid #e5e7eb",
                          color: "#374151",
                        }}
                      >
                        Produto
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "14px",
                          borderBottom: "1px solid #e5e7eb",
                          color: "#374151",
                        }}
                      >
                        Preço
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrados.map((p, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            padding: "14px",
                            borderBottom: "1px solid #f1f5f9",
                            color: "#111827",
                            fontWeight: "600",
                          }}
                        >
                          {p.nome}
                        </td>
                        <td
                          style={{
                            padding: "14px",
                            borderBottom: "1px solid #f1f5f9",
                            color: "#059669",
                            fontWeight: "700",
                          }}
                        >
                          R$ {Number(p.preco || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

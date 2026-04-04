import { useEffect, useMemo, useState } from "react";

const API = "https://stock-backend-hp9t.onrender.com/produtos";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          preco: Number(preco)
        })
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
      String(p.nome || "").toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);

  const totalProdutos = produtos.length;
  const valorTotal = produtos.reduce((acc, p) => acc + Number(p.preco || 0), 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "Arial, sans-serif",
        padding: 24
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: "#fff" }}>Estoque Premium</h1>
            <p style={{ marginTop: 8, color: "#94a3b8" }}>
              Painel profissional conectado ao backend
            </p>
          </div>

          <input
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #334155",
              background: "#111827",
              color: "#fff",
              minWidth: 240
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 24
          }}
        >
          <div style={cardStyle}>
            <p style={labelStyle}>Total de produtos</p>
            <h2 style={valueStyle}>{totalProdutos}</h2>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Valor total</p>
            <h2 style={valueStyle}>R$ {valorTotal.toFixed(2)}</h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: 20
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: "#fff" }}>Novo produto</h3>

            <form onSubmit={salvar}>
              <input
                placeholder="Nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Preço"
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                style={inputStyle}
              />

              <button type="submit" style={buttonStyle} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar produto"}
              </button>
            </form>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, color: "#fff" }}>Produtos</h3>

            {filtrados.length === 0 ? (
              <p style={{ color: "#94a3b8" }}>Nenhum produto encontrado.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Produto</th>
                    <th style={thStyle}>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((p, i) => (
                    <tr key={p.id || i}>
                      <td style={tdStyle}>{p.nome}</td>
                      <td style={tdStyle}>R$ {Number(p.preco).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#111827",
  border: "1px solid #1f2937",
  borderRadius: 16,
  padding: 20
};

const labelStyle = {
  margin: 0,
  color: "#94a3b8",
  fontSize: 14
};

const valueStyle = {
  margin: "10px 0 0",
  color: "#fff",
  fontSize: 28
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginBottom: 12,
  padding: 12,
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff"
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "#22c55e",
  color: "#052e16",
  fontWeight: "bold",
  cursor: "pointer"
};

const thStyle = {
  textAlign: "left",
  padding: 12,
  borderBottom: "1px solid #1f2937",
  color: "#94a3b8"
};

const tdStyle = {
  padding: 12,
  borderBottom: "1px solid #1f2937",
  color: "#fff"
};

import React, { useEffect, useMemo, useState } from "react";

const API = "https://stock-backend-hp9t.onrender.com/produtos";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregar() {
    try {
      setErro("");
      const res = await fetch(API);
      if (!res.ok) {
        throw new Error("Falha ao carregar produtos");
      }
      const dados = await res.json();
      setProdutos(Array.isArray(dados) ? dados : []);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar produtos.");
    }
  }

  async function salvar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome.trim() || !preco) {
      setErro("Preencha nome e preço.");
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
          nome: nome.trim(),
          preco: Number(preco),
        }),
      });

      if (!res.ok) {
        throw new Error("Falha ao salvar produto");
      }

      await res.json();

      setNome("");
      setPreco("");
      setSucesso("Produto salvo com sucesso.");
      await carregar();
    } catch (e) {
      console.error(e);
      setErro("Erro ao salvar produto.");
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

  const estilos = {
    pagina: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)",
      padding: "32px 16px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "1120px",
      margin: "0 auto",
    },
    titulo: {
      margin: 0,
      fontSize: "48px",
      lineHeight: 1.1,
      color: "#111827",
      fontWeight: "800",
    },
    subtitulo: {
      marginTop: "10px",
      marginBottom: "24px",
      color: "#6b7280",
      fontSize: "18px",
    },
    gridResumo: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "16px",
      marginBottom: "22px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    },
    cardResumo: {
      padding: "22px",
    },
    legendaResumo: {
      color: "#6b7280",
      fontSize: "15px",
      marginBottom: "10px",
    },
    valorResumo: {
      color: "#111827",
      fontSize: "42px",
      fontWeight: "800",
      margin: 0,
    },
    gridPrincipal: {
      display: "grid",
      gridTemplateColumns: "360px 1fr",
      gap: "20px",
      alignItems: "start",
    },
    cardFormulario: {
      padding: "22px",
      position: "sticky",
      top: "18px",
    },
    cardTabela: {
      padding: "22px",
    },
    h2: {
      marginTop: 0,
      marginBottom: "18px",
      color: "#111827",
      fontSize: "22px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#374151",
      fontSize: "14px",
      fontWeight: "700",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "12px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
      background: "#fff",
    },
    grupo: {
      marginBottom: "16px",
    },
    botao: {
      width: "100%",
      padding: "14px 18px",
      borderRadius: "12px",
      border: "none",
      background: "#111827",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
    },
    topoTabela: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "14px",
      flexWrap: "wrap",
      marginBottom: "16px",
    },
    descricao: {
      margin: "6px 0 0",
      color: "#6b7280",
      fontSize: "14px",
    },
    caixaBusca: {
      minWidth: "260px",
      maxWidth: "320px",
      flex: 1,
    },
    tabelaWrap: {
      overflowX: "auto",
    },
    tabela: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "520px",
    },
    th: {
      textAlign: "left",
      padding: "14px",
      borderBottom: "1px solid #e5e7eb",
      color: "#374151",
      fontSize: "14px",
      background: "#f9fafb",
    },
    tdNome: {
      padding: "14px",
      borderBottom: "1px solid #f1f5f9",
      color: "#111827",
      fontWeight: "600",
      fontSize: "15px",
    },
    tdPreco: {
      padding: "14px",
      borderBottom: "1px solid #f1f5f9",
      color: "#059669",
      fontWeight: "700",
      fontSize: "15px",
    },
    vazio: {
      padding: "32px",
      border: "1px dashed #d1d5db",
      borderRadius: "14px",
      textAlign: "center",
      color: "#6b7280",
    },
    alertaErro: {
      marginBottom: "14px",
      padding: "12px 14px",
      borderRadius: "12px",
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca",
      fontSize: "14px",
      fontWeight: "600",
    },
    alertaSucesso: {
      marginBottom: "14px",
      padding: "12px 14px",
      borderRadius: "12px",
      background: "#ecfdf5",
      color: "#065f46",
      border: "1px solid #a7f3d0",
      fontSize: "14px",
      fontWeight: "600",
    },
  };

  return (
    <div style={estilos.pagina}>
      <div style={estilos.container}>
        <h1 style={estilos.titulo}>Rosa Boutique</h1>
        <p style={estilos.subtitulo}>
          Painel simples de estoque conectado ao seu backend
        </p>

        <div style={estilos.gridResumo}>
          <div style={{ ...estilos.card, ...estilos.cardResumo }}>
            <div style={estilos.legendaResumo}>Total de produtos</div>
            <p style={estilos.valorResumo}>{totalProdutos}</p>
          </div>

          <div style={{ ...estilos.card, ...estilos.cardResumo }}>
            <div style={estilos.legendaResumo}>Valor total</div>
            <p style={estilos.valorResumo}>R$ {valorTotal.toFixed(2)}</p>
          </div>
        </div>

        <div style={estilos.gridPrincipal}>
          <div style={{ ...estilos.card, ...estilos.cardFormulario }}>
            <h2 style={estilos.h2}>Novo produto</h2>

            {erro ? <div style={estilos.alertaErro}>{erro}</div> : null}
            {sucesso ? <div style={estilos.alertaSucesso}>{sucesso}</div> : null}

            <form onSubmit={salvar}>
              <div style={estilos.grupo}>
                <label style={estilos.label}>Nome do produto</label>
                <input
                  style={estilos.input}
                  placeholder="Ex: Camisa básica"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div style={estilos.grupo}>
                <label style={estilos.label}>Preço</label>
                <input
                  style={estilos.input}
                  placeholder="Ex: 39.90"
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </div>

              <button type="submit" style={estilos.botao} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar produto"}
              </button>
            </form>
          </div>

          <div style={{ ...estilos.card, ...estilos.cardTabela }}>
            <div style={estilos.topoTabela}>
              <div>
                <h2 style={estilos.h2}>Produtos cadastrados</h2>
                <p style={estilos.descricao}>Lista atual do estoque</p>
              </div>

              <div style={estilos.caixaBusca}>
                <input
                  style={estilos.input}
                  placeholder="Buscar produto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>

            {filtrados.length === 0 ? (
              <div style={estilos.vazio}>Nenhum produto encontrado.</div>
            ) : (
              <div style={estilos.tabelaWrap}>
                <table style={estilos.tabela}>
                  <thead>
                    <tr>
                      <th style={estilos.th}>Produto</th>
                      <th style={estilos.th}>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrados.map((p, i) => (
                      <tr key={i}>
                        <td style={estilos.tdNome}>{p.nome}</td>
                        <td style={estilos.tdPreco}>
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

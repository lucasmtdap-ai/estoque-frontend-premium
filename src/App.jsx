import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";

const API = "https://seu-backend.onrender.com/produtos";
export default function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro("");

      const res = await fetch(API);
      if (!res.ok) throw new Error("Erro ao carregar produtos");

      const dados = await res.json();
      setProdutos(Array.isArray(dados) ? dados : []);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const resumo = useMemo(() => {
    const totalProdutos = produtos.length;
    const valorEstoque = produtos.reduce(
      (acc, p) => acc + Number(p.preco || 0) * Number(p.estoque || 0),
      0
    );
    const estoqueBaixo = produtos.filter(
      (p) => Number(p.estoque || 0) > 0 && Number(p.estoque || 0) <= 3
    ).length;
    const semEstoque = produtos.filter(
      (p) => Number(p.estoque || 0) <= 0
    ).length;

    return {
      totalProdutos,
      valorEstoque,
      estoqueBaixo,
      semEstoque,
    };
  }, [produtos]);

  return (
    <div className="app-shell">
      <Sidebar pagina={pagina} setPagina={setPagina} />

      <div className="app-content">
        <Topbar titulo={pagina === "dashboard" ? "Dashboard" : "Produtos"} />

        {erro ? <div className="alert alert-error">{erro}</div> : null}

        {pagina === "dashboard" && (
          <Dashboard
            carregando={carregando}
            produtos={produtos}
            resumo={resumo}
            setPagina={setPagina}
          />
        )}

        {pagina === "produtos" && (
          <Produtos
            API={API}
            produtos={produtos}
            setProdutos={setProdutos}
            carregarProdutos={carregarProdutos}
            carregando={carregando}
          />
        )}
      </div>
    </div>
  );
}

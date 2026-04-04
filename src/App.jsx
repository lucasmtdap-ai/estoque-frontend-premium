import React, { useEffect, useMemo, useState } from "react";

const API_BASE = "https://stock-backend-hp9t.onrender.com";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [modoAuth, setModoAuth] = useState("login");
  const [authForm, setAuthForm] = useState({
    nome: "",
    email: "",
    senha: ""
  });
  const [authErro, setAuthErro] = useState("");
  const [authCarregando, setAuthCarregando] = useState(false);

  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [produtoEditandoId, setProdutoEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    categoria: "",
    estoque: ""
  });

  const authHeader = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    : {
        "Content-Type": "application/json"
      };

  async function carregarProdutos() {
    if (!token) return;

    try {
      setCarregando(true);
      setErro("");
      const res = await fetch(`${API_BASE}/produtos`, {
        headers: authHeader
      });

      if (!res.ok) {
        throw new Error("Erro ao carregar produtos");
      }

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
    if (token) {
      carregarProdutos();
    }
  }, [token]);

  function atualizarAuth(campo, valor) {
    setAuthForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function enviarAuth(e) {
    e.preventDefault();
    setAuthErro("");

    if (!authForm.email || !authForm.senha || (modoAuth === "register" && !authForm.nome)) {
      setAuthErro("Preencha os campos obrigatórios.");
      return;
    }

    try {
      setAuthCarregando(true);

      const endpoint = modoAuth === "login" ? "/login" : "/register";

      const payload =
        modoAuth === "login"
          ? {
              email: authForm.email,
              senha: authForm.senha
            }
          : {
              nome: authForm.nome,
              email: authForm.email,
              senha: authForm.senha
            };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const dados = await res.json();

      if (!res.ok) {
        throw new Error(dados.error || "Erro de autenticação");
      }

      localStorage.setItem("token", dados.token);
      localStorage.setItem("user", JSON.stringify(dados.user));
      setToken(dados.token);
      setUser(dados.user);

      setAuthForm({
        nome: "",
        email: "",
        senha: ""
      });
    } catch (e) {
      console.error(e);
      setAuthErro(e.message || "Erro ao autenticar.");
    } finally {
      setAuthCarregando(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setProdutos([]);
  }

  function abrirNovoProduto() {
    setModoEdicao(false);
    setProdutoEditandoId(null);
    setForm({
      nome: "",
      preco: "",
      categoria: "",
      estoque: ""
    });
    setErro("");
    setSucesso("");
    setModalAberto(true);
  }

  function abrirEdicao(produto) {
    setModoEdicao(true);
    setProdutoEditandoId(produto.id);
    setForm({
      nome: produto.nome || "",
      preco: produto.preco ?? "",
      categoria: produto.categoria || "",
      estoque: produto.estoque ?? ""
    });
    setErro("");
    setSucesso("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setModoEdicao(false);
    setProdutoEditandoId(null);
    setForm({
      nome: "",
      preco: "",
      categoria: "",
      estoque: ""
    });
  }

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor
    }));
  }

  async function salvarProduto(e) {
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
        estoque: Number(form.estoque || 0)
      };

      const url = modoEdicao
        ? `${API_BASE}/produtos/${produtoEditandoId}`
        : `${API_BASE}/produtos`;

      const metodo = modoEdicao ? "PUT" : "POST";

      const res = await fetch(url, {
        method: metodo,
        headers: authHeader,
        body: JSON.stringify(payload)
      });

      const dados = await res.json();

      if (!res.ok) {
        throw new Error(dados.error || "Erro ao salvar produto");
      }

      setSucesso(modoEdicao ? "Produto atualizado com sucesso." : "Produto criado com sucesso.");
      await carregarProdutos();

      setTimeout(() => {
        fecharModal();
        setSucesso("");
      }, 700);
    } catch (e) {
      console.error(e);
      setErro(e.message || "Erro ao salvar produto.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirProduto(id) {
    const confirmar = window.confirm("Deseja excluir este produto?");
    if (!confirmar) return;

    try {
      setErro("");
      const res = await fetch(`${API_BASE}/produtos/${id}`, {
        method: "DELETE",
        headers: authHeader
      });

      const dados = await res.json();

      if (!res.ok) {
        throw new Error(dados.error || "Erro ao excluir produto");
      }

      await carregarProdutos();
    } catch (e) {
      console.error(e);
      setErro(e.message || "Erro ao excluir produto.");
    }
  }

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const texto = busca.toLowerCase();
      return (
        (p.nome || "").toLowerCase().includes(texto) ||
        (p.categoria || "").toLowerCase().includes(texto)
      );
    });
  }, [produtos, busca]);

  const totalProdutos = produtosFiltrados.length;
  const valorTotal = produtosFiltrados.reduce(
    (acc, p) => acc + Number(p.preco || 0) * Number(p.estoque || 0),
    0
  );
  const estoqueBaixo = produtosFiltrados.filter(
    (p) => Number(p.estoque || 0) <= 3
  ).length;

  const s = {
    pagina: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, #2a1a22 0%, #120d10 35%, #090909 100%)",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      padding: "24px",
      boxSizing: "border-box"
    },
    container: {
      maxWidth: "1360px",
      margin: "0 auto"
    },
    card: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(212, 175, 55, 0.2)",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
      backdropFilter: "blur(8px)"
    },
    authWrap: {
      minHeight: "calc(100vh - 48px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    authCard: {
      width: "100%",
      maxWidth: "460px",
      padding: "28px"
    },
    titulo: {
      margin: 0,
      fontSize: "36px",
      fontWeight: "800"
    },
    subtitulo: {
      marginTop: "10px",
      color: "#d4af37",
      fontSize: "15px"
    },
    grupo: {
      marginBottom: "14px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "700"
    },
    input: {
      width: "100%",
      background: "rgba(255,255,255,0.06)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "14px",
      padding: "14px 16px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box"
    },
    authButton: {
      width: "100%",
      background: "linear-gradient(135deg, #d4af37 0%, #f7e7a9 100%)",
      color: "#111",
      border: "none",
      borderRadius: "14px",
      padding: "14px 18px",
      fontWeight: "800",
      cursor: "pointer"
    },
    trocaModo: {
      marginTop: "16px",
      textAlign: "center",
      color: "#ddd",
      fontSize: "14px"
    },
    linkModo: {
      color: "#f7e7a9",
      fontWeight: "700",
      cursor: "pointer"
    },
    erro: {
      marginBottom: "14px",
      padding: "14px 16px",
      borderRadius: "14px",
      background: "rgba(239, 68, 68, 0.14)",
      color: "#fecaca",
      border: "1px solid rgba(239, 68, 68, 0.25)",
      fontWeight: "700"
    },
    sucesso: {
      marginBottom: "14px",
      padding: "14px 16px",
      borderRadius: "14px",
      background: "rgba(34, 197, 94, 0.14)",
      color: "#bbf7d0",
      border: "1px solid rgba(34, 197, 94, 0.25)",
      fontWeight: "700"
    },
    topo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "24px"
    },
    topoAcoes: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap"
    },
    botaoPrincipal: {
      background: "linear-gradient(135deg, #d4af37 0%, #f7e7a9 100%)",
      color: "#111",
      border: "none",
      borderRadius: "14px",
      padding: "14px 20px",
      fontSize: "15px",
      fontWeight: "800",
      cursor: "pointer"
    },
    botaoLogout: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "14px",
      padding: "14px 18px",
      fontWeight: "700",
      cursor: "pointer"
    },
    gradeCards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "16px",
      marginBottom: "22px"
    },
    resumoCard: {
      padding: "20px"
    },
    resumoTitulo: {
      fontSize: "14px",
      color: "#d1d5db",
      marginBottom: "10px"
    },
    resumoValor: {
      fontSize: "32px",
      fontWeight: "800",
      margin: 0
    },
    blocoTabela: {
      padding: "22px"
    },
    barraTabela: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "14px",
      flexWrap: "wrap",
      marginBottom: "18px"
    },
    inputBusca: {
      minWidth: "280px",
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "14px",
      padding: "14px 16px",
      fontSize: "15px",
      outline: "none"
    },
    tabelaWrap: {
      overflowX: "auto"
    },
    tabela: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "920px"
    },
    th: {
      textAlign: "left",
      padding: "14px",
      color: "#d4af37",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      fontSize: "13px",
      textTransform: "uppercase"
    },
    td: {
      padding: "16px 14px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      color: "#f3f4f6",
      fontSize: "15px"
    },
    badge: {
      display: "inline-block",
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(212, 175, 55, 0.14)",
      color: "#f7e7a9",
      fontSize: "13px",
      fontWeight: "700"
    },
    estoqueBadge: (baixo) => ({
      display: "inline-block",
      padding: "8px 12px",
      borderRadius: "999px",
      background: baixo ? "rgba(239, 68, 68, 0.18)" : "rgba(34, 197, 94, 0.18)",
      color: baixo ? "#fca5a5" : "#86efac",
      fontSize: "13px",
      fontWeight: "700"
    }),
    acoes: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap"
    },
    botaoEditar: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "12px",
      padding: "10px 14px",
      cursor: "pointer",
      fontWeight: "700"
    },
    botaoExcluir: {
      background: "rgba(239, 68, 68, 0.16)",
      color: "#fecaca",
      border: "1px solid rgba(239, 68, 68, 0.25)",
      borderRadius: "12px",
      padding: "10px 14px",
      cursor: "pointer",
      fontWeight: "700"
    },
    vazio: {
      padding: "30px",
      textAlign: "center",
      color: "#d1d5db",
      border: "1px dashed rgba(255,255,255,0.15)",
      borderRadius: "16px",
      marginTop: "12px"
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 9999
    },
    modal: {
      width: "100%",
      maxWidth: "560px",
      background: "#111111",
      border: "1px solid rgba(212, 175, 55, 0.22)",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.45)"
    },
    modalTopo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "18px"
    },
    fechar: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#fff",
      width: "38px",
      height: "38px",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "700"
    },
    gridForm: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px"
    },
    grupoFull: {
      gridColumn: "1 / -1"
    },
    botoesModal: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "18px",
      flexWrap: "wrap"
    }
  };

  if (!token || !user) {
    return (
      <div style={s.pagina}>
        <div style={s.container}>
          <div style={s.authWrap}>
            <div style={{ ...s.card, ...s.authCard }}>
              <h1 style={s.titulo}>Rosa Boutique</h1>
              <div style={s.subtitulo}>SaaS premium com login</div>

              <div style={{ marginTop: "22px", marginBottom: "18px", fontWeight: "800", fontSize: "24px" }}>
                {modoAuth === "login" ? "Entrar" : "Criar conta"}
              </div>

              {authErro ? <div style={s.erro}>{authErro}</div> : null}

              <form onSubmit={enviarAuth}>
                {modoAuth === "register" && (
                  <div style={s.grupo}>
                    <label style={s.label}>Nome</label>
                    <input
                      style={s.input}
                      value={authForm.nome}
                      onChange={(e) => atualizarAuth("nome", e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                )}

                <div style={s.grupo}>
                  <label style={s.label}>Email</label>
                  <input
                    style={s.input}
                    value={authForm.email}
                    onChange={(e) => atualizarAuth("email", e.target.value)}
                    placeholder="seuemail@gmail.com"
                  />
                </div>

                <div style={s.grupo}>
                  <label style={s.label}>Senha</label>
                  <input
                    style={s.input}
                    type="password"
                    value={authForm.senha}
                    onChange={(e) => atualizarAuth("senha", e.target.value)}
                    placeholder="Sua senha"
                  />
                </div>

                <button type="submit" style={s.authButton} disabled={authCarregando}>
                  {authCarregando
                    ? "Carregando..."
                    : modoAuth === "login"
                    ? "Entrar"
                    : "Criar conta"}
                </button>
              </form>

              <div style={s.trocaModo}>
                {modoAuth === "login" ? (
                  <>
                    Não tem conta?{" "}
                    <span style={s.linkModo} onClick={() => setModoAuth("register")}>
                      Criar agora
                    </span>
                  </>
                ) : (
                  <>
                    Já tem conta?{" "}
                    <span style={s.linkModo} onClick={() => setModoAuth("login")}>
                      Fazer login
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.pagina}>
      <div style={s.container}>
        <div style={s.topo}>
          <div>
            <h1 style={s.titulo}>Rosa Boutique</h1>
            <div style={s.subtitulo}>
              Bem-vindo, {user.nome} • SaaS premium de gestão de estoque
            </div>
          </div>

          <div style={s.topoAcoes}>
            <button style={s.botaoPrincipal} onClick={abrirNovoProduto}>
              + Novo Produto
            </button>
            <button style={s.botaoLogout} onClick={logout}>
              Sair
            </button>
          </div>
        </div>

        {erro ? <div style={s.erro}>{erro}</div> : null}

        <div style={s.gradeCards}>
          <div style={{ ...s.card, ...s.resumoCard }}>
            <div style={s.resumoTitulo}>Total de produtos</div>
            <p style={s.resumoValor}>{totalProdutos}</p>
          </div>

          <div style={{ ...s.card, ...s.resumoCard }}>
            <div style={s.resumoTitulo}>Valor total em estoque</div>
            <p style={s.resumoValor}>R$ {valorTotal.toFixed(2)}</p>
          </div>

          <div style={{ ...s.card, ...s.resumoCard }}>
            <div style={s.resumoTitulo}>Alerta de estoque baixo</div>
            <p style={s.resumoValor}>{estoqueBaixo}</p>
          </div>
        </div>

        <div style={{ ...s.card, ...s.blocoTabela }}>
          <div style={s.barraTabela}>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "800" }}>Produtos cadastrados</div>
              <div style={{ marginTop: "6px", color: "#d1d5db", fontSize: "14px" }}>
                Gerencie produtos, estoque e categorias
              </div>
            </div>

            <input
              style={s.inputBusca}
              placeholder="Buscar por nome ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {carregando ? (
            <div style={s.vazio}>Carregando produtos...</div>
          ) : produtosFiltrados.length === 0 ? (
            <div style={s.vazio}>Nenhum produto encontrado.</div>
          ) : (
            <div style={s.tabelaWrap}>
              <table style={s.tabela}>
                <thead>
                  <tr>
                    <th style={s.th}>Produto</th>
                    <th style={s.th}>Categoria</th>
                    <th style={s.th}>Preço</th>
                    <th style={s.th}>Estoque</th>
                    <th style={s.th}>Valor total</th>
                    <th style={s.th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosFiltrados.map((p) => {
                    const baixo = Number(p.estoque || 0) <= 3;
                    const total = Number(p.preco || 0) * Number(p.estoque || 0);

                    return (
                      <tr key={p.id}>
                        <td style={s.td}>{p.nome}</td>
                        <td style={s.td}>
                          <span style={s.badge}>{p.categoria || "Sem categoria"}</span>
                        </td>
                        <td style={s.td}>R$ {Number(p.preco || 0).toFixed(2)}</td>
                        <td style={s.td}>
                          <span style={s.estoqueBadge(baixo)}>
                            {Number(p.estoque || 0)} {baixo ? "• Baixo" : "• OK"}
                          </span>
                        </td>
                        <td style={s.td}>R$ {total.toFixed(2)}</td>
                        <td style={s.td}>
                          <div style={s.acoes}>
                            <button style={s.botaoEditar} onClick={() => abrirEdicao(p)}>
                              Editar
                            </button>
                            <button style={s.botaoExcluir} onClick={() => excluirProduto(p.id)}>
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
          <div style={s.modalOverlay}>
            <div style={s.modal}>
              <div style={s.modalTopo}>
                <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "800" }}>
                  {modoEdicao ? "Editar produto" : "Novo produto"}
                </h3>
                <button style={s.fechar} onClick={fecharModal}>
                  ×
                </button>
              </div>

              {erro ? <div style={s.erro}>{erro}</div> : null}
              {sucesso ? <div style={s.sucesso}>{sucesso}</div> : null}

              <form onSubmit={salvarProduto}>
                <div style={s.gridForm}>
                  <div style={{ ...s.grupo, ...s.grupoFull }}>
                    <label style={s.label}>Nome do produto</label>
                    <input
                      style={s.input}
                      value={form.nome}
                      onChange={(e) => atualizarCampo("nome", e.target.value)}
                    />
                  </div>

                  <div style={s.grupo}>
                    <label style={s.label}>Preço</label>
                    <input
                      style={s.input}
                      type="number"
                      step="0.01"
                      value={form.preco}
                      onChange={(e) => atualizarCampo("preco", e.target.value)}
                    />
                  </div>

                  <div style={s.grupo}>
                    <label style={s.label}>Estoque</label>
                    <input
                      style={s.input}
                      type="number"
                      value={form.estoque}
                      onChange={(e) => atualizarCampo("estoque", e.target.value)}
                    />
                  </div>

                  <div style={{ ...s.grupo, ...s.grupoFull }}>
                    <label style={s.label}>Categoria</label>
                    <input
                      style={s.input}
                      value={form.categoria}
                      onChange={(e) => atualizarCampo("categoria", e.target.value)}
                    />
                  </div>
                </div>

                <div style={s.botoesModal}>
                  <button type="button" style={s.botaoLogout} onClick={fecharModal}>
                    Cancelar
                  </button>
                  <button type="submit" style={s.botaoPrincipal} disabled={salvando}>
                    {salvando
                      ? "Salvando..."
                      : modoEdicao
                      ? "Salvar alterações"
                      : "Criar produto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

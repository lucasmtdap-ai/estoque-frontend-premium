import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [user, setUser] = useState({});
  const [hora, setHora] = useState("");

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(data);
    } catch {
      setUser({});
    }
  }, []);

  useEffect(() => {
    function atualizarHora() {
      const agora = new Date();
      setHora(
        agora.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short"
        })
      );
    }

    atualizarHora();
    const timer = setInterval(atualizarHora, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="topbar-final">
      <div>
        <span className="topbar-chip">Sistema online</span>
        <h1 className="topbar-title-final">Painel Premium</h1>
        <p className="topbar-subtitle-final">
          Gerencie produtos, vendas e lucro em um só lugar.
        </p>
      </div>

      <div className="topbar-right">
        <div className="topbar-info-card">
          <small>Usuário</small>
          <strong>{user?.nome || "Usuário"}</strong>
          <span>{user?.loja || user?.email || "Rosa Boutique"}</span>
        </div>

        <div className="topbar-info-card">
          <small>Agora</small>
          <strong>{hora || "--:--"}</strong>
          <span>Status: Online</span>
        </div>
      </div>
    </header>
  );
}

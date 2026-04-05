import React from "react";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="topbar">
      <div>
        <h1>Painel</h1>
        <p>{user?.loja || "Rosa Boutique"}</p>
      </div>
    </header>
  );
}

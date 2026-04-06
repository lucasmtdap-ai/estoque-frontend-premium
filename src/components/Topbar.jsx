import React from "react";

export default function Topbar() {
  let user = {};

try {
  user = JSON.parse(localStorage.getItem("user") || "{}");
} catch {
  user = {};
}

  return (
    <header className="topbar">
      <div>
        <h1>Painel</h1>
        <p>{user?.loja || "Rosa Boutique"}</p>
      </div>
    </header>
  );
}

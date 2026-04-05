import React from "react";
import { getUser } from "../services/auth.js";

export default function Topbar() {
  const user = getUser();

  return (
    <header className="topbar">
      <div>
        <h1>Painel</h1>
        <p>{user?.loja || "Rosa Boutique"}</p>
      </div>
    </header>
  );
}

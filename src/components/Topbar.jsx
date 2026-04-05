import React from "react";

export default function Topbar({ titulo }) {
  return (
    <header className="topbar">
      <div>
        <h1>{titulo}</h1>
        <p>Visão geral do seu negócio</p>
      </div>

      <div className="topbar-actions">
        <button className="icon-btn">🔔</button>
      </div>
    </header>
  );
}

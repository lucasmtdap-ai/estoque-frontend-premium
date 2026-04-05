import React from "react";

export default function Dashboard({ carregando, produtos, resumo, setPagina }) {
  const alertas = produtos
    .filter((p) => Number(p.estoque || 0) <= 3)
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Valor em estoque</span>
          <h3>R$ {resumo.valorEstoque.toFixed(2)}</h3>
          <p className="positive">↑ visão geral atual</p>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total produtos</span>
          <h3>{resumo.totalProdutos}</h3>
          <p>{resumo.estoqueBaixo} em estoque baixo</p>
        </div>

        <div className="stat-card">
          <span className="stat-label">Estoque baixo</span>
          <h3>{resumo.estoqueBaixo}</h3>
          <p className="warning">atenção aos alertas</p>
        </div>

        <div className="stat-card">
          <span className="stat-label">Sem estoque</span>
          <h3>{resumo.semEstoque}</h3>
          <p className="danger">produtos zerados</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel panel-large">
          <div className="panel-header">
            <div>
              <h3>Receita e estoque</h3>
              <p>Painel visual</p>
            </div>
          </div>

          <div className="fake-chart line-chart">
            <div className="chart-line green"></div>
            <div className="chart-line blue"></div>
          </div>
        </div>

        <div className="panel panel-large">
          <div className="panel-header">
            <div>
              <h3>Entradas vs Saídas</h3>
              <p>Visão comparativa</p>
            </div>
          </div>

          <div className="fake-chart bars-chart">
            <div className="bars-row">
              <span className="bar green" style={{ height: "50%" }}></span>
              <span className="bar yellow" style={{ height: "42%" }}></span>
            </div>
            <div className="bars-row">
              <span className="bar green" style={{ height: "65%" }}></span>
              <span className="bar yellow" style={{ height: "52%" }}></span>
            </div>
            <div className="bars-row">
              <span className="bar green" style={{ height: "90%" }}></span>
              <span className="bar yellow" style={{ height: "82%" }}></span>
            </div>
            <div className="bars-row">
              <span className="bar green" style={{ height: "55%" }}></span>
              <span className="bar yellow" style={{ height: "48%" }}></span>
            </div>
            <div className="bars-row">
              <span className="bar green" style={{ height: "62%" }}></span>
              <span className="bar yellow" style={{ height: "56%" }}></span>
            </div>
            <div className="bars-row">
              <span className="bar green" style={{ height: "72%" }}></span>
              <span className="bar yellow" style={{ height: "60%" }}></span>
            </div>
          </div>
        </div>

        <div className="panel panel-full">
          <div className="panel-header">
            <div>
              <h3>Alertas de estoque</h3>
              <p>Produtos que precisam de atenção</p>
            </div>

            <button className="secondary-btn" onClick={() => setPagina("produtos")}>
              Ver produtos
            </button>
          </div>

          {carregando ? (
            <div className="empty-box">Carregando alertas...</div>
          ) : alertas.length === 0 ? (
            <div className="empty-box">Nenhum alerta no momento.</div>
          ) : (
            <div className="alert-list">
              {alertas.map((item) => (
                <div key={item.id} className="alert-item">
                  <div>
                    <strong>{item.nome}</strong>
                    <p>{item.categoria || "Sem categoria"}</p>
                  </div>

                  <span
                    className={`stock-pill ${
                      Number(item.estoque || 0) <= 0 ? "out" : "low"
                    }`}
                  >
                    {Number(item.estoque || 0) <= 0
                      ? "Esgotado"
                      : `${item.estoque} un.`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

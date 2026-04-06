import React from "react";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-nav">
          <div className="landing-logo">
            <div className="landing-logo-icon">RB</div>
            <div>
              <strong>Rosa Control</strong>
              <span>SaaS para lojas</span>
            </div>
          </div>

          <div className="landing-nav-actions">
            <a href="/login" className="landing-btn ghost">
              Entrar
            </a>
            <a href="/register" className="landing-btn primary">
              Testar agora
            </a>
          </div>
        </div>

        <div className="landing-hero-content">
          <div className="landing-hero-text">
            <span className="landing-badge">SaaS Premium para varejo</span>
            <h1>
              Controle sua loja com um sistema moderno, bonito e fácil de usar.
            </h1>
            <p>
              Gerencie produtos, estoque, vendas, lucro e categorias em um só
              lugar. Tudo online, rápido e com visual profissional.
            </p>

            <div className="landing-cta-group">
              <a href="/register" className="landing-btn primary large">
                Começar grátis
              </a>
              <a href="/login" className="landing-btn ghost large">
                Já tenho conta
              </a>
            </div>

            <div className="landing-mini-stats">
              <div>
                <strong>Estoque</strong>
                <span>inteligente</span>
              </div>
              <div>
                <strong>Vendas</strong>
                <span>em tempo real</span>
              </div>
              <div>
                <strong>Lucro</strong>
                <span>automático</span>
              </div>
            </div>
          </div>

          <div className="landing-hero-card">
            <div className="hero-card-top">
              <span>Painel premium</span>
              <strong>Rosa Control</strong>
            </div>

            <div className="hero-card-metrics">
              <div className="metric-card pink">
                <small>Produtos</small>
                <strong>128</strong>
              </div>

              <div className="metric-card purple">
                <small>Vendas</small>
                <strong>56</strong>
              </div>

              <div className="metric-card gold">
                <small>Lucro</small>
                <strong>R$ 4.280</strong>
              </div>
            </div>

            <div className="hero-card-chart">
              <div className="fake-bar h1"></div>
              <div className="fake-bar h2"></div>
              <div className="fake-bar h3"></div>
              <div className="fake-bar h4"></div>
              <div className="fake-bar h5"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-title">
          <span>Recursos</span>
          <h2>Tudo que sua loja precisa para operar melhor</h2>
        </div>

        <div className="landing-features-grid">
          <div className="feature-card">
            <h3>Controle de produtos</h3>
            <p>Cadastre, edite e organize todos os produtos em poucos cliques.</p>
          </div>

          <div className="feature-card">
            <h3>Estoque inteligente</h3>
            <p>Veja alertas de estoque baixo e mantenha sua operação em dia.</p>
          </div>

          <div className="feature-card">
            <h3>Vendas integradas</h3>
            <p>Registre vendas e baixe o estoque automaticamente.</p>
          </div>

          <div className="feature-card">
            <h3>Lucro automático</h3>
            <p>Saiba quanto está lucrando com base no preço e no custo.</p>
          </div>

          <div className="feature-card">
            <h3>Dashboard premium</h3>
            <p>Tenha visão clara de produtos, vendas e indicadores importantes.</p>
          </div>

          <div className="feature-card">
            <h3>Categorias e organização</h3>
            <p>Separe sua loja por categorias e encontre tudo mais rápido.</p>
          </div>
        </div>
      </section>

      <section className="landing-section soft">
        <div className="section-title">
          <span>Planos</span>
          <h2>Escolha o plano ideal para seu momento</h2>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Básico</h3>
            <div className="price">R$ 29<span>/mês</span></div>
            <ul>
              <li>Cadastro de produtos</li>
              <li>Controle de estoque</li>
              <li>Registro de vendas</li>
              <li>Dashboard principal</li>
            </ul>
            <a href="/register" className="landing-btn ghost full">
              Começar
            </a>
          </div>

          <div className="pricing-card featured">
            <div className="featured-badge">Mais escolhido</div>
            <h3>Premium</h3>
            <div className="price">R$ 59<span>/mês</span></div>
            <ul>
              <li>Tudo do plano básico</li>
              <li>Relatórios avançados</li>
              <li>Lucro e métricas completas</li>
              <li>Visual premium</li>
              <li>Prioridade nas melhorias</li>
            </ul>
            <a href="/register" className="landing-btn primary full">
              Testar premium
            </a>
          </div>
        </div>
      </section>

      <section className="landing-cta-final">
        <div className="cta-final-card">
          <h2>Pronto para profissionalizar sua loja?</h2>
          <p>
            Comece agora e tenha controle total sobre produtos, estoque, vendas e lucro.
          </p>
          <div className="landing-cta-group center">
            <a href="/register" className="landing-btn primary large">
              Criar conta
            </a>
            <a href="/login" className="landing-btn ghost large">
              Entrar no sistema
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

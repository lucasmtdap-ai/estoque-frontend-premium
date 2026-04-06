import React from "react";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <header className="landing-header">
        <div className="logo">
          <div className="logo-icon">RB</div>
          <div>
            <strong>Rosa Control</strong>
            <span>SaaS para lojas</span>
          </div>
        </div>

        <div className="nav-actions">
          <a href="/login" className="btn ghost">Entrar</a>
          <a href="/register" className="btn primary">Testar agora</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="tag">SaaS Premium para varejo</span>

          <h1>
            Controle sua loja com um sistema moderno,
            bonito e fácil de usar.
          </h1>

          <p>
            Gerencie produtos, estoque, vendas, lucro e categorias em um só lugar.
            Tudo online, rápido e com visual profissional.
          </p>

          <div className="hero-buttons">
            <a href="/register" className="btn primary big">Começar grátis</a>
            <a href="/login" className="btn ghost big">Já tenho conta</a>
          </div>

          <div className="hero-features">
            <span>📦 Estoque inteligente</span>
            <span>💰 Vendas em tempo real</span>
            <span>📈 Lucro automático</span>
          </div>
        </div>

        {/* MOCKUP */}
        <div className="hero-right">
          <div className="card gradient pink">
            <span>Produtos</span>
            <strong>128</strong>
          </div>

          <div className="card gradient purple">
            <span>Vendas</span>
            <strong>56</strong>
          </div>

          <div className="card gradient orange">
            <span>Lucro</span>
            <strong>R$ 4.280</strong>
          </div>

          <div className="bars">
            <div></div>
            <div></div>
            <div className="big"></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section className="features">
        <h2>Tudo que sua loja precisa para operar melhor</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Controle de produtos</h3>
            <p>Cadastre, edite e organize tudo facilmente.</p>
          </div>

          <div className="feature-card">
            <h3>Estoque inteligente</h3>
            <p>Saiba exatamente o que entra e sai.</p>
          </div>

          <div className="feature-card">
            <h3>Vendas integradas</h3>
            <p>Registre vendas automaticamente.</p>
          </div>

          <div className="feature-card">
            <h3>Lucro automático</h3>
            <p>Veja quanto está ganhando em tempo real.</p>
          </div>

          <div className="feature-card">
            <h3>Dashboard premium</h3>
            <p>Visual moderno e profissional.</p>
          </div>

          <div className="feature-card">
            <h3>Categorias</h3>
            <p>Organize sua loja facilmente.</p>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section className="pricing">
        <h2>Escolha o plano ideal</h2>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Básico</h3>
            <div className="price">R$ 29<span>/mês</span></div>

            <ul>
              <li>Produtos</li>
              <li>Estoque</li>
              <li>Vendas</li>
              <li>Dashboard</li>
            </ul>

            <a href="/register" className="btn ghost full">
              Começar
            </a>
          </div>

          <div className="pricing-card featured">
            <span className="badge">Mais escolhido</span>

            <h3>Premium</h3>
            <div className="price">R$ 59<span>/mês</span></div>

            <ul>
              <li>Tudo do básico</li>
              <li>Relatórios avançados</li>
              <li>Lucro completo</li>
              <li>Visual premium</li>
            </ul>

            <a href="/register" className="btn primary full">
              Testar premium
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">
        <h2>Pronto para profissionalizar sua loja?</h2>
        <p>Comece agora e tenha controle total do seu negócio.</p>

        <div className="cta-buttons">
          <a href="/register" className="btn primary">Criar conta</a>
          <a href="/login" className="btn ghost">Entrar</a>
        </div>
      </section>
    </div>
  );
}

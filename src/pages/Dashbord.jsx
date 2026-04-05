export default function Dashboard({ produtos }) {
  const total = produtos.length;
  const valor = produtos.reduce((acc, p) => acc + Number(p.preco || 0), 0);

  return (
    <>
      <div className="cards">
        <div className="card">
          <h3>Total produtos</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Valor total</h3>
          <p>R$ {valor}</p>
        </div>
      </div>
    </>
  );
}

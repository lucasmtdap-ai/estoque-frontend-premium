export default function Topbar({ titulo, subtitulo }) {
  return (
    <header className="topbar">
      <div>
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
      </div>
    </header>
  );
}

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({ titulo, subtitulo, children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <Topbar titulo={titulo} subtitulo={subtitulo} />
        {children}
      </main>
    </div>
  );
}

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [produtos, setProdutos] = useState([]);

  return (
    <div className="app">
      <Sidebar setPage={setPage} />

      <div className="main">
        <Topbar />

        {page === "dashboard" && <Dashboard produtos={produtos} />}
        {page === "produtos" && (
          <Produtos produtos={produtos} setProdutos={setProdutos} />
        )}
      </div>
    </div>
  );
}

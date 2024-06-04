import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import TableVisualization from "./pages/TableVisualization.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/tables" element={<TableVisualization />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

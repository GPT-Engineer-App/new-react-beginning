import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import TableVisualization from "./pages/TableVisualization.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/tables" element={<TableVisualization />} />
      </Routes>
    </Router>
  );
}

export default App;

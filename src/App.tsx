import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/page";
import TestPage from "./pages/test/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route → Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Test Page */}
        <Route path="/test" element={<TestPage />} />

        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhysioLanding from "./components/PhysioLanding";
import Policy from "./components/Policy";
import DashPage from "./components/dash";
import { LanguageProvider } from "./hooks/useLanguage";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhysioLanding />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/dash" element={<DashPage />} />
        </Routes>
  <Toaster />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

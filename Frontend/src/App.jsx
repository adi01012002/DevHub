import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginForm";
import RegisterPage from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioPage from "./components/PortfolioPage";
import ErrorPage from "./components/ErrorPage";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    //<AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/portfolio-form" element={<PortfolioForm />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/user/:username" element={<PortfolioPage />} />
          <Route path="ai-assistant" element={<Chatbot/>} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    //</AuthProvider>
  );
}

export default App;

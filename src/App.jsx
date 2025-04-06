import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CowPedia from "./pages/CowPedia";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BreedMatching from "./pages/BreedMatching";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Marketplace from "./components/MarketPlace";
import { useState } from "react";
import ChatBot from "./components/Chatbot/ChatBot";
import VetDoc from "./pages/VetDoc";
import "./App.css";

function App() {
  const [isMarketplaceOpen, setMarketplaceOpen] = useState(false);

  return (
    <div className="app-container">
      <Router>
        <Navbar openMarketplace={() => setMarketplaceOpen(true)} />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cow-pedia" element={<CowPedia />} />
            <Route path="/breed-matching" element={<BreedMatching />} />
            <Route path="/vet" element={<VetDoc />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>

        
      </Router>

      <ChatBot />
      <Footer />
      
      <Marketplace
        isOpen={isMarketplaceOpen}
        onClose={() => setMarketplaceOpen(false)}
      />
    </div>
  );
}

export default App;

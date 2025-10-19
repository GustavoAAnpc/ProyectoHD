import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Nutricion from "./pages/Nutricion";
import Membresias from "./pages/Membresias";
import Contacto from "./pages/Contacto";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/nutricion" element={<Nutricion />} />
            <Route path="/membresias" element={<Membresias />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

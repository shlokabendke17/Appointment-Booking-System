import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Slider from './components/Slider';
import LoginPage from './pages/LoginPage'; // Import new components
import SignUpPage from './pages/SignUpPage';
import './App.css';
import Dashboard from './pages/Dashboard';

// ... (Other placeholder components)
// const FeaturesPage = () => <h2>Features Page</h2>;
const NotFoundPage = () => <h2>404 Not Found</h2>;

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
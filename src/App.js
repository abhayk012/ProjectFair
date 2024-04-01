import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Project from './pages/Project';

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/register" element={<Auth register={"register"}/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/project" element={<Project/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Homepage from "./components/homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from "./components/adminpage";
import './App.css';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

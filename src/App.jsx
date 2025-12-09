import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Contacts from "./pages/Contacts";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-mist">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


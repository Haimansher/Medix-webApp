// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Manufacturer from "./components/Manufacturer";
import AddMedicine from "./components/AddMedicine";
import SupplyChain from "./components/SupplyChain";
import VendorOrder from "./components/VendorOrder";
import DeliverManfacturer from "./components/DeliverManfacturer";
import RegisterVendor from "./components/RegisterVendor";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Home />} />
            {/* <Manufacturer /> */}
            <Route path="/addMedicine" element={<AddMedicine />} />
            <Route path="/viewOrder" element={<DeliverManfacturer />} />
            <Route path="/registorVendor" element={<RegisterVendor />} />
            <Route path="/orderMedicine" element={<VendorOrder />} />
            <Route path="/supplyChain" element={<SupplyChain />} />
          </Routes>
        </NotificationProvider>
      </MoralisProvider>
    </BrowserRouter>
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';
import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit'
import Navbar from './components/Navbar';
import Manufacturer from './components/Manufacturer';
import AddMedicine from './components/AddMedicine';
import SupplyChain from './components/SupplyChain';
import VendorOrder from './components/VendorOrder';
import DeliverManfacturer from './components/DeliverManfacturer';

function App() {
  return (
    <>
    <MoralisProvider initializeOnMount={false}>
    <NotificationProvider>
      <Navbar />
      <Manufacturer />
      <AddMedicine />
      <SupplyChain />
      <VendorOrder />
      <DeliverManfacturer />
    </NotificationProvider>
    </MoralisProvider>
    </>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit'
import SideNavbar from './components/SideNavbar';
// import Manufacturer from './components/Manufacturer';
import AddMedicine from './components/AddMedicine';
import SupplyChain from './components/SupplyChain';
import VendorOrder from './components/VendorOrder';
import DeliverManfacturer from './components/DeliverManfacturer';

function App() {
  return (
    <>
    <MoralisProvider initializeOnMount={false}>
    <NotificationProvider>
      <SideNavbar />
      {/* <Manufacturer /> */}
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

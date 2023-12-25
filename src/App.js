import logo from './logo.svg';
// import './App.css';
import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit'
import SideNavbar from './components/SideNavbar';
import Manufacturer from './components/Manufacturer';
import AddMedicine from './components/AddMedicine';
import SupplyChain from './components/SupplyChain';

function App() {
  return (
    <>
    <MoralisProvider initializeOnMount={false}>
    <NotificationProvider>
      <SideNavbar />
      {/* <Manufacturer /> */}
      <AddMedicine />
      <SupplyChain />
    </NotificationProvider>
    </MoralisProvider>
    </>
  );
}

export default App;

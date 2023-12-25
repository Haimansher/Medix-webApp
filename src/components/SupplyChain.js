import React, { useState } from 'react';
import { useWeb3Contract, useMoralis } from 'react-moralis';
import { contractAddress, abi } from '../constants/index';
import CityBox from './CityBox'

function SupplyChain() {
  const [medHash, setMedHash] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [cost, setCost] = useState('');
  const [MDate, setMDate] = useState('');
  const [EDate, setEDate] = useState('');
  const [supplyChain, setSupplyChain] = useState([]);

  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null;

  const {
    runContractFunction: trackMedicine
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: 'trackMedicine',
    params: {
      _id: medHash
    }
  });

  async function fetchData() {
    const result = await trackMedicine();
    await UpdateUI(result);
  }

  function UpdateUI(result) {
    setMedicineName(result[0]);
    setCost(result[1]);
    setMDate(result[2]);
    setEDate(result[3]);
    setSupplyChain(result[4]);
  }

  return (
    <div className="container text-white text-center">
      <h1>Check Medicine</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <label htmlFor="medicineId">Hash:</label>
          <div className="input-group mb-2">
            <input
              type="text"
              id="medicineId"
              className="form-control"
              onChange={(e) => setMedHash(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={fetchData}
            >
              Check
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2>{medicineName === '' ? 'Medicine Name' : medicineName}</h2>
        <h3>{EDate === '' ? 'Expiry Date' : "Exp: " + EDate}</h3>

        <div className="mt-3">
          <h4>Cost: {cost}pkr</h4>
        </div>
      </div>

      {/* Map box container */}
      <div className='container mt-4'>
        <h2 className="display-4 text-uppercase font-weight-bold mb-4" style={{ color: '#28a745' }}>SupplyChain</h2>
        <hr className="bg-success" />
      </div>
      {supplyChain.map((data, index) => (
        <CityBox key={index} data={data} index={index}/>
      ))}
    </div>
  );
}

export default SupplyChain;


//0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
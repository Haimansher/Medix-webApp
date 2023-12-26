import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { contractAddress, abi } from '../constants/index'
import { useNotification } from 'web3uikit';

function AddMedicine() {

const [medicineName, setMedicineName] = useState('')
const [cost, setCost] = useState('')
const [MDate, setMDate] = useState('')
const [EDate, setEDate] = useState('')
const [usedFor, setUsedFor] = useState('')

const [manufacturer, setManufacturer] = useState('')

const { chainId: chainIdHex } = useMoralis()

const chainId = parseInt(chainIdHex)

const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

const dispatch = useNotification()

const {
    runContractFunction: addMedicine,
    // isLoading,
    // isFetching,
} = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "addMedicine",
    params: {
      _id: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      _name: medicineName,
      _cost: cost,
      _m_date: MDate,
      quanity: 50,
      _e_date: EDate,
    }
})

const {
  runContractFunction: getManufacturer,
} = useWeb3Contract({
  abi: abi,
  contractAddress: medixAddress,
  functionName: "getManufacturer",
  params: {}
})

const {
  runContractFunction: checkVendor,
} = useWeb3Contract({
  abi:abi,
  contractAddress: medixAddress,
  functionName: "checkVendor",
  params: {
    _vendor: manufacturer
  }
})

async function getOnChain() {
  const _manufacturer = await getManufacturer()
  if(_manufacturer){
    setManufacturer(_manufacturer)
  }
  console.log(manufacturer)

  const name = (await checkVendor(manufacturer))
  console.log(name)
}

useEffect(() => {
  getOnChain()
}, [manufacturer])

const handleNewNotification = () => {
  dispatch({
    type: "info",
    message: "Transaction Complete!",
    title: "Transaction Notification",
    position: "topR",
    icon: "bell"
  })
}

const handleSuccess = async (tx) => {
  try {
    await tx.wait(1)
    // updateUIValues()
    handleNewNotification(tx)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="container-fluid bg-skyblue p-5">
      <div className="container">
        <h1 className="text-center mb-4 text-white">Add Medicine</h1>
        {/* <form> */}
          <div className="mb-3">
            <label htmlFor="medicineName" className="form-label text-white">Medicine Name:</label>
            <input type="text" className="form-control" id="medicineName" name="medicineName" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="MDate" className="form-label text-white">Manufacturer Date:</label>
            <input type="date" className="form-control" id="MDate" name="MDate" value={MDate} onChange={(e) => setMDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="cost" className="form-label text-white">Cost:</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1 text-white">PKR</span>
              <input type="number" className="form-control" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="EDate" className="form-label text-white">Expiry Date:</label>
            <input type="date" className="form-control" id="EDate" name="EDate" value={EDate} onChange={(e) => setEDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="usedFor" className="form-label text-white">Use:</label>
            <input type="text" className="form-control" id="usedFor" name="usedFor" value={usedFor} onChange={(e) => setUsedFor(e.target.value)}/>
          </div>
          <div className="text-center">
            <button
              onClick={async () => {
                try {
                    const result = await addMedicine()
                    console.log("After addMedicine, Result:", result);
                    handleSuccess(result);
                } catch (error) {
                    console.log(error);
                    console.log(medixAddress);
                }
            }}
            type='submit'
            className='btn btn-primary fancy-button'
            >Add Medicine</button>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default AddMedicine;

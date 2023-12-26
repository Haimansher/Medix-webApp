import React, { useState } from 'react';
import './styles/Button.css'
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { contractAddress, abi } from '../constants/index';
import { useNotification } from 'web3uikit';

function VendorOrder() {

  const { chainId: chainIdHex } = useMoralis('')

  const chainId = parseInt(chainIdHex)

  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

  const [medHash, setMedHash] = useState('')
  const [quanity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const dispatch = useNotification()

  const {
    runContractFunction: orderMedicine
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "orderMedicine",
    params: {
        _medHash: medHash,
        _quantity: quanity,
        _price: price
    }
  })

  const fetchData = async () => {
    const result = await orderMedicine()
    handleSuccess(result)
  }

  const handleNewNotification = () => {
    dispatch({
        type: "info",
        message: "Medicine Ordered!",
        title: "Order Notification",
        position: "topR",
        icon: "bell"
    })
  }

  async function handleSuccess(result) {
    try {
        await result.wait(1)
        handleNewNotification()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='container mt-5'>
      <div className='card shadow-lg p-4' style={{ backgroundColor: '#6c757d', color: '#ffffff' }}>
        <h2 className='card-title text-center mb-4'>Vendor Order Form</h2>
        <div className='mb-3'>
          <label htmlFor='medHash' className='form-label'>
            Medicine Hash:
          </label>
          <input type='text' className='form-control' id='medHash' onChange={(e) => setMedHash(e.target.value)}/>
        </div>
        <div className='mb-3'>
          <label htmlFor='quantity' className='form-label'>
            Quantity:
          </label>
          <input type='number' className='form-control' id='quantity' onChange={(e) => setQuantity(e.target.value)}/>
        </div>
        <div className='mb-3'>
          <label htmlFor='pricePerUnit' className='form-label'>
            Price Per Unit:
          </label>
          <input type='number' className='form-control' id='pricePerUnit' onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className='d-grid gap-2 col-md-6 mx-auto'>
          <button
            type='submit'
            className='btn btn-primary fancy-button'

            onClick={fetchData}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorOrder;

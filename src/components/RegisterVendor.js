import React, { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { contractAddress, abi } from '../constants';
import { useNotification } from 'web3uikit';

function RegisterVendor() {

  const { chainId: chainToHex } = useMoralis()

  const chainId = parseInt(chainToHex)

  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

  const dispatch = useNotification()

  const [address, setAddress] = useState('');
  const [name, setName] = useState('');

  const {
      runContractFunction: registorVendor
      } = useWeb3Contract({
        abi: abi,
        contractAddress: medixAddress,
        functionName: "registorVendor",
        params: {
          _vendor: address,
          _name: name
        }
    });


    const handleRegister = async () => {
      const result = await registorVendor()
      handleSuccess(result)
    };

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
          handleNewNotification(tx)
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
      <h1>Register Vendor</h1>
      <div className='mb-3'>
        <label htmlFor='address' className='form-label'>
          Address:
        </label>
        <input
          type='text'
          className='form-control'
          id='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name:
        </label>
        <input
          type='text'
          className='form-control'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className='btn fancy-button' onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default RegisterVendor;

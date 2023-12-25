import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi, contractAddress } from '../constants/index';

function CityBox({ data, index }) {

  const { chainId: chainIdHex } = useMoralis()

  const chainId = parseInt(chainIdHex)

  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

  const [city, setCity] = useState('')

  const {
    runContractFunction: checkVendor
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "checkVendor",
    params: {
        _vendor: data
    }
  })

  async function getCity() {
    const result = await checkVendor();
    if(result){
        setCity(result.toString())
    }
  }

  useEffect(() => {
    getCity()
  }, [city])
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">{city}</h5>
        <p className="card-text">{index==0 ? "Manufacturer" : ''}</p>
        {/* You can add any other content or styling here */}
      </div>
    </div>
  );
}

export default CityBox;

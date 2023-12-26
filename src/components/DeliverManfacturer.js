import React, { useEffect, useState } from 'react'
import DeliverBox from './DeliverBox'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { contractAddress, abi } from '../constants/index'

function DeliverManfacturer() {

  const [ _id, setId ] = useState(0);

  const { chainId: chainIdHex } = useMoralis()

  const chainId = parseInt(chainIdHex)

  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

  const [orderNumber, setOrderNumber] = useState(0)

  const [orderId, setOrderId] = useState([])
  const [name , setName] = useState([])
  const [quantity, setQuantity] = useState([])
  const [price, setPrice] = useState([])

  const {
    runContractFunction: getTotalOrders,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "getTotalOrders",
    params: {}
  })

  const {
    runContractFunction: getOrders,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "getOrders",
    params: {
        id: _id
    }
  })

  const fetchNumber = async () => {
    const number = await getTotalOrders()
    if(number){
      setOrderNumber(Number(number.toString()))
    }
    console.log(number)
    console.log(orderNumber)
    // fetchOrders()
  }

  useEffect(() => {
    fetchNumber();
  }, []);
  
  const fetchOrders = async () => {
    for (let i = 0; i < orderNumber; i++) {
      setOrderId(i)
      const result = await getOrders({
        id: i
      });
      if (result) {
        setOrderId((prev) => [...prev, i]);
        setName((prev) => [...prev, result[0]]);
        setQuantity((prev) => [...prev, result[1]]);
        setPrice((prev) => [...prev, result[2]]);
      }
    }
  };

  return (
    <div className='container'>
      <h1 className='text-white text-center'>Available Orders</h1>
      {orderId.map((id, index) => (
        <DeliverBox key={id} name={name[index]} quantity={quantity[index]} price={price[index]} />
      ))}

      <DeliverBox />
      <DeliverBox />
    </div>
  )
}

export default DeliverManfacturer
import React, { useEffect, useState } from 'react'
import DeliverBox from './DeliverBox'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { contractAddress, abi } from '../constants/index'

function DeliverManfacturer() {

  var _id=0;
  const { chainId: chainIdHex } = useMoralis()

  const chainId = parseInt(chainIdHex)

  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

  const [orderNumber, setOrderNumber] = useState(0)

  const [orderId, setOrderId] = useState([])
  const [name , setName] = useState([])
  const [quantity, setQuantity] = useState([])
  const [price, setPrice] = useState([])
  const [medHash, setMedhash] = useState([])

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

  const fetchOrders = async () => {
    try {
      const orders = [];
  
      const fetchPromises = Array.from({ length: orderNumber }, async (_, i) => {

        const result = await getOrders({id: i});
        console.log(result[1].toString())
        if (result) {
          _id++;
          orders.push({
            id: i,
            name: result[0].toString() || "DefaultName",
            quantity: result[1].toString() || "DefaultQuantity",
            price: result[2].toString() || "DefaultPrice",
            medHash: result[3].toString()
          });
        }
      });
  
      await Promise.all(fetchPromises);
  
      setOrderId(orders.map((order) => order.id))
      setName(orders.map((order) => order.name))
      setQuantity(orders.map((order) => order.quantity))
      setPrice(orders.map((order) => order.price))
      setMedhash(orders.map((order) => order.medHash))
  
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
    

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const number = await getTotalOrders();
  
        if (number) {
          setOrderNumber(number.toString());
        }
  
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };
  
    fetchNumber();  // Invoke fetchNumber directly
  
  }, [getTotalOrders, setOrderNumber, orderNumber, fetchOrders]);  // Include fetchOrders in the dependency array
  

  
  useEffect(() => {
    // Trigger fetchOrders when orderNumber changes
    fetchOrders();
  }, [orderNumber]);

  return (
    <div className='container'>
      <h1 className='text-white text-center'>Available Orders</h1>
      {orderId.map((id, index) => (
  <DeliverBox
    key={index} 
    index={index} // Use index as the key
    name={name[index]}  // Pass the specific value corresponding to the index
    quantity={quantity[index]}
    price={price[index]}
    medHash={medHash[index]}
  />
))}

    </div>
  )
}

export default DeliverManfacturer
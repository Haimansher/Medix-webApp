import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi, contractAddress } from '../constants/index';

function DeliverBox(props) {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const medixAddress = chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [showDeliveryConfirmation, setShowDeliveryConfirmation] = useState(false);
  const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);

  const handleShowDeliveryConfirmation = () => setShowDeliveryConfirmation(true);
  const handleCloseDeliveryConfirmation = () => setShowDeliveryConfirmation(false);

  const handleShowRejectConfirmation = () => setShowRejectConfirmation(true);
  const handleCloseRejectConfirmation = () => setShowRejectConfirmation(false);

  const [orderStatus, setOrderStatus] = useState([0]);

  const {
    runContractFunction: registorVendor
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "registorVendor",
    params: {
      _vendor: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      _name: "Lahore"
    }
  });

  const {
    runContractFunction: deliver
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "deliver",
    params: {
      id: props.index,
      _medHash: props.medHash
    }
  });

  const {
    runContractFunction: reject
  } = useWeb3Contract({
    abi: abi,
    contractAddress: medixAddress,
    functionName: "reject",
    params: {
      id: props.index
    }
  });

  const confirmDelivery = async () => {
    handleCloseDeliveryConfirmation();
    try {
      await registorVendor();
      await deliver();
      setOrderStatus((prev) => [...prev, 1]);
    } catch (error) {
      console.error("Error delivering order:", error);
    }
  };

  const confirmReject = async () => {
    handleCloseRejectConfirmation();
    try {
      await reject();
      setOrderStatus((prev) => [...prev, 2]);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const isOrderCompleted = orderStatus[orderStatus.length - 1] !== 0;
  const isDelivered = orderStatus[orderStatus.length - 1] === 1;

  return (
    <div className="container mt-4 p-3 rounded" style={orderStatus===1 ? {backgroundColor: "lightgreen"} : orderStatus===2 ? {backgroundColor: "lightpink"} : {backgroundColor: "white"}}>
      <div className='row'>
        <div className='col'><strong>ID: </strong>{props.index}</div>
        <div className='col'><strong>Name:</strong>{props.name}</div>
        <div className='col'><strong>Quantity:</strong>{props.quantity}</div>
        <div className='col'><strong>Offered Price:</strong>{props.price}</div>
        <div className='col'>
          <button
            className={`btn btn-danger mr-4 fancy-button-reject ${isOrderCompleted ? 'disabled' : ''}`}
            onClick={handleShowRejectConfirmation}
            disabled={isOrderCompleted}
          >
            Reject
          </button>
        </div>
        <div className='col'>
          <button
            className={`btn btn-success fancy-button-deliver ${isOrderCompleted ? 'disabled' : ''}`}
            style={{ width: '100%' }}
            onClick={handleShowDeliveryConfirmation}
            disabled={isOrderCompleted}
          >
            Deliver
          </button>
        </div>
      </div>

      {/* Custom Delivery Confirmation Modal */}
      <Modal show={showDeliveryConfirmation} onHide={handleCloseDeliveryConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delivery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deliver this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeliveryConfirmation}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmDelivery}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Reject Confirmation Modal */}
      <Modal show={showRejectConfirmation} onHide={handleCloseRejectConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reject this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmReject}>
            Confirm Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeliverBox;

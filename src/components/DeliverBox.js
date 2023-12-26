import React from 'react';

function DeliverBox() {
  return (
    <div className='container bg-white mt-4 p-3 rounded'>
      <div className='row'>
        <div className='col'><strong>ID:</strong></div>
        <div className='col'><strong>Name:</strong></div>
        <div className='col'><strong>Quantity:</strong></div>
        <div className='col'><strong>Offered Price:</strong></div>
        <div className='col'>
          <button className='btn btn-danger mr-4 fancy-button-reject'>Reject</button>
        </div>
        <div className='col'>
          <button className='btn btn-success fancy-button-deliver' style={{ width: '100%' }}>Deliver</button>
        </div>
      </div>
    </div>
  );
}

export default DeliverBox;

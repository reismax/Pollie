import React from 'react';
import { useParams } from 'react-router-dom';

function BillPage() {
  const { id } = useParams();
  return (
    <div className="bill-page">
      <h2>Bill ID: {id}</h2>
      <p>Details coming soon...</p>
    </div>
  );
}

export default BillPage;

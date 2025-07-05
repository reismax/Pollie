 4ov59l-codex/create-clean-homepage-with-search-bar
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios/dist/browser/axios.cjs';

function BillPage() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      const congress = 118;
      const billType = 'hr';
      const billNumber = 1;
      try {
        const apiKey = process.env.REACT_APP_CONGRESS_API_KEY;
        const url = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}`;
        const { data } = await axios.get(url, { params: { api_key: apiKey } });
        setBill(data?.bill || data);
      } catch (err) {
        setError('Failed to load bill details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]);

  if (loading) {
    return (
      <div className="bill-page">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bill-page">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bill-page">
      <div className="bill-card">
        <h2>{bill?.title || `Bill ID: ${id}`}</h2>
        {bill && (
          <>
            <p className="bill-detail"><strong>Bill Number:</strong> {bill.billNumber || bill.number}</p>
            <p className="bill-detail"><strong>Congress Number:</strong> {bill.congress || bill.congressNumber}</p>
            <p className="bill-detail"><strong>Status:</strong> {bill.status}</p>
            <p className="bill-detail"><strong>Latest Action:</strong> {bill.latestAction?.text || bill.latestAction}</p>
            <p className="bill-detail"><strong>Sponsor:</strong> {bill.sponsors?.[0]?.fullName || bill.sponsor?.fullName}</p>
            <p className="bill-detail"><strong>Summary:</strong> {bill.summary}</p>
          </>
        )}
      </div>
 main
    </div>
  );
}

export default BillPage;

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));

// GET /api/bill/:billId
app.get('/api/bill/:billId', async (req, res) => {
  try {
    const { billId } = req.params;
    // Bill ID format e.g. "hr1" or "s42"
    const billType = billId.match(/[a-zA-Z]+/)[0];
    const billNumber = billId.match(/\d+/)[0];

    const congress = 118;
    const apiKey = process.env.CONGRESS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Congress API key not configured.' });
    }

    const url = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}`;
    const response = await axios.get(url, { params: { api_key: apiKey } });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    const status = err.response?.status || 500;
    res.status(status).json({ error: 'Failed to fetch bill data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

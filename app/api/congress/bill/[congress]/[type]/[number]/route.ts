import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const CONGRESS_API_KEY = process.env.CONGRESS_API_KEY;
const CONGRESS_API_BASE = 'https://api.congress.gov/v3';

export async function GET(
  request: NextRequest,
  { params }: { params: { congress: string; type: string; number: string } }
) {
  try {
    if (!CONGRESS_API_KEY) {
      return NextResponse.json(
        { error: 'Congress API key not configured' },
        { status: 500 }
      );
    }

    const { congress, type, number } = params;

    const url = `${CONGRESS_API_BASE}/bill/${congress}/${type}/${number}`;

    const response = await axios.get(url, {
      params: {
        api_key: CONGRESS_API_KEY,
        format: 'json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Congress API error:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to fetch bill details',
        message: error.response?.data?.message || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}

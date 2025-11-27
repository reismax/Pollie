import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const CONGRESS_API_KEY = process.env.CONGRESS_API_KEY;
const CONGRESS_API_BASE = 'https://api.congress.gov/v3';

export async function GET(request: NextRequest) {
  try {
    if (!CONGRESS_API_KEY) {
      return NextResponse.json(
        { error: 'Congress API key not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const congress = searchParams.get('congress') || '118';
    const limit = searchParams.get('limit') || '20';
    const offset = searchParams.get('offset') || '0';
    const billType = searchParams.get('billType') || '';

    let url = `${CONGRESS_API_BASE}/bill/${congress}`;

    if (billType) {
      url += `/${billType}`;
    }

    const response = await axios.get(url, {
      params: {
        api_key: CONGRESS_API_KEY,
        limit,
        offset,
        format: 'json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Congress API error:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to fetch bills',
        message: error.response?.data?.message || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}

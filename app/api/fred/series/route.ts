import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const FRED_API_KEY = process.env.FRED_API_KEY;
const FRED_API_BASE = 'https://api.stlouisfed.org/fred';

export async function GET(request: NextRequest) {
  try {
    if (!FRED_API_KEY) {
      return NextResponse.json(
        { error: 'FRED API key not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const seriesId = searchParams.get('series_id');
    const observationStart = searchParams.get('observation_start');
    const observationEnd = searchParams.get('observation_end');
    const limit = searchParams.get('limit') || '100';

    if (!seriesId) {
      return NextResponse.json(
        { error: 'series_id parameter is required' },
        { status: 400 }
      );
    }

    const url = `${FRED_API_BASE}/series/observations`;

    const params: any = {
      api_key: FRED_API_KEY,
      series_id: seriesId,
      file_type: 'json',
      limit,
    };

    if (observationStart) {
      params.observation_start = observationStart;
    }
    if (observationEnd) {
      params.observation_end = observationEnd;
    }

    const response = await axios.get(url, { params });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('FRED API error:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to fetch economic data',
        message: error.response?.data?.message || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}

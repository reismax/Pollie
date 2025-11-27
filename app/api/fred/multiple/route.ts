import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const FRED_API_KEY = process.env.FRED_API_KEY;
const FRED_API_BASE = 'https://api.stlouisfed.org/fred';

export async function POST(request: NextRequest) {
  try {
    if (!FRED_API_KEY) {
      return NextResponse.json(
        { error: 'FRED API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { seriesIds, observationStart, observationEnd } = body;

    if (!seriesIds || !Array.isArray(seriesIds)) {
      return NextResponse.json(
        { error: 'seriesIds array is required' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      seriesIds.map(async (seriesId) => {
        try {
          const params: any = {
            api_key: FRED_API_KEY,
            series_id: seriesId,
            file_type: 'json',
            limit: 1000,
          };

          if (observationStart) {
            params.observation_start = observationStart;
          }
          if (observationEnd) {
            params.observation_end = observationEnd;
          }

          const response = await axios.get(`${FRED_API_BASE}/series/observations`, { params });

          return {
            seriesId,
            data: response.data.observations || [],
          };
        } catch (error: any) {
          return {
            seriesId,
            error: error.message,
            data: [],
          };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error('FRED API error:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to fetch economic data',
        message: error.message
      },
      { status: 500 }
    );
  }
}

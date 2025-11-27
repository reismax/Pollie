import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface AnalysisRequest {
  type: 'bill' | 'news' | 'economic-release' | 'market-event';
  title: string;
  content: string;
  context?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const body: AnalysisRequest = await request.json();
    const { type, title, content, context } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert macroeconomic analyst and policy researcher. Your task is to analyze the provided ${type} and return a structured JSON analysis.

The analysis must be a valid JSON object with the following structure:
{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "economicEffects": {
    "shortRun": ["impact 1", "impact 2"],
    "longRun": ["impact 1", "impact 2"],
    "distributionalEffects": ["effect on households", "effect on firms", "sectoral impacts"],
    "risks": ["risk 1", "risk 2"]
  },
  "marketImplications": {
    "bonds": "analysis of bond market impact",
    "equities": "analysis of equity market impact with sector breakout",
    "fx": "analysis of dollar impact and capital flows",
    "commodities": "analysis of commodity impact (energy, metals, agriculture)"
  },
  "macroLinks": {
    "inflation": "impact on inflation and transmission mechanism",
    "employment": "labor market effects",
    "growth": "GDP impact and growth trajectory",
    "monetaryPolicy": "Fed response expectations and policy implications",
    "fiscalPosition": "deficit and debt implications"
  },
  "stakeholders": {
    "supporters": ["argument 1", "argument 2"],
    "opponents": ["argument 1", "argument 2"]
  },
  "dataNeeded": ["missing data point 1", "missing data point 2"]
}

Provide concrete, specific analysis based on economic theory and empirical evidence. Be objective and balanced.`;

    const userPrompt = `Title: ${title}

Content:
${content}

${context ? `Additional Context:\n${context}` : ''}

Please provide a comprehensive macroeconomic and policy analysis in the JSON format specified.`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        system: systemPrompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    const analysisText = response.data.content[0].text;

    // Try to extract JSON from the response
    let analysis;
    try {
      // Look for JSON in code blocks or raw text
      const jsonMatch = analysisText.match(/```json\s*([\s\S]*?)\s*```/) ||
                       analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        analysis = JSON.parse(analysisText);
      }
    } catch (parseError) {
      // If parsing fails, return a structured error
      return NextResponse.json({
        error: 'Failed to parse analysis',
        rawResponse: analysisText,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        model: 'claude-sonnet-4-20250514',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Claude API error:', error.message);
    return NextResponse.json(
      {
        error: 'Failed to generate analysis',
        message: error.response?.data?.error?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

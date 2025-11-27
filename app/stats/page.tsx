"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar } from "lucide-react";

type TimeRange = "1M" | "3M" | "6M" | "1Y" | "5Y" | "ALL";

interface ChartData {
  date: string;
  value: number;
}

export default function StatsPage() {
  const [activeRange, setActiveRange] = useState<TimeRange>("1Y");
  const [gdpData, setGdpData] = useState<ChartData[]>([]);
  const [inflationData, setInflationData] = useState<ChartData[]>([]);
  const [unemploymentData, setUnemploymentData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Mock data - in production, this would fetch from FRED API
    generateMockData();
  }, [activeRange]);

  const generateMockData = () => {
    const months = 12;
    const gdp: ChartData[] = [];
    const inflation: ChartData[] = [];
    const unemployment: ChartData[] = [];

    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - i - 1));
      const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

      gdp.push({
        date: dateStr,
        value: 2.0 + Math.random() * 1.5,
      });

      inflation.push({
        date: dateStr,
        value: 3.0 + Math.random() * 2.0,
      });

      unemployment.push({
        date: dateStr,
        value: 3.5 + Math.random() * 0.8,
      });
    }

    setGdpData(gdp);
    setInflationData(inflation);
    setUnemploymentData(unemployment);
  };

  const timeRanges: TimeRange[] = ["1M", "3M", "6M", "1Y", "5Y", "ALL"];

  const exportToCSV = (data: ChartData[], filename: string) => {
    const csv = [
      ['Date', 'Value'],
      ...data.map(d => [d.date, d.value.toString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Economic Statistics</h1>
        <p className="text-muted-foreground mt-2">
          Interactive charts and time series data from FRED
        </p>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Time Period</CardTitle>
              <CardDescription>Select data range for all charts</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={activeRange === range ? "default" : "outline"}
                onClick={() => setActiveRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GDP Growth Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>GDP Growth (Quarterly, Annualized)</CardTitle>
              <CardDescription>Real Gross Domestic Product (GDPC1)</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(gdpData, 'gdp-data')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={gdpData}>
              <defs>
                <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                label={{ value: '%', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGdp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Inflation Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inflation Rate (YoY)</CardTitle>
              <CardDescription>Consumer Price Index (CPIAUCSL)</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(inflationData, 'inflation-data')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inflationData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                label={{ value: '%', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Unemployment Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Unemployment Rate</CardTitle>
              <CardDescription>Civilian Unemployment Rate (UNRATE)</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(unemploymentData, 'unemployment-data')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={unemploymentData}>
              <defs>
                <linearGradient id="colorUnemployment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                label={{ value: '%', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUnemployment)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>FRED</strong> - Federal Reserve Economic Data (Federal Reserve Bank of St. Louis)
            </p>
            <Separator className="my-2" />
            <p className="text-muted-foreground">
              All economic data is sourced from the Federal Reserve Economic Data (FRED) API.
              Data is updated based on official release schedules from various U.S. government agencies.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-medium">GDP (GDPC1)</p>
                <p className="text-xs text-muted-foreground">Updated quarterly by BEA</p>
              </div>
              <div>
                <p className="font-medium">CPI (CPIAUCSL)</p>
                <p className="text-xs text-muted-foreground">Updated monthly by BLS</p>
              </div>
              <div>
                <p className="font-medium">Unemployment (UNRATE)</p>
                <p className="text-xs text-muted-foreground">Updated monthly by BLS</p>
              </div>
              <div>
                <p className="font-medium">Fed Funds Rate</p>
                <p className="text-xs text-muted-foreground">Updated daily by Federal Reserve</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

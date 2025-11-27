"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Building2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EconomicIndicator {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  lastUpdated: string;
  icon: any;
}

export default function EconomicsPage() {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([
    {
      id: "cpi",
      name: "Consumer Price Index (YoY)",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      lastUpdated: "2025-11-15",
      icon: DollarSign,
    },
    {
      id: "pce",
      name: "PCE Price Index (YoY)",
      value: "2.8%",
      change: "-0.3%",
      trend: "down",
      lastUpdated: "2025-11-15",
      icon: Activity,
    },
    {
      id: "unemployment",
      name: "Unemployment Rate",
      value: "3.9%",
      change: "+0.1%",
      trend: "up",
      lastUpdated: "2025-11-01",
      icon: Users,
    },
    {
      id: "gdp",
      name: "GDP Growth (QoQ, Annualized)",
      value: "2.4%",
      change: "+0.3%",
      trend: "up",
      lastUpdated: "2025-10-26",
      icon: Building2,
    },
  ]);

  const [fedNews, setFedNews] = useState([
    {
      id: 1,
      title: "FOMC Meeting Minutes: Officials Signal Cautious Approach",
      date: "2025-11-20",
      category: "FOMC",
      summary: "Federal Reserve officials expressed caution about further rate increases, citing recent inflation moderation and labor market stability.",
    },
    {
      id: 2,
      title: "Fed Chair Powell: Data-Dependent Approach Remains Key",
      date: "2025-11-18",
      category: "Speech",
      summary: "Chair Powell emphasized the importance of data dependency in monetary policy decisions, noting that the committee will proceed carefully.",
    },
    {
      id: 3,
      title: "October CPI Report Shows Continued Disinflation",
      date: "2025-11-15",
      category: "Inflation",
      summary: "Consumer prices rose 3.2% year-over-year in October, down from 3.7% in September, marking the fifth consecutive monthly decline.",
    },
    {
      id: 4,
      title: "Jobs Report: 150K Jobs Added, Unemployment Ticks Up to 3.9%",
      date: "2025-11-01",
      category: "Employment",
      summary: "Employers added 150,000 jobs in October while the unemployment rate edged up to 3.9%, suggesting a gradual cooling in the labor market.",
    },
  ]);

  const handleAnalyze = (item: any) => {
    alert(`Analyzing: ${item.title || item.name}. This will integrate with Claude API for detailed economic analysis.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Economic Indicators</h1>
        <p className="text-muted-foreground mt-2">
          Track Federal Reserve updates, inflation, employment, and GDP data
        </p>
      </div>

      {/* Key Indicators Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <Card key={indicator.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs">
                  {indicator.name}
                </CardDescription>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{indicator.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  {indicator.trend === "down" && (
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {indicator.change}
                    </div>
                  )}
                  {indicator.trend === "up" && (
                    <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {indicator.change}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Updated: {formatDate(indicator.lastUpdated)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Federal Reserve & Economic News */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Federal Reserve & Economic News</CardTitle>
              <CardDescription>
                Latest FOMC announcements, economic releases, and policy updates
              </CardDescription>
            </div>
            <Button variant="outline">Refresh</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fedNews.map((news, index) => (
              <div key={news.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{news.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(news.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{news.title}</h3>
                  <p className="text-sm text-muted-foreground">{news.summary}</p>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleAnalyze(news)}>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analyze Impact
                    </Button>
                    <Button variant="outline">Read Full Report</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Releases */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Economic Releases</CardTitle>
          <CardDescription>Key data releases to watch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">FOMC Meeting Decision</p>
                <p className="text-sm text-muted-foreground">Federal Reserve</p>
              </div>
              <Badge>Dec 13, 2025</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">November CPI Report</p>
                <p className="text-sm text-muted-foreground">Bureau of Labor Statistics</p>
              </div>
              <Badge>Dec 10, 2025</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Q3 GDP (Third Estimate)</p>
                <p className="text-sm text-muted-foreground">Bureau of Economic Analysis</p>
              </div>
              <Badge>Dec 21, 2025</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, ExternalLink, Activity } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  category: string;
  summary: string;
  url?: string;
  sentiment?: "positive" | "negative" | "neutral";
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("all");

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Tech Sector Rallies on Strong Earnings, AI Investments Show Promise",
      source: "Reuters",
      date: "2025-11-26",
      category: "Equities",
      summary: "Major technology companies reported better-than-expected quarterly earnings, driven by robust demand for AI infrastructure and cloud services. Microsoft, Google, and Amazon led gains.",
      sentiment: "positive",
      url: "https://reuters.com",
    },
    {
      id: 2,
      title: "Treasury Yields Decline as Fed Signals Potential Pause",
      source: "Bloomberg",
      date: "2025-11-25",
      category: "Fixed Income",
      summary: "The 10-year Treasury yield fell 8 basis points to 4.23% following dovish comments from Federal Reserve officials, suggesting a potential pause in the rate hiking cycle.",
      sentiment: "neutral",
    },
    {
      id: 3,
      title: "Dollar Strengthens Against Major Currencies on Economic Data",
      source: "Financial Times",
      date: "2025-11-25",
      category: "FX",
      summary: "The U.S. Dollar Index (DXY) rose 0.3% as stronger-than-expected retail sales data reinforced economic resilience, attracting capital flows into U.S. assets.",
      sentiment: "positive",
    },
    {
      id: 4,
      title: "Oil Prices Steady Amid OPEC+ Production Uncertainty",
      source: "WSJ",
      date: "2025-11-24",
      category: "Commodities",
      summary: "Crude oil prices held near $78 per barrel as markets await clarity on OPEC+ production decisions. Geopolitical tensions and inventory data continue to influence sentiment.",
      sentiment: "neutral",
    },
    {
      id: 5,
      title: "Banking Stocks Mixed as Regulators Eye Capital Requirements",
      source: "CNBC",
      date: "2025-11-24",
      category: "Equities",
      summary: "Regional bank stocks declined on concerns about stricter capital requirements, while large-cap banks held steady on strong loan growth and net interest margins.",
      sentiment: "negative",
    },
    {
      id: 6,
      title: "Corporate Bond Issuance Hits Record as Spreads Tighten",
      source: "Bloomberg",
      date: "2025-11-23",
      category: "Fixed Income",
      summary: "Investment-grade corporate bond issuance reached a monthly record as credit spreads tightened to multi-year lows, driven by investor appetite for yield.",
      sentiment: "positive",
    },
  ];

  const marketData = [
    {
      name: "S&P 500",
      value: "4,567.23",
      change: "+54.23",
      percent: "+1.20%",
      trend: "up",
    },
    {
      name: "Nasdaq",
      value: "14,234.56",
      change: "+123.45",
      percent: "+0.87%",
      trend: "up",
    },
    {
      name: "Dow Jones",
      value: "35,789.01",
      change: "-45.67",
      percent: "-0.13%",
      trend: "down",
    },
    {
      name: "10Y Treasury",
      value: "4.23%",
      change: "-8 bps",
      percent: "",
      trend: "down",
    },
  ];

  const filterNews = (category: string) => {
    if (category === "all") return newsItems;
    return newsItems.filter((item) => item.category.toLowerCase() === category);
  };

  const handleAnalyze = (news: NewsItem) => {
    alert(`Analyzing: ${news.title}. This will integrate with Claude API for market impact analysis.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Financial Markets</h1>
        <p className="text-muted-foreground mt-2">
          Market news, corporate earnings, and financial regulation updates
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketData.map((market) => (
          <Card key={market.name}>
            <CardHeader className="pb-3">
              <CardDescription>{market.name}</CardDescription>
              <CardTitle className="text-2xl">{market.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                {market.trend === "up" ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{market.change}</span>
                    {market.percent && <span className="ml-1">({market.percent})</span>}
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>{market.change}</span>
                    {market.percent && <span className="ml-1">({market.percent})</span>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market News */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <Card>
          <CardHeader>
            <CardTitle>Market News & Analysis</CardTitle>
            <CardDescription>
              Latest developments in equities, fixed income, FX, and commodities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="equities">Equities</TabsTrigger>
              <TabsTrigger value="fixed income">Bonds</TabsTrigger>
              <TabsTrigger value="fx">FX</TabsTrigger>
              <TabsTrigger value="commodities">Commodities</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filterNews(activeTab).map((news, index) => (
                <div key={news.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{news.category}</Badge>
                      <Badge
                        variant={
                          news.sentiment === "positive"
                            ? "default"
                            : news.sentiment === "negative"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {news.sentiment === "positive" && <TrendingUp className="h-3 w-3 mr-1" />}
                        {news.sentiment === "negative" && <TrendingDown className="h-3 w-3 mr-1" />}
                        {news.sentiment === "neutral" && <Activity className="h-3 w-3 mr-1" />}
                        {news.sentiment || "Neutral"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {news.source} • {formatDate(news.date)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{news.title}</h3>
                    <p className="text-sm text-muted-foreground">{news.summary}</p>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={() => handleAnalyze(news)}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Analyze Market Impact
                      </Button>
                      {news.url && (
                        <Button variant="outline" asChild>
                          <a href={news.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Read Full Article
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Corporate Events</CardTitle>
          <CardDescription>Earnings releases and key corporate announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Apple Inc. (AAPL) Earnings</p>
                <p className="text-sm text-muted-foreground">Q4 2025 Results</p>
              </div>
              <Badge>Nov 30, 2025</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">JPMorgan Chase (JPM) Investor Day</p>
                <p className="text-sm text-muted-foreground">Annual Strategy Presentation</p>
              </div>
              <Badge>Dec 5, 2025</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Tesla (TSLA) Deliveries Report</p>
                <p className="text-sm text-muted-foreground">Q4 2025 Vehicle Deliveries</p>
              </div>
              <Badge>Dec 2, 2025</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

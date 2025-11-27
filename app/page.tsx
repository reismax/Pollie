import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const lastUpdated = new Date().toLocaleString();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Morning Briefing</h1>
          <p className="text-muted-foreground mt-2">
            Your daily macro economic intelligence dashboard
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Daily Brief
          </Button>
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <CardDescription>Overnight developments across all sections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-1">Politics</Badge>
              <p className="text-sm">
                House passes debt ceiling extension with bipartisan support. Senate to vote next week.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-1">Economics</Badge>
              <p className="text-sm">
                Fed officials signal potential pause in rate hikes amid cooling inflation data.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-1">Finance</Badge>
              <p className="text-sm">
                Tech sector rallies on strong earnings. Banking stocks mixed on regulatory concerns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Watch */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>S&P 500</CardDescription>
            <CardTitle className="text-3xl">4,567.23</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span>+1.2% (+54.23)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>10Y Treasury</CardDescription>
            <CardTitle className="text-3xl">4.23%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <TrendingDown className="h-4 w-4" />
              <span>-0.08 bps</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>DXY Index</CardDescription>
            <CardTitle className="text-3xl">103.45</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span>+0.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>CPI (YoY)</CardDescription>
            <CardTitle className="text-3xl">3.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Previous: 3.7%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Topics Carousel */}
      <Card>
        <CardHeader>
          <CardTitle>Key Topics</CardTitle>
          <CardDescription>Today's most important developments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge>High</Badge>
                  <span className="font-semibold">Debt Ceiling Negotiations</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bipartisan agreement reached on short-term extension through Q2 2025
                </p>
              </div>
              <Link href="/politics">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">Medium</Badge>
                  <span className="font-semibold">FOMC Meeting Minutes</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Officials express caution on further tightening despite inflation persistence
                </p>
              </div>
              <Link href="/economics">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">Medium</Badge>
                  <span className="font-semibold">Tech Earnings Season</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Major tech companies beat expectations; AI investments driving growth
                </p>
              </div>
              <Link href="/finance">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/politics">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="text-lg">Congressional Activity</CardTitle>
              <CardDescription>Track bills, votes, and hearings</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/economics">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="text-lg">Economic Indicators</CardTitle>
              <CardDescription>Fed updates and key data releases</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/stats">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="text-lg">Statistics Dashboard</CardTitle>
              <CardDescription>Interactive charts and data</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}

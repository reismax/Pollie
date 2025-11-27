"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ExternalLink, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import axios from "axios";

interface Bill {
  number: string;
  title: string;
  type: string;
  congress: number;
  latestAction?: {
    actionDate: string;
    text: string;
  };
  sponsors?: Array<{
    firstName: string;
    lastName: string;
    party: string;
    state: string;
  }>;
  url?: string;
}

export default function PoliticsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [congress, setCongress] = useState("118");
  const [billType, setBillType] = useState("");

  useEffect(() => {
    fetchBills();
  }, [congress, billType]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        congress,
        limit: "20",
      });
      if (billType) {
        params.append("billType", billType);
      }

      const response = await axios.get(`/api/congress/bills?${params}`);
      setBills(response.data.bills || []);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (bill: Bill) => {
    alert(`Analyzing bill ${bill.type.toUpperCase()} ${bill.number}. This will integrate with Claude API.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Political Activity</h1>
        <p className="text-muted-foreground mt-2">
          Track Congressional bills, votes, and committee hearings
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Congress</label>
            <select
              value={congress}
              onChange={(e) => setCongress(e.target.value)}
              className="border rounded-md px-3 py-2 bg-background"
            >
              <option value="118">118th Congress (2023-2025)</option>
              <option value="117">117th Congress (2021-2023)</option>
              <option value="116">116th Congress (2019-2021)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Bill Type</label>
            <select
              value={billType}
              onChange={(e) => setBillType(e.target.value)}
              className="border rounded-md px-3 py-2 bg-background"
            >
              <option value="">All Types</option>
              <option value="hr">House Bill (HR)</option>
              <option value="s">Senate Bill (S)</option>
              <option value="hjres">House Joint Resolution</option>
              <option value="sjres">Senate Joint Resolution</option>
              <option value="hconres">House Concurrent Resolution</option>
              <option value="sconres">Senate Concurrent Resolution</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={fetchBills}>
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bills List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Bills</h2>
          {!loading && (
            <p className="text-sm text-muted-foreground">
              {bills.length} bills found
            </p>
          )}
        </div>

        {loading && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Loading bills...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-destructive">{error}</p>
              <Button onClick={fetchBills} className="mt-4">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && bills.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No bills found</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && bills.map((bill, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{bill.type?.toUpperCase() || 'BILL'} {bill.number}</Badge>
                    {bill.sponsors && bill.sponsors[0] && (
                      <Badge variant="outline">
                        {bill.sponsors[0].party}-{bill.sponsors[0].state}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">
                    {bill.title || `Bill ${bill.number}`}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bill.sponsors && bill.sponsors[0] && (
                  <div className="text-sm">
                    <span className="font-medium">Sponsor: </span>
                    <span className="text-muted-foreground">
                      {bill.sponsors[0].firstName} {bill.sponsors[0].lastName}
                      ({bill.sponsors[0].party}-{bill.sponsors[0].state})
                    </span>
                  </div>
                )}

                {bill.latestAction && (
                  <div className="text-sm">
                    <span className="font-medium">Latest Action: </span>
                    <span className="text-muted-foreground">
                      {bill.latestAction.text}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({formatDate(bill.latestAction.actionDate)})
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button onClick={() => handleAnalyze(bill)}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analyze Bill
                  </Button>
                  {bill.url && (
                    <Button variant="outline" asChild>
                      <a href={bill.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Congress.gov
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

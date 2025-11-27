# Pollie - Macro Economic Research & Policy Analysis Tool

A comprehensive Next.js 14 application for tracking congressional activity, economic indicators, financial markets, and generating AI-powered policy analysis.

## 🚀 Quick Deploy (2 Minutes)

**Deploy to Vercel (Easiest):**

1. Click this link: https://vercel.com/new/clone?repository-url=https://github.com/reismax/Pollie
2. Connect your GitHub account (if not already)
3. Click "Deploy"
4. Add your API keys in the Vercel dashboard (Settings → Environment Variables)
5. Done! Your app will be live at `your-project.vercel.app`

**Or use the Vercel CLI:**

```bash
# Make sure you're in the Pollie directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (choose your account)
# - Link to existing project? No
# - Project name? pollie (or your choice)
# - Directory? ./
# - Override settings? No

# Add environment variables:
vercel env add CONGRESS_API_KEY
vercel env add FRED_API_KEY
vercel env add ANTHROPIC_API_KEY

# Redeploy with env vars:
vercel --prod
```

Your app will be live in ~2 minutes! 🎉

## Features

- **Morning Briefing Dashboard**: Executive summary of overnight developments across all sections
- **Political Activity Tracker**: Real-time Congressional bills, votes, and hearings via Congress.gov API
- **Economic Indicators**: Federal Reserve updates, inflation, employment, and GDP tracking via FRED API
- **Financial Markets**: Market news aggregator with sentiment analysis for equities, bonds, FX, and commodities
- **Interactive Statistics**: Charts and time series data visualization with export capabilities
- **AI-Powered Analysis**: Claude API integration for detailed economic and policy impact analysis
- **Dark Mode**: Full dark/light theme support
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Database**: SQLite with Prisma ORM
- **Charts**: Recharts
- **AI**: Anthropic Claude API
- **Data Sources**: Congress.gov API, FRED API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API Keys:
  - Congress.gov API key (get from https://api.data.gov)
  - FRED API key (get from https://research.stlouisfed.org/docs/api/api_key.html)
  - Anthropic API key (get from https://console.anthropic.com)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Pollie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your API keys:
   ```env
   DATABASE_URL="file:./dev.db"
   CONGRESS_API_KEY=your_congress_api_key_here
   FRED_API_KEY=your_fred_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

5. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Pollie/
├── app/                      # Next.js 14 App Router
│   ├── api/                  # API Routes
│   │   ├── congress/         # Congress.gov API integration
│   │   ├── fred/             # FRED API integration
│   │   └── claude/           # Claude API integration
│   ├── politics/             # Politics page
│   ├── economics/            # Economics page
│   ├── finance/              # Finance page
│   ├── stats/                # Statistics page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── navigation.tsx        # Navigation bar
│   └── theme-provider.tsx    # Theme provider
├── lib/                      # Utility functions
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Helper functions
├── prisma/                   # Database schema
│   └── schema.prisma         # Prisma schema
└── public/                   # Static assets
```

## API Routes

### Congress.gov API
- `GET /api/congress/bills` - Fetch list of bills
- `GET /api/congress/bill/[congress]/[type]/[number]` - Fetch specific bill details

### FRED API
- `GET /api/fred/series?series_id=GDPC1` - Fetch economic data series
- `POST /api/fred/multiple` - Fetch multiple series at once

### Claude API
- `POST /api/claude/analyze` - Generate AI-powered policy analysis

## Database Schema

The application uses SQLite with Prisma ORM. Key models:

- **NewsItem**: Stores news articles and policy updates
- **Analysis**: AI-generated analysis linked to news items
- **EconomicData**: Time series economic data from FRED
- **DailyBrief**: Generated daily briefings
- **CongressBill**: Congressional bill information

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Features in Detail

### Pollie Analysis Engine

When users click "Analyze" on any item, the app calls the Claude API with a structured prompt that returns:

- **Summary**: Key takeaways in bullet points
- **Economic Effects**: Short-run, long-run, distributional effects, and risks
- **Market Implications**: Impact on bonds, equities, FX, and commodities
- **Macro Links**: Connections to inflation, employment, growth, monetary policy, and fiscal position
- **Stakeholders**: Arguments from supporters and opponents
- **Data Needed**: Missing information for complete analysis

### Data Caching

API responses are cached to minimize external API calls:
- Congressional data: Updates every 6 hours
- Economic data: Updates daily
- News data: Updates every 15 minutes when page is active

## Deployment

The application can be deployed to:
- Vercel (recommended for Next.js)
- Railway
- AWS
- Any Node.js hosting platform

For production deployment:
1. Set environment variables in your hosting platform
2. Configure database (SQLite for development, PostgreSQL recommended for production)
3. Build the application: `npm run build`
4. Start the server: `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Congress.gov API for legislative data
- Federal Reserve Economic Data (FRED) for economic statistics
- Anthropic Claude for AI-powered analysis
- shadcn/ui for beautiful UI components

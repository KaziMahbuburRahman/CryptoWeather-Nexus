# CryptoWeather Nexus

A modern, multi-page dashboard combining weather data, cryptocurrency information, and real-time notifications via WebSocket.

## Features

- 🌤️ Real-time weather data for multiple cities
- 💰 Live cryptocurrency prices and market data
- 📰 Latest crypto-related news
- 🔔 Real-time notifications for price changes and weather alerts
- 📱 Responsive design with modern UI/UX
- 🔄 Real-time data updates via WebSocket

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations
- WebSocket for real-time updates

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KaziMahbuburRahman/CryptoWeather-Nexus.git
cd CryptoWeather-Nexus
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your API keys:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
COINGECKO_API_KEY=your_coingecko_api_key
NEWSDATA_API_KEY=your_newsdata_api_key
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── features/           # Redux slices and feature-specific components
├── hooks/              # Custom React hooks
├── services/           # API and WebSocket services
├── store/              # Redux store configuration
├── styles/             # Global styles and Tailwind config
└── types/              # TypeScript type definitions
```

## API Integrations

- Weather Data: OpenWeatherMap API
- Cryptocurrency Data: CoinGecko API
- News: NewsData.io API
- Real-time Updates: WebSocket connections

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

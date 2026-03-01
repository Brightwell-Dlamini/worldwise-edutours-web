import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnalyticsCards } from './components/AnalyticsCards';
import { EquityCurve } from './components/EquityCurve';
import { TradeList } from './components/TradeList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <header className="bg-gray-800/80 backdrop-blur-sm p-6 shadow-xl border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              TradeZella Clone - Your Edge Forge
            </h1>
            <p className="text-center mt-3 text-gray-300 text-lg">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-300 font-medium">
                🔥 5 trades loaded – dissect or die
              </span>
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
          <AnalyticsCards />
          <EquityCurve />
          <TradeList />
        </main>

        {/* Optional footer */}
        <footer className="mt-12 py-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>Trade Journal • Built with React + Tailwind</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;

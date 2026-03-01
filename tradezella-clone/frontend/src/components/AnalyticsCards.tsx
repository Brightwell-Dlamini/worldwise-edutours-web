import React from 'react';
import useTrades from '../hooks/useTrades';
import {
  Trophy,
  Target,
  TrendingUp,
  BarChart3,
  Sparkles,
  Zap,
  Award,
  LineChart as LineChartIcon,
} from 'lucide-react';

export const AnalyticsCards: React.FC = () => {
  const { data: trades = [], isLoading } = useTrades();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700/30 animate-pulse"
          >
            <div className="h-6 bg-gray-700/50 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-700/30 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const closedTrades = trades.filter((t: any) => t.exitPrice && t.exitTime);
  const wins = closedTrades.filter((t: any) => {
    const pl =
      (t.direction === 'LONG'
        ? t.exitPrice - t.entryPrice
        : t.entryPrice - t.exitPrice) * t.positionSize;
    return pl > 0;
  });

  const winRate = closedTrades.length
    ? ((wins.length / closedTrades.length) * 100).toFixed(1)
    : '0';

  const avgR = closedTrades.length
    ? closedTrades.reduce(
        (sum: number, t: any) => sum + (t.rMultiple || 0),
        0
      ) / closedTrades.length
    : 0;

  const totalPL = closedTrades.reduce((sum: number, t: any) => {
    const pl =
      (t.direction === 'LONG'
        ? t.exitPrice - t.entryPrice
        : t.entryPrice - t.exitPrice) *
      t.positionSize *
      100000;
    return sum + pl;
  }, 0);

  const profitFactor =
    closedTrades.length > 0
      ? wins.reduce((sum: number, t: any) => {
          return sum + Math.abs((t.exitPrice - t.entryPrice) * t.positionSize);
        }, 0) /
          Math.abs(
            closedTrades
              .filter((t: any) => {
                const pl =
                  (t.direction === 'LONG'
                    ? t.exitPrice - t.entryPrice
                    : t.entryPrice - t.exitPrice) * t.positionSize;
                return pl < 0;
              })
              .reduce((sum: number, t: any) => {
                return (
                  sum + Math.abs((t.exitPrice - t.entryPrice) * t.positionSize)
                );
              }, 0)
          ) || 0
      : 0;

  const cards = [
    {
      title: 'Win Rate',
      value: `${winRate}%`,
      subtext: `${wins.length}/${closedTrades.length} wins`,
      icon: Trophy,
      gradient: 'from-emerald-500 to-cyan-500',
      bg: 'bg-emerald-900/20',
      border: 'border-emerald-700/30',
      trend: parseFloat(winRate) > 50 ? 'up' : 'down',
    },
    {
      title: 'Average R',
      value: `${avgR.toFixed(2)}R`,
      subtext: avgR > 0 ? 'Positive expectancy' : 'Negative expectancy',
      icon: Target,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-900/20',
      border: 'border-amber-700/30',
      trend: avgR > 0 ? 'up' : 'down',
    },
    {
      title: 'Total P/L',
      value: `$${totalPL.toFixed(2)}`,
      subtext: totalPL >= 0 ? 'Profitable' : 'In drawdown',
      icon: TrendingUp,
      gradient:
        totalPL >= 0
          ? 'from-emerald-500 to-green-500'
          : 'from-rose-500 to-pink-500',
      bg: totalPL >= 0 ? 'bg-emerald-900/20' : 'bg-rose-900/20',
      border: totalPL >= 0 ? 'border-emerald-700/30' : 'border-rose-700/30',
      trend: totalPL >= 0 ? 'up' : 'down',
    },
    {
      title: 'Profit Factor',
      value: profitFactor.toFixed(2),
      subtext:
        profitFactor > 1.5
          ? 'Excellent'
          : profitFactor > 1
          ? 'Good'
          : 'Needs work',
      icon: BarChart3,
      gradient: 'from-purple-500 to-indigo-500',
      bg: 'bg-purple-900/20',
      border: 'border-purple-700/30',
      trend: profitFactor > 1 ? 'up' : 'down',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} backdrop-blur-sm p-6 rounded-2xl shadow-xl border ${card.border} relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
        >
          {/* Background glow effect */}
          <div
            className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-300`}
          ></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{card.subtext}</p>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex items-end justify-between mt-6">
              <p
                className={`text-4xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
              >
                {card.value}
              </p>

              {card.trend === 'up' ? (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-300 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Strong</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-900/30 text-amber-300 text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Improve</span>
                </div>
              )}
            </div>

            {/* Progress bar for win rate */}
            {card.title === 'Win Rate' && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{winRate}%</span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.min(parseFloat(winRate), 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Summary badge at the bottom */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
        <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-gray-300">Overall Performance</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LineChartIcon className="w-4 h-4 text-emerald-400" />
              <span
                className={`text-sm font-medium ${
                  totalPL >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {totalPL >= 0 ? 'Profitable' : 'In Drawdown'}
              </span>
            </div>
            <div className="text-xs text-gray-500">Updated just now</div>
          </div>
        </div>
      </div>
    </div>
  );
};

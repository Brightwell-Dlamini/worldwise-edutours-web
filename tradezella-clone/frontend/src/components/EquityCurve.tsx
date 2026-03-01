import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { format } from 'date-fns';
import useTrades from '../hooks/useTrades';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const EquityCurve: React.FC = () => {
  const { data: trades = [], isLoading } = useTrades();

  const sorted = [...trades].sort(
    (a, b) =>
      new Date(a.exitTime || a.entryTime).getTime() -
      new Date(b.exitTime || b.entryTime).getTime()
  );

  let cumulative = 0;
  let peak = 0;
  let maxDrawdown = 0;

  const data = sorted
    .map((t) => {
      if (!t.exitPrice) return null;
      const pl =
        (t.direction === 'LONG'
          ? t.exitPrice - t.entryPrice
          : t.entryPrice - t.exitPrice) *
        t.positionSize *
        100000;
      cumulative += pl;
      peak = Math.max(peak, cumulative);
      const drawdown = peak - cumulative;
      maxDrawdown = Math.max(maxDrawdown, drawdown);

      return {
        date: format(new Date(t.exitTime!), 'MMM dd'),
        equity: cumulative,
        drawdown,
      };
    })
    .filter(Boolean);

  const totalReturn = data.length > 0 ? data[data.length - 1]?.equity || 0 : 0;
  const isPositive = totalReturn >= 0;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/30 animate-pulse">
        <div className="h-8 bg-gray-700/50 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-gray-700/30 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/30">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            Equity Curve
          </h2>
          <p className="text-gray-400 mt-2">Performance over time</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/30">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Total Return</span>
            </div>
            <p
              className={`text-2xl font-bold mt-2 ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              ${totalReturn.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/30">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Max Drawdown</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-amber-400">
              ${maxDrawdown.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? '#10B981' : '#EF4444'}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? '#10B981' : '#EF4444'}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '0.75rem',
                backdropFilter: 'blur(8px)',
              }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Equity']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="equity"
              stroke={isPositive ? '#10B981' : '#EF4444'}
              strokeWidth={3}
              fill="url(#equityGradient)"
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700/30">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Equity Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>Drawdown Periods</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {data.length} closed trades analyzed
          </span>
        </div>
      </div>
    </div>
  );
};

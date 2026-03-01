import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import useTrades from '../hooks/useTrades';
import {
  Filter,
  Search,
  Download,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { TradeModal } from './TradeModal';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

interface Trade {
  id: number;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number | null;
  rMultiple: number | null;
  positionSize: number;
  notes: string | null;
  entryTime: string;
  exitTime: string | null;
  instrument: string;
  stopLoss: number | null;
  takeProfit: number | null;
  tags: { tag: string }[];
  images: { imagePath: string }[];
}

export const TradeList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: trades = [], isLoading } = useTrades();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

  const deleteTrade = async (id: number) => {
    const userConfirmed = window.confirm('Delete this trade permanently?');

    if (userConfirmed) {
      await axios.delete(`/trades/${id}`);
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    }
  };

  const columns: ColumnDef<Trade>[] = [
    {
      accessorKey: 'symbol',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          Symbol
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ChevronDown className="w-4 h-4" />
          ) : null}
        </button>
      ),
      cell: ({ getValue, row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700">
            <span className="font-bold text-lg">
              {getValue<string>().substring(0, 3)}
            </span>
          </div>
          <div>
            <span className="font-bold text-lg block">
              {getValue<string>()}
            </span>
            <span className="text-xs text-gray-500">
              {row.original.instrument}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'direction',
      header: 'Direction',
      cell: ({ getValue }) => {
        const direction = getValue<'LONG' | 'SHORT'>();
        const Icon = direction === 'LONG' ? TrendingUp : TrendingDown;
        return (
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-lg ${
                direction === 'LONG' ? 'bg-emerald-900/30' : 'bg-rose-900/30'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  direction === 'LONG' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              />
            </div>
            <span
              className={`font-semibold ${
                direction === 'LONG' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {direction}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'entryPrice',
      header: 'Entry',
      cell: ({ getValue, row }) => (
        <div>
          <span className="font-mono font-bold">
            {getValue<number>().toFixed(5)}
          </span>
          <div className="text-xs text-gray-500">
            SL: {row.original.stopLoss?.toFixed(5) || '-'}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'exitPrice',
      header: 'Exit',
      cell: ({ getValue, row }) => {
        const value = getValue<number | null>();
        return (
          <div>
            <span className="font-mono font-bold">
              {value ? (
                value.toFixed(5)
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </span>
            <div className="text-xs text-gray-500">
              TP: {row.original.takeProfit?.toFixed(5) || '-'}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'rMultiple',
      header: 'R-Multiple',
      cell: ({ getValue }) => {
        const value = getValue<number | null>();
        if (!value) return <span className="text-gray-500">-</span>;

        const isPositive = value > 0;
        const magnitude = Math.abs(value);

        return (
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-lg ${
                isPositive ? 'bg-emerald-900/30' : 'bg-rose-900/30'
              } border ${
                isPositive ? 'border-emerald-700/30' : 'border-rose-700/30'
              }`}
            >
              <span
                className={`font-bold ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {value.toFixed(2)}R
              </span>
            </div>
            {magnitude > 2 && (
              <span className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-300">
                {magnitude > 3 ? '🔥 Great' : 'Good'}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ getValue }) => (
        <div className="max-w-[200px]">
          <span className="text-gray-300 line-clamp-2">
            {getValue<string | null>() || 'No notes'}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingTrade(row.original);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            title="Edit trade"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => deleteTrade(row.original.id)}
            className="p-2 hover:bg-rose-900/30 rounded-lg transition-colors"
            title="Delete trade"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: trades,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/30">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-10 bg-gray-700/50 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-700/30 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gray-700/50 rounded w-24"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-700/30 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const profitableTrades = trades.filter(
    (t: Trade) => (t.rMultiple || 0) > 0
  ).length;
  const totalRMultiple = trades.reduce(
    (sum: number, t: Trade) => sum + (t.rMultiple || 0),
    0
  );
  const avgRMultiple = trades.length ? totalRMultiple / trades.length : 0;

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/30">
      {/* Header with stats and filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
            Trade Journal
          </h2>
          <p className="text-gray-400 mt-2">
            Analyze and manage your trading performance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Add Trade Button */}
          <button
            onClick={() => {
              setEditingTrade(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-bold hover:from-emerald-700 hover:to-cyan-700 flex items-center gap-2 order-first sm:order-none"
          >
            <Plus className="w-5 h-5" />
            Add Trade
          </button>

          {/* Search and filter bar */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search trades..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 text-white w-full"
              />
            </div>

            <button className="p-2.5 bg-gray-900/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-colors">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>

            <button className="p-2.5 bg-gray-900/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-colors">
              <Download className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Stats badges */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-900/20 border border-emerald-700/30 rounded-xl">
              <div className="text-sm text-emerald-400 font-medium">
                {profitableTrades} Profitable
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-900/50 border border-gray-700/30 rounded-xl">
              <div className="text-sm text-gray-300 font-medium">
                {trades.length} Total
              </div>
            </div>
            <div
              className={`px-4 py-2 ${
                avgRMultiple > 0
                  ? 'bg-emerald-900/20 border-emerald-700/30'
                  : 'bg-amber-900/20 border-amber-700/30'
              } border rounded-xl`}
            >
              <div
                className={`text-sm font-medium ${
                  avgRMultiple > 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {avgRMultiple.toFixed(2)} Avg R
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700/50 bg-gray-900/20">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-700/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 px-6 text-left text-gray-300 font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors duration-200 last:border-0 group"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {trades.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 mb-6">
            <div className="text-4xl">📈</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-3">
            No trades yet
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Start tracking your trades to see detailed analytics and improve
            your trading performance.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
          >
            Add Your First Trade
          </button>
        </div>
      )}

      {/* Table footer */}
      {trades.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-700/30">
          <div className="text-sm text-gray-500">
            Showing {table.getRowModel().rows.length} of {trades.length} trades
          </div>
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-colors text-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Page <span className="font-semibold text-gray-300">1</span> of{' '}
              <span className="font-semibold text-gray-300">1</span>
            </span>
            <button
              className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-colors text-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <TradeModal
          trade={editingTrade}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTrade(null);
          }}
        />
      )}
    </div>
  );
};

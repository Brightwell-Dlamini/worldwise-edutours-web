import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { X, Upload, Trash2 } from 'lucide-react';

const tradeSchema = z.object({
  instrument: z.enum(['FOREX', 'CRYPTO', 'STOCK', 'FUTURES', 'CFD']),
  symbol: z.string().min(1, 'Symbol required'),
  currency: z.enum(['USD', 'ZAR']),
  direction: z.enum(['LONG', 'SHORT']),
  entryPrice: z.number().positive('Valid price required'),
  exitPrice: z.number().nullable().optional(),
  positionSize: z.number().positive('Size required'),
  stopLoss: z.number().nullable().optional(),
  takeProfit: z.number().nullable().optional(),
  entryTime: z.string().min(1, 'Entry time required'),
  exitTime: z.string().optional(),
  notes: z.string().optional(),
  tags: z
    .array(
      z.enum([
        'BREAKOUT',
        'PULLBACK',
        'REVERSAL',
        'SCALP',
        'SWING',
        'FOMO',
        'REVENGE',
        'OVERTRADING',
        'CUT_WINNER_EARLY',
        'MOVED_STOP',
        'GOOD_EXECUTION',
        'POOR_RISK',
        'NEWS_TRADE',
      ])
    )
    .default([])
    .optional(),
});

type TradeForm = z.infer<typeof tradeSchema>;

interface TradeModalProps {
  trade?: any; // Existing trade for edit
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ trade, onClose }) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<string[]>(
    trade?.images?.map((i: any) => i.imagePath) || []
  );
  const [rMultiple, setRMultiple] = useState<number | null>(
    trade?.rMultiple || null
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TradeForm>({
    resolver: zodResolver(tradeSchema),
    defaultValues: trade
      ? {
          ...trade,
          entryTime: new Date(trade.entryTime).toISOString().slice(0, 16),
          exitTime: trade.exitTime
            ? new Date(trade.exitTime).toISOString().slice(0, 16)
            : '',
          tags: trade.tags?.map((t: any) => t.tag) || [],
        }
      : {
          currency: 'USD',
          instrument: 'FOREX',
          direction: 'LONG',
          entryTime: new Date().toISOString().slice(0, 16),
          tags: [],
        },
  });

  const watchFields = watch([
    'direction',
    'entryPrice',
    'exitPrice',
    'stopLoss',
  ]);

  useEffect(() => {
    const [direction, entry, exit, sl] = watchFields;
    if (entry && sl && exit && sl !== 0) {
      const risk = direction === 'LONG' ? entry - sl : sl - entry;
      const reward = direction === 'LONG' ? exit - entry : entry - exit;
      if (risk > 0) setRMultiple(reward / risk);
    } else {
      setRMultiple(null);
    }
  }, [watchFields]);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (trade) {
        return axios.put(`/trades/${trade.id}`, data);
      }
      return axios.post('/trades', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      onClose();
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = handleSubmit((formData: TradeForm) => {
    const payload = {
      ...formData,
      entryPrice: Number(formData.entryPrice),
      exitPrice: formData.exitPrice ? Number(formData.exitPrice) : null,
      positionSize: Number(formData.positionSize),
      stopLoss: formData.stopLoss ? Number(formData.stopLoss) : null,
      takeProfit: formData.takeProfit ? Number(formData.takeProfit) : null,
      rMultiple: rMultiple,
      images: images.map((path) => ({ imagePath: path })),
      tags: formData.tags?.map((tag) => ({ tag })) || [],
    };
    mutation.mutate(payload);
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            {trade ? 'Edit Trade' : 'Add New Trade'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Instrument
              </label>
              <select
                {...register('instrument')}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500"
              >
                <option>FOREX</option>
                <option>CRYPTO</option>
                <option>STOCK</option>
                <option>FUTURES</option>
                <option>CFD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Symbol</label>
              <input
                {...register('symbol')}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
              {errors.symbol && (
                <p className="text-rose-400 text-sm mt-1">
                  {errors.symbol.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Direction
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="LONG"
                    {...register('direction')}
                    className="text-emerald-500"
                  />
                  <span className="text-emerald-400 font-bold">LONG</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="SHORT"
                    {...register('direction')}
                    className="text-rose-500"
                  />
                  <span className="text-rose-400 font-bold">SHORT</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                {...register('currency')}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500"
              >
                <option>USD</option>
                <option>ZAR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Entry Price
              </label>
              <input
                type="number"
                step="any"
                {...register('entryPrice', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Exit Price
              </label>
              <input
                type="number"
                step="any"
                {...register('exitPrice', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stop Loss
              </label>
              <input
                type="number"
                step="any"
                {...register('stopLoss', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Take Profit
              </label>
              <input
                type="number"
                step="any"
                {...register('takeProfit', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Position Size
              </label>
              <input
                type="number"
                step="any"
                {...register('positionSize', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Live R-Multiple
              </label>
              <div
                className={`px-4 py-3 rounded-xl font-bold text-2xl ${
                  rMultiple && rMultiple > 0
                    ? 'text-emerald-400 bg-emerald-900/20'
                    : rMultiple
                    ? 'text-rose-400 bg-rose-900/20'
                    : 'text-gray-500'
                }`}
              >
                {rMultiple ? `${rMultiple.toFixed(2)}R` : '-'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Entry Time
              </label>
              <input
                type="datetime-local"
                {...register('entryTime')}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Exit Time
              </label>
              <input
                type="datetime-local"
                {...register('exitTime')}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (multi-select)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                'BREAKOUT',
                'PULLBACK',
                'REVERSAL',
                'SCALP',
                'SWING',
                'FOMO',
                'REVENGE',
                'OVERTRADING',
                'CUT_WINNER_EARLY',
                'MOVED_STOP',
                'GOOD_EXECUTION',
                'POOR_RISK',
                'NEWS_TRADE',
              ].map((tag) => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={watch('tags')?.includes(tag as any)}
                    onChange={(e) => {
                      const current = watch('tags') || [];
                      if (e.target.checked) {
                        setValue('tags', [...current, tag as any]);
                      } else {
                        setValue(
                          'tags',
                          current.filter((t) => t !== tag)
                        );
                      }
                    }}
                    className="text-emerald-500"
                  />
                  <span className="text-sm">{tag.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              {...register('notes')}
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors">
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Click to upload screenshots
                </span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
              {images.map((src, i) => (
                <div key={i} className="relative group">
                  <img
                    src={src}
                    alt="trade"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 rounded-xl hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-bold hover:from-emerald-700 hover:to-cyan-700"
            >
              {trade ? 'Update Trade' : 'Save Trade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

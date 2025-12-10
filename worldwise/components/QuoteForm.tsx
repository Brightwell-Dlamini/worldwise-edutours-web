'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const schema = z.object({
  schoolName: z.string().min(3),
  contactPerson: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  gradeLevels: z.string(),
  studentCount: z.string(),
  preferredDates: z.string(),
  tourType: z.string(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase
      .from('quotes')
      .insert([{ ...data, created_at: new Date().toISOString() }]);

    if (!error) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal/10">
        <div className="text-center p-16 bg-white rounded-3xl shadow-2xl">
          <h2 className="text-5xl font-montserrat font-bold text-teal mb-6">
            Thank You!
          </h2>
          <p className="text-2xl text-navy">
            We’ll contact you within 24 hours
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-montserrat font-bold text-center text-navy mb-4">
          Get Your Free Quote
        </h1>
        <p className="text-xl text-center text-neutralGray mb-12">
          Takes less than 2 minutes
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <input
                {...register('schoolName')}
                placeholder="School Name"
                className="w-full p-5 rounded-xl border-2"
              />
              <input
                {...register('contactPerson')}
                placeholder="Contact Person"
                className="w-full p-5 rounded-xl border-2"
              />
              <input
                {...register('phone')}
                placeholder="Phone / WhatsApp"
                className="w-full p-5 rounded-xl border-2"
              />
              <input
                {...register('email')}
                placeholder="Email"
                className="w-full p-5 rounded-xl border-2"
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-5 bg-teal text-navy font-bold text-xl rounded-xl"
              >
                Next →
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <select
                {...register('gradeLevels')}
                className="w-full p-5 rounded-xl border-2"
              >
                <option>Grade Levels</option>
                <option>Primary (1–7)</option>
                <option>Junior Secondary (Form 1–3)</option>
                <option>Senior Secondary (Form 4–5)</option>
              </select>
              <input
                {...register('studentCount')}
                placeholder="Number of Students"
                className="w-full p-5 rounded-xl border-2"
              />
              <input
                {...register('preferredDates')}
                placeholder="Preferred Dates (e.g. Term 2)"
                className="w-full p-5 rounded-xl border-2"
              />
              <select
                {...register('tourType')}
                className="w-full p-5 rounded-xl border-2"
              >
                <option>Tour Type</option>
                <option>Local One-Day</option>
                <option>Regional (3+ days)</option>
                <option>Teacher Development</option>
              </select>
              <textarea
                {...register('message')}
                placeholder="Additional Notes (optional)"
                rows={4}
                className="w-full p-5 rounded-xl border-2"
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 bg-gray-300 text-navy font-bold rounded-xl"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-5 bg-greenYellow text-navy font-bold text-xl rounded-xl hover:bg-teal transition"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

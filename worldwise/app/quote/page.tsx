'use client';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    school_name: '',
    contact_person: '',
    phone: '',
    email: '',
    grades: '',
    num_students: '',
    preferred_tour: '',
    preferred_dates: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('quotes').insert([{ ...form }]);

    if (!error) {
      setSubmitted(true);
      // WhatsApp redirect
      const waMsg = encodeURIComponent(
        `*New Quote Request!*\n\nSchool: ${form.school_name}\nContact: ${form.contact_person}\nPhone: ${form.phone}\nEmail: ${form.email}\nGrades: ${form.grades}\nStudents: ${form.num_students}\nTour: ${form.preferred_tour}\nDates: ${form.preferred_dates}\nMessage: ${form.message}`
      );
      window.open(`https://wa.me/26876120713?text=${waMsg}`, '_blank');
    } else {
      alert('Error submitting. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-teal flex items-center justify-center px-6">
        <div className="max-w-2xl text-center text-white">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-8">
            Thank You!
          </h1>
          <p className="text-2xl mb-8">
            We’ve received your request and are reviewing it now.
          </p>
          <p className="text-xl">
            Nelsiwe Nicky will contact you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-navy via-teal to-navy py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-16">
            <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6">
              Get Your Custom Quote
            </h1>
            <p className="text-xl opacity-90">
              Takes less than 2 minutes • 100% free • No commitment
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/95 dark:bg-navy/95 rounded-3xl shadow-2xl p-10"
          >
            {/* Progress */}
            <div className="flex justify-center gap-4 mb-12">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all ${
                    step >= n
                      ? 'bg-teal text-navy'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-montserrat font-bold text-navy dark:text-white text-center mb-10">
                  School Details
                </h2>
                <input
                  type="text"
                  placeholder="School Name *"
                  required
                  className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                  onChange={(e) =>
                    setForm({ ...form, school_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Contact Person *"
                  required
                  className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                  onChange={(e) =>
                    setForm({ ...form, contact_person: e.target.value })
                  }
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-6 bg-teal text-navy font-bold text-xl rounded-xl hover:bg-greenYellow transition-all"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-montserrat font-bold text-navy dark:text-white text-center mb-10">
                  Tour Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Grades Involved (e.g. Grade 8-12)"
                    required
                    className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                    onChange={(e) =>
                      setForm({ ...form, grades: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Number of Students"
                    required
                    className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                    onChange={(e) =>
                      setForm({ ...form, num_students: e.target.value })
                    }
                  />
                </div>
                <select
                  required
                  className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                  onChange={(e) =>
                    setForm({ ...form, preferred_tour: e.target.value })
                  }
                >
                  <option value="">Preferred Tour Type</option>
                  <option>Local One-Day Tour</option>
                  <option>Regional Exchange (e.g. Mozambique)</option>
                  <option>International Study Tour</option>
                  <option>Teacher Development</option>
                </select>
                <input
                  type="text"
                  placeholder="Preferred Dates (e.g. Term 2 holidays)"
                  className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg"
                  onChange={(e) =>
                    setForm({ ...form, preferred_dates: e.target.value })
                  }
                />
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-6 border-2 border-teal text-teal font-bold text-xl rounded-xl hover:bg-teal hover:text-navy transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-6 bg-teal text-navy font-bold text-xl rounded-xl hover:bg-greenYellow transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-montserrat font-bold text-navy dark:text-white text-center mb-10">
                  Final Details
                </h2>
                <textarea
                  placeholder="Any special requests or questions?"
                  rows={6}
                  className="w-full px-6 py-5 rounded-xl border-2 border-gray-300 focus:border-teal outline-none text-lg resize-none"
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-greenYellow text-navy font-bold text-2xl rounded-xl hover:bg-teal transition-all disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Submit Request & Open WhatsApp →'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 text-teal font-bold hover:underline"
                >
                  ← Back to edit
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

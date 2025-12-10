import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Ministry Partnership | WorldWise Educational Tours',
  description:
    'Strategic partnership proposal with the Ministry of Education & Training',
};

export default function MinistryPartnership() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy/95">
        <Image
          src="/assets/tour3.jpg" // ← your Mozambique bus flyer (or any high-impact image)
          alt="Students on educational tour"
          fill
          className="object-cover brightness-50"
          sizes="100vw"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold mb-8">
            Strategic Partnership
            <br className="hidden sm:block" />
            with the Ministry of Education & Training
          </h1>
          <p className="text-2xl md:text-3xl font-inter mb-12 max-w-5xl mx-auto">
            Transforming Eswatini’s education through real-world,
            curriculum-aligned experiential learning
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              href="/assets/WorldWise-Ministry-Proposal.pdf"
              target="_blank"
              className="px-12 py-6 bg-teal text-navy font-montserrat font-bold text-xl rounded-full hover:bg-greenYellow transition-all shadow-2xl"
            >
              Download Full Proposal (PDF)
            </Link>
            <Link
              href="/quote"
              className="px-12 py-6 bg-white/20 backdrop-blur border-4 border-white text-white font-montserrat font-bold text-xl rounded-full hover:bg-white hover:text-navy transition-all"
            >
              Schedule a Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* Budget Table */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-neutralGray/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center text-navy dark:text-white mb-16">
            Transparent Annual Budget
          </h2>
          <div className="overflow-x-auto rounded-2xl shadow-2xl">
            <table className="w-full bg-white dark:bg-navy/90 text-left">
              <thead className="bg-teal text-navy font-montserrat font-bold text-lg">
                <tr>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6 text-right">Estimated Cost (SZL)</th>
                </tr>
              </thead>
              <tbody className="text-neutralGray dark:text-gray-200 text-lg">
                {[
                  {
                    cat: 'Local Tours (logistics & coordination)',
                    cost: '1,200,000',
                  },
                  { cat: 'Regional Exchange Programs', cost: '2,500,000' },
                  { cat: 'International Study Tours', cost: '4,800,000' },
                  { cat: 'Teacher Development Programs', cost: '1,500,000' },
                  { cat: 'Administration & Monitoring', cost: '800,000' },
                ].map((item, i) => (
                  <tr key={i} className="border-b dark:border-white/10">
                    <td className="px-8 py-6">{item.cat}</td>
                    <td className="px-8 py-6 text-right font-bold">
                      {item.cost}
                    </td>
                  </tr>
                ))}
                <tr className="bg-greenYellow/20 font-montserrat font-bold text-xl">
                  <td className="px-8 py-8">Total Estimated Annual Budget</td>
                  <td className="px-8 py-8 text-right text-teal">10,800,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center text-navy dark:text-white mb-16">
            Expected Benefits for the Ministry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              'Improved quality of education through practical exposure',
              'Strengthened educator capacity via global training',
              'Enhanced global reputation of Eswatini’s education system',
              'Direct support for national innovation & cultural goals',
            ].map((benefit, i) => (
              <div
                key={i}
                className="text-center p-8 bg-teal/5 dark:bg-teal/10 rounded-2xl border border-teal/20"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-teal/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-teal">{i + 1}</span>
                </div>
                <p className="text-lg font-medium text-neutralGray dark:text-gray-200">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-8">
            Let’s Build the Future of Eswatini Education Together
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Contact Managing Director Nelsiwe Nicky Ndwandwe today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+26876120713"
              className="px-12 py-6 bg-teal text-navy font-bold text-xl rounded-full hover:bg-greenYellow transition-all"
            >
              Call +268 7612 0713
            </a>
            <a
              href="https://wa.me/26876120713"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-green-500 text-white font-bold text-xl rounded-full hover:bg-green-600 transition-all"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | WorldWise Educational Tours',
  description: 'Get in touch – Mbabane, Eswatini',
};

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-navy text-white text-center">
        <div className="absolute inset-0 bg-linear-to-b from-navy/90 to-navy" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6">
            Let’s Talk
          </h1>
          <p className="text-2xl opacity-90">
            Ready to transform your students’ learning?
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-neutralGray/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left – Details */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-montserrat font-bold text-navy mb-6">
                Managing Director
              </h2>
              <p className="text-2xl font-medium">Nelsiwe Nicky Ndwandwe</p>
            </div>
            <div className="space-y-6 text-lg">
              <p className="flex items-center gap-4">
                <span className="text-teal">Phone/WhatsApp:</span>
                <a
                  href="tel:+26876120713"
                  className="font-bold hover:text-teal"
                >
                  +268 7612 0713
                </a>
              </p>
              <p className="flex items-center gap-4">
                <span className="text-teal">Alternate:</span>
                <a
                  href="https://wa.me/26876760952"
                  className="font-bold hover:text-teal"
                >
                  +268 7676 0952
                </a>
              </p>
              <p className="flex items-center gap-4">
                <span className="text-teal">Email:</span>
                <a
                  href="mailto:worldwisedutours@gmail.com"
                  className="font-bold hover:text-teal"
                >
                  worldwisedutours@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-4">
                <span className="text-teal">Location:</span>
                <span className="font-bold">Mbabane, Eswatini</span>
              </p>
            </div>
            <div className="pt-8">
              <Link
                href="/quote"
                className="inline-block px-12 py-6 bg-teal text-navy font-bold text-xl rounded-full hover:bg-greenYellow transition-all"
              >
                Request a Quote →
              </Link>
            </div>
          </div>

          {/* Right – Map */}
          <div className="h-96 rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.890!2d31.1325!3d-26.325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee7ab0000000001%3A0x123456789!2sMbabane!5e0!3m2!1sen!2ssz!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

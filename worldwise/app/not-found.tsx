import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-6">
      <div className="text-center">
        <h1 className="text-9xl font-montserrat font-bold text-teal">404</h1>
        <p className="text-3xl font-bold text-navy dark:text-white mb-8">
          Page Not Found
        </p>
        <Link
          href="/"
          className="px-10 py-5 bg-teal text-navy font-bold text-xl rounded-full hover:bg-greenYellow transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

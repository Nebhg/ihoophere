import HomePage from './components/HomePage';

export default function Home() {
  return (
    <section className="w-full h-screen">
        <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
          <HomePage />
      </div>
      <footer className="flex gap-6 flex-wrap items-center justify-center z-10 text-white p-4">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </footer>
    </section>
  );
}
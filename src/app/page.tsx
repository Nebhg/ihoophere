import HomePage from '../components/HomePage';

export default function Home() {
  return (
    <section className="bg-bg-image bg-repeat bg-cover bg-bottom w-full h-screen">
      <div className="w-full h-screen bg-blackOverlay">
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
          <HomePage />
        </div>
      </div>
    </section>
  );
}

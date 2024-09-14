import MapComponent from './MapComponent';

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center z-10 relative text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <div className="bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter your postcode</h2>
          <MapComponent />
        </div>
      </main>
    </>
  );
}
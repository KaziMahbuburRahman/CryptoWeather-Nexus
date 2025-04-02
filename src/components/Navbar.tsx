import NotificationCenter from "./NotificationCenter";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          CryptoWeather Nexus
        </h1>
        <NotificationCenter />
      </div>
    </header>
  );
}

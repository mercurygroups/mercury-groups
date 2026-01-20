import React, { useState } from 'react';
import { Plane, ArrowRight, Menu, X, CheckCircle2 } from 'lucide-react';
import { ViewState } from './types';
import AIChat from './components/AIChat';

const USE_REMOTE_IMAGES = true;
const IMAGE_FIT_URLS: Record<string, string> = {
  'private-jet.png': 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
  'toyota-land-cruiser.png': 'https://images.unsplash.com/photo-1594502184342-2b54227d870c?auto=format&fit=crop&w=1200&q=80',
};

function getImageSrc(localPath: string) {
  if (!USE_REMOTE_IMAGES) return localPath;
  const parts = localPath.split('/');
  const filename = parts[parts.length - 1];
  return IMAGE_FIT_URLS[filename] || localPath;
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderHeader = () => (
    <header className="sticky top-0 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded">M</div>
          <div>
            <div className="font-bold">MERCURY GROUPS</div>
            <div className="text-xs text-gray-500">Global Mobility</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
          <button onClick={() => setView(ViewState.HOME)}>Home</button>
          <button onClick={() => setView(ViewState.SERVICES)}>Services</button>
          <button onClick={() => setView(ViewState.FLEET)}>Fleet</button>
          <button onClick={() => setView(ViewState.CONTACT)} className="bg-black text-white px-3 py-1 rounded">Contact</button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(s => !s)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden p-4 border-t">
          <button onClick={() => setView(ViewState.HOME)} className="block w-full text-left py-2">Home</button>
          <button onClick={() => setView(ViewState.SERVICES)} className="block w-full text-left py-2">Services</button>
          <button onClick={() => setView(ViewState.FLEET)} className="block w-full text-left py-2">Fleet</button>
          <button onClick={() => setView(ViewState.CONTACT)} className="block w-full text-left py-2 font-semibold">Contact</button>
        </div>
      )}
    </header>
  );

  const renderHero = () => (
    <section className="bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">Processing of Domestic & International Flights</h1>
        <p className="mt-4 text-gray-300">Professional processing of flight bookings, passports and logistics.</p>
        <div className="mt-6 flex gap-4">
          <button onClick={() => setView(ViewState.CONTACT)} className="bg-blue-600 px-6 py-3 rounded flex items-center gap-2">Book a Service <ArrowRight /></button>
          <button onClick={() => setView(ViewState.SERVICES)} className="border px-6 py-3 rounded">View Services</button>
        </div>
      </div>
    </section>
  );

  const renderServices = () => (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded">
            <div className="flex items-center gap-3"><Plane /> <h3 className="font-semibold">Flight Processing</h3></div>
            <p className="text-sm mt-2 text-gray-600">Domestic and international flight bookings.</p>
          </div>
          <div className="p-6 border rounded">
            <div className="flex items-center gap-3"><CheckCircle2 /> <h3 className="font-semibold">Passport & Visa</h3></div>
            <p className="text-sm mt-2 text-gray-600">Passport renewal and visa assistance.</p>
          </div>
          <div className="p-6 border rounded">
            <div className="flex items-center gap-3"><Plane /> <h3 className="font-semibold">Private Charters</h3></div>
            <p className="text-sm mt-2 text-gray-600">Private jet and luxury transfers.</p>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFleet = () => (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded overflow-hidden border">
            <img src={getImageSrc('/images/toyota-land-cruiser.png')} alt="Land Cruiser" onError={(e)=> (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'} className="w-full h-48 object-cover" />
            <div className="p-4">Toyota Land Cruiser</div>
          </div>
          <div className="rounded overflow-hidden border">
            <img src={getImageSrc('/images/private-jet.png')} alt="Jet" onError={(e)=> (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'} className="w-full h-48 object-cover" />
            <div className="p-4">Private Jet</div>
          </div>
          <div className="rounded overflow-hidden border">
            <img src="/images/toyota-hiace-luxury.png" alt="Hiace" onError={(e)=> (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'} className="w-full h-48 object-cover" />
            <div className="p-4">Toyota HiAce Luxury</div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-sm text-gray-600">Email: mercurygroups247@gmail.com</p>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="py-8 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Mercury Groups</div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {renderHeader()}
      <main>
        {renderHero()}
        {view === ViewState.SERVICES && renderServices()}
        {view === ViewState.FLEET && renderFleet()}
        {view === ViewState.CONTACT && renderContact()}
      </main>
      {renderFooter()}
      <AIChat />
    </div>
  );
};

export default App;

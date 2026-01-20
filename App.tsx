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
import React, { useState } from 'react';
import { 
  Plane, 
  ArrowRight,
  FileCheck, 
  ShieldCheck, 
  Briefcase, 
  Car as CarIcon, 
  Bike, 
  Globe, 
  MapPin, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  CheckCircle2,
  Building2,
  Users,
  Star,
  Gauge
} from 'lucide-react';
import { ViewState, ServiceItem, Car } from './types';
import AIChat from './components/AIChat';

// Toggle to use remote Unsplash fit URLs instead of local images.
// Set to `true` to load remote Unsplash images (may increase network requests).
const USE_REMOTE_IMAGES = true;
// Update values here to point to the Unsplash image you prefer for each local asset.
const IMAGE_FIT_URLS: Record<string, string> = {
  'photo-1506012787146-f92b2d7d6d96.svg': 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1920&q=80',
  'photo-1436491865332-7a61a109cc05.svg': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  'photo-1549673934-297e2501a402.svg': 'https://images.unsplash.com/photo-1549673934-297e2501a402?auto=format&fit=crop&w=800&q=80',
    'photo-1587825140708-dfaf72ae4b04.svg': 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    'photo-1550355291-bbee04a92027.svg': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
  'photo-1540962351574-729f633c78f0.svg': 'https://images.unsplash.com/photo-1540962351574-729f633c78f0?auto=format&fit=crop&w=800&q=80',
  'photo-1616432043562-3671ea0e5e85.svg': 'https://images.unsplash.com/photo-1616432043562-3671ea0e5e85?auto=format&fit=crop&w=800&q=80',
  'photo-1454165804606-c3d57bc86b40.svg': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'photo-1469854523086-cc02fe5d8800.svg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  // fleet images
  'photo-1621135802920-133df287f89c.svg': 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80',
  'photo-1618843479313-40f8afb4b4d8.svg': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
  'toyota-land-cruiser.png': 'https://images.unsplash.com/photo-1594502184342-2b54227d870c?auto=format&fit=crop&w=800&q=80',
  'toyota-hiace-luxury.png': 'https://images.unsplash.com/photo-1625916053360-1e5b8e957386?auto=format&fit=crop&w=800&q=80',
  'private-jet.png': 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80',
  'logistics-delivery.png': 'https://images.unsplash.com/photo-1616432043562-3671ea0e5e85?auto=format&fit=crop&w=800&q=80',
  'photo-1533473359331-0135ef1b58bf.svg': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
};

function getImageSrc(localPath: string) {
  if (!USE_REMOTE_IMAGES) return localPath;
  const parts = localPath.split('/');
  const filename = parts[parts.length - 1];
  return IMAGE_FIT_URLS[filename] || localPath;
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [contactForm, setContactForm] = useState({
    name: '',
    service: 'Flight Booking',
    message: ''
  });

  // Mobile menu state for small screens
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen((s) => !s);


  const handleCarSelect = (carName: string) => {
    setContactForm(prev => ({
      ...prev,
      service: `Rental: ${carName}`,
      message: `I am interested in renting the ${carName}. Please provide availability and rates.`
    }));
    setView(ViewState.CONTACT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (service: ServiceItem) => {
    if (service.id === 'cars') {
      setView(ViewState.FLEET);
    } else if (service.id === 'logistics') {
      setView(ViewState.LOGISTICS);
    } else {
      setContactForm(prev => ({
        ...prev,
        service: service.title,
        message: `I am interested in ${service.title}. Please provide more details regarding requirements and pricing.`
      }));
      setView(ViewState.CONTACT);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, service, message } = contactForm;
    const subject = `Inquiry: ${service} - ${name}`;
    const body = `Name: ${name}\nService Interest: ${service}\n\nMessage:\n${message}`;
    
    // Primary email for contact
    const emailTo = "mercurygroups247@gmail.com";
    
    // Construct the mailto link
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const services: ServiceItem[] = [
    {
      id: 'flights',
      title: 'Flight Processing',
      description: 'Domestic and International flight tickets with best rate guarantees.',
      icon: <Plane className="w-8 h-8" />,
      category: 'travel',
      image: '/images/photo-1436491865332-7a61a109cc05.svg'
    },
    {
      id: 'passport',
      title: 'Passport Processing',
      description: 'Fast-track processing and renewal assistance for international passports.',
      icon: <Globe className="w-8 h-8" />,
      category: 'travel',
      image: '/images/photo-1549673934-297e2501a402.svg'
    },
    {
      id: 'visa',
      title: 'Visa Assistance',
      description: 'Expert guidance for tourist, conference, and business visas.',
      icon: <FileCheck className="w-8 h-8" />,
      category: 'travel',
      image: '/images/photo-1587825140708-dfaf72ae4b04.svg'
    },
    {
      id: 'cars',
      title: 'Luxury Rentals',
      description: 'Explore our premium fleet of SUVs, Sedans, and Supercars.',
      icon: <CarIcon className="w-8 h-8" />,
      category: 'luxury',
      image: '/images/photo-1550355291-bbee04a92027.svg'
    },
    {
      id: 'jets',
      title: 'Private Jet Charter',
      description: 'Exclusive private jet rentals for executive travel.',
      icon: <Plane className="w-8 h-8 rotate-45" />,
      category: 'luxury',
      image: '/images/private-jet.png'
    },
    {
      id: 'logistics',
      title: 'Logistics & Delivery',
      description: 'Fast delivery bikes for goods in Lagos, Port Harcourt, and Abuja.',
      icon: <Bike className="w-8 h-8" />,
      category: 'logistics',
      image: '/images/logistics-delivery.png'
    },
    {
      id: 'insurance',
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance policies to keep you protected.',
      icon: <ShieldCheck className="w-8 h-8" />,
      category: 'travel',
      image: '/images/photo-1454165804606-c3d57bc86b40.svg'
    },
    {
      id: 'tours',
      title: 'Tour Packages',
      description: 'Curated holiday and conference packages tailored to your needs.',
      icon: <MapPin className="w-8 h-8" />,
      category: 'travel',
      image: '/images/photo-1469854523086-cc02fe5d8800.svg'
    }
  ];

  const fleet: Car[] = [
    {
      id: 'lambo-urus',
      name: 'Lamborghini Urus',
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80',
      features: ['650 HP', '0-60 in 3.6s', 'Leather Interior', 'Premium Sound'],
      priceRange: 'High'
    },
    {
      id: 'g-wagon',
      name: 'Mercedes-Benz G-Wagon',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80',
      features: ['Off-road capability', 'Luxury interior', 'Spacious', 'Iconic design'],
      priceRange: 'High'
    },
    {
      id: 's-class',
      name: 'Mercedes-Benz S-Class',
      category: 'Sedan',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      features: ['Executive comfort', 'Massage seats', 'Advanced safety', 'Smooth ride'],
      priceRange: 'Medium'
    },
    {
      id: 'land-cruiser',
      name: 'Toyota Land Cruiser',
      category: 'SUV',
      image: '/images/toyota-land-cruiser.png',
      features: ['Reliable', 'All-terrain', '7 Seater', 'Bulletproof options available'],
      priceRange: 'Medium'
    },
    {
      id: 'hiace-bus',
      name: 'Toyota HiAce Luxury',
      category: 'Bus',
      image: '/images/toyota-hiace-luxury.png',
      features: ['14 Seater', 'High roof', 'AC', 'Interstate travel'],
      priceRange: 'Low'
    },
    {
      id: 'lexus-lx',
      name: 'Lexus LX 600',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      features: ['Luxury finish', 'Off-road ready', 'Spacious', 'Quiet cabin'],
      priceRange: 'High'
    }
  ];

  const renderHeader = () => (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center mr-3 shadow-md">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-black tracking-tight">MERCURY GROUPS</h1>
              <p className="text-[10px] text-brand-blue font-semibold tracking-widest uppercase">Global Mobility</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => setView(ViewState.HOME)} className={`${view === ViewState.HOME ? 'text-brand-blue font-semibold' : 'text-gray-600 hover:text-brand-black'} transition`}>Home</button>
            <button onClick={() => setView(ViewState.SERVICES)} className={`${view === ViewState.SERVICES ? 'text-brand-blue font-semibold' : 'text-gray-600 hover:text-brand-black'} transition`}>Services</button>
            <button onClick={() => setView(ViewState.FLEET)} className={`${view === ViewState.FLEET ? 'text-brand-blue font-semibold' : 'text-gray-600 hover:text-brand-black'} transition`}>Fleet</button>
            <button onClick={() => setView(ViewState.LOGISTICS)} className={`${view === ViewState.LOGISTICS ? 'text-brand-blue font-semibold' : 'text-gray-600 hover:text-brand-black'} transition`}>Logistics</button>
            <button onClick={() => setView(ViewState.ABOUT)} className={`${view === ViewState.ABOUT ? 'text-brand-blue font-semibold' : 'text-gray-600 hover:text-brand-black'} transition`}>About</button>
            <button 
              onClick={() => setView(ViewState.CONTACT)}
              className="bg-brand-black text-white px-6 py-2.5 rounded-full hover:bg-brand-blue transition-colors duration-300 font-medium text-sm shadow-md"
            >
              Contact Us
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 shadow-lg">
          <button onClick={() => { setView(ViewState.HOME); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium">Home</button>
          <button onClick={() => { setView(ViewState.SERVICES); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium">Services</button>
          <button onClick={() => { setView(ViewState.FLEET); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium">Fleet</button>
          <button onClick={() => { setView(ViewState.LOGISTICS); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium">Logistics</button>
          <button onClick={() => { setView(ViewState.ABOUT); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 font-medium">About</button>
          <button onClick={() => { setView(ViewState.CONTACT); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-brand-blue font-bold">Contact Us</button>
        </div>
      )}
    </nav>
  );

  const renderHero = () => (
    <div className="relative bg-brand-black text-white py-24 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
            <img 
              src="/images/private-jet.png" 
              alt="Travel Hero" 
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              className="w-full h-full object-cover opacity-40 grayscale"
            />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-white">Processing of</span> <span className="text-brand-lightBlue">Domestic & International Flights</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
            Professional processing of flight bookings and passport applications. 
            Reliable logistics and luxury rentals in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setView(ViewState.CONTACT)} className="bg-brand-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition flex items-center justify-center shadow-lg hover:shadow-brand-blue/50 border border-brand-blue">
              Book a Service <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={() => setView(ViewState.SERVICES)} className="border border-white hover:bg-white hover:text-brand-black text-white px-8 py-4 rounded-full font-bold transition">
              View Services
            </button>
          </div>
        </div>
      </div>
    );

  const renderServicesGrid = () => (
    <div className="text-center">
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Flight Processing • Passport Processing • Visa Assistance
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handleServiceClick(service)}
          >
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFleet = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-black">Premium Fleet</h2>
          <p className="text-gray-600 mt-2">Luxury vehicles for interstate travel and comfort.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative h-64 overflow-hidden bg-brand-black">
                <img
                  src={getImageSrc(car.image)}
                  alt={car.name}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90"
                />
                <div className="absolute top-4 right-4 bg-brand-black/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  {car.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-brand-black mb-2">{car.name}</h3>
                <div className="space-y-2 mb-6 flex-grow">
                   {car.features.map((feature, idx) => (
                     <div key={idx} className="flex items-center text-gray-500 text-sm">
                       <CheckCircle2 className="w-4 h-4 text-brand-lightBlue mr-2 flex-shrink-0" />
                       {feature}
                     </div>
                   ))}
                </div>
                <button 
                  onClick={() => handleCarSelect(car.name)}
                  className="bg-brand-black hover:bg-brand-blue text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm w-full"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  const renderLogistics = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">Swift Delivery Services</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">Efficient bike delivery services for goods and documents in Lagos, Abuja, and Port Harcourt.</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-blue/30 transition">
                <MapPin className="text-brand-blue w-6 h-6 mr-4" />
                <div>
                  <h4 className="font-bold text-brand-black">Lagos Operations</h4>
                  <p className="text-sm text-gray-500">Island & Mainland</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-blue/30 transition">
                <MapPin className="text-brand-blue w-6 h-6 mr-4" />
                <div>
                  <h4 className="font-bold text-brand-black">Abuja Operations</h4>
                  <p className="text-sm text-gray-500">Central Area & Satellites</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-blue/30 transition">
                <MapPin className="text-brand-blue w-6 h-6 mr-4" />
                <div>
                  <h4 className="font-bold text-brand-black">Port Harcourt Operations</h4>
                  <p className="text-sm text-gray-500">Garden City</p>
                </div>
              </div>
            </div>

            <button onClick={() => setView(ViewState.CONTACT)} className="bg-brand-black text-white px-8 py-3 rounded-lg hover:bg-brand-blue transition font-medium shadow-lg">Request Delivery</button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-blue/20 rounded-2xl transform rotate-3 group-hover:rotate-0 transition duration-500"></div>
            <img
              src={'/images/logistics-delivery.png'}
              alt="Delivery Rider"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition duration-500 grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
  const renderContact = () => (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-10 bg-brand-black text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Plane className="w-40 h-40" />
               </div>
              <h2 className="text-3xl font-bold mb-6 relative z-10">Get in Touch</h2>
              <p className="text-gray-300 mb-8 relative z-10">
                Contact Mercury Groups for bookings and inquiries.
              </p>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-brand-lightBlue mt-1" />
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:mercurygroups247@gmail.com" className="font-medium hover:text-brand-lightBlue transition">mercurygroups247@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-lightBlue mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+234 901 190 2882</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Building2 className="w-6 h-6 text-brand-lightBlue mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Office</p>
                    <p className="font-medium">Lagos | Abuja | Port Harcourt</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10">
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                  <select 
                    value={contactForm.service}
                    onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition"
                  >
                    <option>Flight Booking</option>
                    <option>Visa Assistance</option>
                    <option>Logistics/Delivery</option>
                    <option>Luxury Car Rental</option>
                    {contactForm.service.startsWith('Rental:') && <option value={contactForm.service}>{contactForm.service}</option>}
                    <option>Private Jet Charter</option>
                    <option>Travel Insurance</option>
                    <option>Passport Services</option>
                    <option>Tour Packages</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition" 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-black hover:bg-brand-blue text-white font-bold py-3 rounded-lg transition shadow-lg transform active:scale-95">
                  Send Inquiry via Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-brand-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center mr-3">
                <span className="text-brand-black font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MERCURY GROUPS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Flight Booking • Visa Assistance • Luxury Rentals • Logistics
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-lightBlue">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">About Us</li>
              <li className="hover:text-white cursor-pointer transition">Services</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-lightBlue">Business Compliance</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-lightBlue" /> Registered Business Name</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-lightBlue" /> Tax ID (TIN) Verified</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mercury Groups. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const renderAbout = () => (
     <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-black mb-4">About Mercury Groups</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            We are a full-service travel and logistics agency dedicated to simplifying movement for people and goods. 
            From securing the most complex visas to ensuring your parcel arrives on time, we operate with transparency and speed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
                <Users className="w-12 h-12 mx-auto text-brand-blue mb-4"/>
                <h3 className="font-bold text-lg mb-2">Customer First</h3>
                <p className="text-gray-500 text-sm">Dedicated support team.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
                <ShieldCheck className="w-12 h-12 mx-auto text-brand-blue mb-4"/>
                <h3 className="font-bold text-lg mb-2">Secure & Legal</h3>
                <p className="text-gray-500 text-sm">Fully registered.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
                <Briefcase className="w-12 h-12 mx-auto text-brand-blue mb-4"/>
                <h3 className="font-bold text-lg mb-2">Corporate Ready</h3>
                <p className="text-gray-500 text-sm">Professional partnerships.</p>
            </div>
        </div>
      </div>
     </section>
  )

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-black">
      {renderHeader()}
      
      <main className="flex-grow">
        {view === ViewState.HOME && (
          <>
            {renderHero()}
            {renderServicesGrid()}
            {renderLogistics()}
            {renderContact()}
          </>
        )}
        
        {view === ViewState.SERVICES && (
           <div className="pt-10">
             <div className="bg-brand-black text-white py-16 text-center">
               <h1 className="text-4xl font-bold">Our Services</h1>
             </div>
             {renderServicesGrid()}
             <div className="bg-gray-50 py-16 text-center">
                <p className="text-xl text-gray-700 mb-6">Need a custom package?</p>
                <button onClick={() => setView(ViewState.CONTACT)} className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-brand-blue/50 transition">Contact Support</button>
             </div>
           </div>
        )}

        {view === ViewState.FLEET && (
           <div className="pt-10">
             <div className="bg-brand-black text-white py-16 text-center">
               <h1 className="text-4xl font-bold">Luxury Fleet</h1>
               <p className="text-gray-400 mt-2">Drive in style and comfort</p>
             </div>
             {renderFleet()}
             <div className="bg-brand-blue py-16 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Don't see what you're looking for?</h2>
                <p className="mb-8">We can source specific vehicles upon request.</p>
                <button onClick={() => setView(ViewState.CONTACT)} className="bg-white text-brand-blue px-8 py-3 rounded-full font-bold shadow-lg text-brand-black">Contact Reservations</button>
             </div>
           </div>
        )}

        {view === ViewState.LOGISTICS && (
            <div className="pt-10">
              <div className="bg-brand-black text-white py-16 text-center">
                 <h1 className="text-4xl font-bold">Logistics & Delivery</h1>
              </div>
              {renderLogistics()}
            </div>
        )}

        {view === ViewState.ABOUT && (
            <div className="pt-10">
               <div className="bg-brand-black text-white py-16 text-center">
                 <h1 className="text-4xl font-bold">Who We Are</h1>
              </div>
              {renderAbout()}
              {renderContact()}
            </div>
        )}

        {view === ViewState.CONTACT && (
            <div className="pt-10">
               <div className="bg-brand-black text-white py-16 text-center">
                 <h1 className="text-4xl font-bold">Contact Us</h1>
              </div>
              {renderContact()}
            </div>
        )}
      </main>

      {renderFooter()}
      <AIChat />
    </div>
  );
};

export default App;
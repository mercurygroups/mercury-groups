import React, { useState } from 'react';
import { 
  Plane, 
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
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  Star,
  Gauge
} from 'lucide-react';
import AIChat from './components/AIChat';
import { ViewState, ServiceItem, Car } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    service: 'Flight Booking',
    message: ''
  });

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
    
    // Use CC for the second email to ensure better compatibility with email clients
    const emailTo = "mercurygroups247@gmail.com";
    const emailCc = "chisomlifeeke@gmail.com";
    
    // Construct the mailto link
    window.location.href = `mailto:${emailTo}?cc=${emailCc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const services: ServiceItem[] = [
    {
      id: 'flights',
      title: 'Flight Processing',
      description: 'Expert processing of Domestic and International flight tickets with best rate guarantees.',
      icon: <Plane className="w-8 h-8" />,
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80' // Airplane wing view
    },
    {
      id: 'passport',
      title: 'Passport Services',
      description: 'Fast-track processing and renewal assistance for international passports.',
      icon: <Globe className="w-8 h-8" />,
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1555214068-4b9dc8c6dfd4?auto=format&fit=crop&w=800&q=80' // Single Passport Cover
    },
    {
      id: 'visa',
      title: 'Visa Assistance',
      description: 'Expert guidance for tourist, conference, and business visas to global destinations.',
      icon: <FileCheck className="w-8 h-8" />,
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1569949381149-d9d3c132a27a?auto=format&fit=crop&w=800&q=80' // Visa/Passport close up
    },
    {
      id: 'cars',
      title: 'Luxury Rentals',
      description: 'Explore our premium fleet of SUVs, Sedans, and Supercars for your comfort.',
      icon: <CarIcon className="w-8 h-8" />,
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' // Luxury car interior dark
    },
    {
      id: 'jets',
      title: 'Private Jet Charter',
      description: 'Exclusive private jet rentals for executive travel comfort and privacy.',
      icon: <Plane className="w-8 h-8 rotate-45" />,
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80' // Private Jet Interior
    },
    {
      id: 'logistics',
      title: 'Logistics & Delivery',
      description: 'Fast delivery bikes for goods in Lagos, Port Harcourt, and Abuja.',
      icon: <Bike className="w-8 h-8" />,
      category: 'logistics',
      image: 'https://images.unsplash.com/photo-1561582209-6638423232f9?auto=format&fit=crop&w=800&q=80' // Lagos Traffic (Bus/Street context)
    },
    {
      id: 'insurance',
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance policies to keep you protected abroad.',
      icon: <ShieldCheck className="w-8 h-8" />,
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' // Planning/Laptop
    },
    {
      id: 'tours',
      title: 'Tour Packages',
      description: 'Curated holiday and conference packages tailored to your needs.',
      icon: <MapPin className="w-8 h-8" />,
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80' // Tropical rain
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
      image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa71?auto=format&fit=crop&w=800&q=80',
      features: ['Reliable', 'All-terrain', '7 Seater', 'Bulletproof options available'],
      priceRange: 'Medium'
    },
    {
      id: 'hiace-bus',
      name: 'Toyota HiAce Luxury',
      category: 'Bus',
      image: 'https://images.unsplash.com/photo-1625055694784-60c774b73520?auto=format&fit=crop&w=800&q=80',
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
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" 
          alt="Travel Hero" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Processing of <span className="text-brand-lightBlue">Domestic & International Flights</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
            We handle everything from Flight Processing and Visa Assistance to Passport Renewals. 
            Experience premium logistics and luxury rentals in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setView(ViewState.CONTACT)} className="bg-brand-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition flex items-center justify-center shadow-lg hover:shadow-brand-blue/50">
              Book a Service <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={() => setView(ViewState.SERVICES)} className="border border-white hover:bg-white hover:text-brand-black text-white px-8 py-4 rounded-full font-bold transition">
              View Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesGrid = () => (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-black mb-4">Our Core Services</h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Specialized processing for flights, passports, and visas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => handleServiceClick(service)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 group overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative bg-gray-200">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col">
                  <span className="font-bold flex items-center text-sm md:text-base">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-200 mt-1 font-medium">Click to inquire</span>
                </div>
              </div>
              <div className="p-6 relative flex-grow">
                 <div className="absolute -top-10 right-6 bg-white p-4 rounded-xl shadow-lg text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition duration-300">
                    {service.icon}
                 </div>
                <h3 className="text-xl font-bold text-brand-black mb-3 mt-2">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-4">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFleet = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-black">Premium Fleet Selection</h2>
          <p className="text-gray-600 mt-2">Choose from our exclusive collection of luxury vehicles for interstate travel, airport pickups, and special occasions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {car.category}
                </div>
                {car.id === 'lambo-urus' && (
                   <div className="absolute bottom-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg">
                     <Star className="w-3 h-3 mr-1" /> Premium Choice
                   </div>
                )}
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
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center text-gray-400 text-xs">
                    <Gauge className="w-4 h-4 mr-1" />
                    Chauffeur included
                  </div>
                  <button 
                    onClick={() => handleCarSelect(car.name)}
                    className="bg-brand-black hover:bg-brand-blue text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderLogistics = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-1 rounded-full text-sm font-semibold mb-6">
              Mercury Logistics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
              Swift Delivery Across Major Nigerian Cities
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We provide efficient bike delivery services for goods and documents. 
              Whether it's the busy streets of Lagos, the administrative hub of Abuja, 
              or the oil city of Port Harcourt, our riders ensure timely delivery.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-blue/30 transition">
                <MapPin className="text-brand-blue w-6 h-6 mr-4" />
                <div>
                  <h4 className="font-bold text-brand-black">Lagos Operations</h4>
                  <p className="text-sm text-gray-500">Island & Mainland coverage</p>
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
                  <p className="text-sm text-gray-500">Garden City coverage</p>
                </div>
              </div>
            </div>

            <button onClick={() => setView(ViewState.CONTACT)} className="bg-brand-black text-white px-8 py-3 rounded-lg hover:bg-brand-blue transition font-medium shadow-lg">
              Request Delivery
            </button>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-blue/20 rounded-2xl transform rotate-3 group-hover:rotate-0 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1561582209-6638423232f9?auto=format&fit=crop&w=1000&q=80" 
              alt="Delivery Rider" 
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition duration-500"
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
                Ready to plan your trip or schedule a delivery? Contact Mercury Groups today.
              </p>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-brand-lightBlue mt-1" />
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:mercurygroups247@gmail.com" className="font-medium hover:text-brand-lightBlue transition">mercurygroups247@gmail.com</a>
                    <a href="mailto:chisomlifeeke@gmail.com" className="font-medium hover:text-brand-lightBlue transition">chisomlifeeke@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-lightBlue mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+234 800 MERCURY</p>
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
                <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg transform active:scale-95">
                  Open Email App to Send
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  This will open your default email app. Please click <strong>Send</strong> in the email window that appears.
                </p>
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
              Your trusted partner for international travel, visa assistance, luxury transport, and logistics solutions across Nigeria.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-lightBlue">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">About Us</li>
              <li className="hover:text-white cursor-pointer transition">Services</li>
              <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Refund Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-lightBlue">Business Compliance</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Registered Business Name</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Tax ID (TIN) Verified</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Licensed Travel Permit</li>
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
            From securing the most complex visas to ensuring your parcel arrives on time in Lagos, PH, or Abuja, 
            we operate with transparency, speed, and integrity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
                <Users className="w-12 h-12 mx-auto text-brand-blue mb-4"/>
                <h3 className="font-bold text-lg mb-2">Customer First</h3>
                <p className="text-gray-500 text-sm">Dedicated support team for all bookings and inquiries.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
                <ShieldCheck className="w-12 h-12 mx-auto text-brand-blue mb-4"/>
                <h3 className="font-bold text-lg mb-2">Secure & Legal</h3>
                <p className="text-gray-500 text-sm">Fully registered with verified pricing structures and policies.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition">
                <Briefcase className="w-12 h-12 mx-auto text-brand-blue mb-4"/>
                <h3 className="font-bold text-lg mb-2">Corporate Ready</h3>
                <p className="text-gray-500 text-sm">Partnered with top hotels, airlines, and insurance providers.</p>
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
                <button onClick={() => setView(ViewState.CONTACT)} className="bg-white text-brand-blue px-8 py-3 rounded-full font-bold shadow-lg">Contact Reservations</button>
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
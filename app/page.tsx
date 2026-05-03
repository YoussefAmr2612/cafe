'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Mail, Compass, Navigation } from 'lucide-react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const COFFEES = [
  {
    id: 1,
    name: 'Aura Latte',
    category: 'Espresso',
    description: 'Double shot of our signature house blend with micro-foam and a hint of vanilla.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 15,
    name: 'White Flat White',
    category: 'Espresso',
    description: 'Micro-foamed milk over a short double ristretto for intense smoothness.',
    price: '$4.75',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    name: 'Midnight Cold Brew',
    category: 'Cold Brew',
    description: '18-hour steep, delivering a bold, chocolatey profile with low acidity.',
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1495474472205-51f7d4c0c169?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 16,
    name: 'Kyoto Drip',
    category: 'Cold Brew',
    description: 'Slow-drip cold coffee, drop-by-drop for 12 hours. Pure clarity.',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 5,
    name: 'Lavender Fields',
    category: 'Specialty',
    description: 'Honey-sweetened latte infused with culinary lavender and oat milk.',
    price: '$6.25',
    image: 'https://images.unsplash.com/photo-1593967858208-67ddb5b4c406?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 14,
    name: 'Oatmeal Cookie Latte',
    category: 'Specialty',
    description: 'Cinnamon and brown sugar espresso blend with a cookie crumble topping.',
    price: '$6.75',
    image: 'https://images.unsplash.com/photo-1507133750070-4edadd9222a0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 7,
    name: 'Ceremonial Matcha',
    category: 'Tea',
    description: 'Premium grade Japanese matcha whisked with precise water temperature.',
    price: '$6.50',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 8,
    name: 'London Fog',
    category: 'Tea',
    description: 'Earl Grey tea latte with hints of lavender and a touch of vanilla syrup.',
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1544787210-2211d7c86bcc?auto=format&fit=crop&q=80&w=600'
  }
];
const CATEGORIES = ['All', 'Espresso', 'Cold Brew', 'Specialty', 'Tea'];

export default function CafePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const filteredCoffees = COFFEES.filter(
    c => activeCategory === 'All' || c.category === activeCategory
  );

  return (
    <div className="relative min-h-screen selection:bg-[#4d8b31] selection:text-[#fcfaf9] transition-colors duration-300">

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen w-full animated-gradient flex items-center justify-center overflow-hidden transition-colors duration-300">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-30 mix-blend-multiply dark:mix-blend-lighten pointer-events-none"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-2878-large.mp4" type="video/mp4" />
        </video>

        {/* Map / Compass Visual Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 dark:opacity-10 text-[#000000] dark:text-[#f3d3bd]">
          {/* Abstract Topographical / Radar SVG */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1, rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw]"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="400" cy="400" r="350" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" />
            <circle cx="400" cy="400" r="280" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="400" cy="400" r="210" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="400" cy="400" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M400 0 L400 800 M0 400 L800 400" stroke="currentColor" strokeWidth="0.5" />
            {/* Some contour like paths */}
            <path d="M 100 400 Q 200 300 400 400 T 700 400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" opacity="0.5"/>
          </motion.svg>
        </div>

        {/* Floating coordinates */}
        <div className="absolute inset-0 pointer-events-none p-6 pt-28 pb-12 md:p-12 md:pt-32 md:pb-24 flex flex-col justify-between z-10 text-[#000000]/60 dark:text-[#fcfaf9]/40 font-mono text-xs tracking-[0.2em]">
          <motion.div initial={{opacity:0, x: -20}} animate={{opacity:1, x: 0}} transition={{delay:0.2, duration: 1}} className="hidden md:block">
            ACTUAL POSITION <br/>
            {`LAT: 04°35'23.1"N`} <br/>
            {`LONG: 74°04'51.2"W`}
          </motion.div>
          <motion.div initial={{opacity:0, x: 20}} animate={{opacity:1, x: 0}} transition={{delay:0.3, duration: 1}} className="self-end text-right hidden md:block mt-auto">
            ELEVATION: 1,800M <br/>
            REGION: COLOMBIA <br/>
            NOTES: CITRUS & JASMINE
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-24 md:mt-32 text-[#000000] dark:text-[#fcfaf9]">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center mb-8"
          >
            <Compass size={40} className="text-[#4d8b31]" strokeWidth={1} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm md:text-base font-sans tracking-[0.3em] uppercase text-[#4d8b31] dark:text-[#f3d3bd] mb-6 font-semibold"
          >
            Trace your origin
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tighter font-extrabold mb-8 leading-none drop-shadow-sm"
          >
            Map<br />
            Y<motion.span 
              animate={{ color: ["#4d8b31", "#f3d3bd", "#4d8b31"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >o</motion.span>ur Br<span className="font-sans font-light italic text-[#000000]/60 dark:text-[#fcfaf9]/80">e</span>w.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-12 md:mb-24"
          >
            <a href="#about" className="inline-flex items-center gap-3 border border-[#000000]/30 dark:border-[#fcfaf9]/30 px-8 py-4 rounded-full text-sm font-medium bg-[#fcfaf9]/50 dark:bg-[#000000]/50 backdrop-blur-md hover:bg-[#f3d3bd] hover:text-[#000000] hover:border-[#f3d3bd] transition-all duration-300 shadow-lg">
              Start the journey <Navigation size={16} className="-rotate-45" />
            </a>
          </motion.div>
        </div>
      </section>
      {/* ABOUT SECTION (Golden Brown / Dark Context) */}
      <section id="about" className="relative py-32 px-6 bg-[#f3d3bd] dark:bg-[#1f1611] text-[#000000] dark:text-[#fcfaf9] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative aspect-[4/5] w-full max-w-md mx-auto">
             <Image 
               src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000"
               alt="Cafe Interior"
               fill
               className="object-cover rounded-xl"
               referrerPolicy="no-referrer"
             />
             <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#4d8b31] rounded-full blur-3xl opacity-30 mix-blend-multiply pointer-events-none" />
          </div>
          <div className="order-1 md:order-2 space-y-8 flex flex-col justify-center">
            <h2 className="text-[#4d8b31] text-xs tracking-widest uppercase font-bold">The Vision</h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              A minimalist sanctuary for coffee purists.
            </h3>
            <div className="space-y-6 text-[#000000]/70 dark:text-[#fcfaf9]/70 font-sans text-lg md:text-xl leading-relaxed">
              <p>
                We stripped away the clutter. What remains is an atmosphere designed for 
                contemplation, conversation, and the flawless extraction of premium beans.
              </p>
              <p>
                Coffee Map is built on intentionality. From the golden warmth of our 
                aesthetics to the meticulous sourcing of our beans, every detail 
                serves a singular purpose: to elevate your daily ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU GRID SECTION (High Density) */}
      <section id="menu" className="py-32 px-6 bg-[#fcfaf9] dark:bg-[#000000] text-[#000000] dark:text-[#fcfaf9] min-h-screen relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f3d3bd]/30 dark:bg-[#4d8b31]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-[#4d8b31] text-xs tracking-widest uppercase font-bold mb-4">The Selection</h2>
            <h3 className="font-display text-5xl md:text-7xl tracking-tighter font-bold">Our Canvas.</h3>
          </div>

          <div className="flex md:flex-wrap flex-nowrap gap-2 overflow-x-auto pb-4 md:pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] tracking-widest uppercase font-bold transition-all border whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-[#000000] dark:bg-[#fcfaf9] border-[#000000] dark:border-[#fcfaf9] text-[#fcfaf9] dark:text-[#000000]' 
                    : 'bg-transparent border-[#000000]/10 dark:border-[#fcfaf9]/10 text-[#000000]/40 dark:text-[#fcfaf9]/40 hover:border-[#4d8b31] hover:text-[#4d8b31]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            layout
            className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-x-6 md:gap-y-12 overflow-x-auto md:overflow-visible pb-8 md:pb-0 scrollbar-hide"
          >
            {filteredCoffees.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col min-w-[280px] md:min-w-0"
              >
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#f3d3bd]/20 dark:bg-[#1a120e] mb-4">
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Link 
                    href="/order" 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-[#fcfaf9] text-[#000000] px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all hover:bg-[#4d8b31] hover:text-[#fcfaf9] whitespace-nowrap"
                  >
                    Quick Order
                  </Link>
                </div>

                <div className="flex justify-between items-start mb-2 group-hover:translate-x-1 transition-transform">
                  <h4 className="font-display text-xl font-bold leading-tight decoration-[#4d8b31] group-hover:underline underline-offset-4 decoration-2 transition-all">
                    {item.name}
                  </h4>
                  <span className="font-mono text-sm font-bold text-[#4d8b31]">
                    {item.price}
                  </span>
                </div>
                
                <p className="text-xs text-[#000000]/50 dark:text-[#fcfaf9]/40 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-[#000000]/5 dark:border-[#fcfaf9]/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4d8b31]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#000000]/30 dark:text-[#fcfaf9]/30">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-[#000000]/10 dark:border-[#fcfaf9]/10"
          >
            <p className="text-[#000000]/40 dark:text-[#fcfaf9]/40 font-mono text-xs tracking-widest uppercase mb-8">
              Discover the full catalog at our main station
            </p>
            <Link 
              href="/order" 
              className="group flex items-center gap-4 text-3xl md:text-5xl font-display font-bold hover:text-[#4d8b31] transition-colors"
            >
              See all 30+ items <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform text-[#4d8b31]" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER / CONTACT SECTION (Dark Mood with Green accents) */}
      <section id="contact" className="py-24 px-6 bg-[#000000] dark:bg-[#080808] text-[#fcfaf9] transition-colors duration-300 border-t border-[#fcfaf9]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-5 space-y-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold">COFFEE MAP.</h2>
            <p className="text-[#fcfaf9]/60 font-serif max-w-sm italic">
              Where time slows down. Visit our minimalist space and 
              experience coffee crafted with absolute patience.
            </p>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-[#4d8b31] font-bold">Visit Us</h3>
            <ul className="space-y-4 text-[#fcfaf9]/80">
               <li className="flex items-start gap-4">
                 <MapPin size={20} className="text-[#f3d3bd] shrink-0 mt-1" />
                 <span>128 Minimalist Ave.<br />Creative District, 10012</span>
               </li>
               <li className="flex items-center gap-4">
                 <Mail size={20} className="text-[#f3d3bd] shrink-0" />
                 <a href="mailto:hello@coffeemap.com" className="hover:text-[#f3d3bd] transition-colors">hello@coffeemap.com</a>
               </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-[#4d8b31] font-bold">Connect</h3>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#fcfaf9] text-[#000000] px-6 py-3 rounded-full font-medium hover:bg-[#4d8b31] hover:text-[#fcfaf9] transition-all group"
            >
              <WhatsappIcon className="w-5 h-5 text-[#4d8b31] group-hover:text-[#fcfaf9] transition-colors" />
              WhatsApp Us
            </a>
            
            <p className="text-sm text-[#fcfaf9]/40 mt-8 pt-8 border-t border-[#fcfaf9]/10">
              © {mounted ? new Date().getFullYear() : '2026'} Coffee Map. All rights reserved.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

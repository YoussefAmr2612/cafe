'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/app/context';

const CATEGORIES = ['All', 'Espresso', 'Cold Brew', 'Specialty', 'Tea', 'Smoothies', 'Pastries'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Aura Latte',
    category: 'Espresso',
    description: 'Double shot of our signature house blend with micro-foam and a hint of vanilla.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    name: 'Ethiopian Single Origin',
    category: 'Espresso',
    description: 'Bright and floral notes with a silky body and a citrus finish.',
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
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
    id: 4,
    name: 'Cascara Tonic',
    category: 'Specialty',
    description: 'Coffee cherry tea infused with tonic water and a twist of dehydrated orange.',
    price: '$6.50',
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
    id: 6,
    name: 'Nitro Gold',
    category: 'Cold Brew',
    description: 'Our signature cold brew infused with nitrogen for a creamy, stout-like texture.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=600'
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
  },
  {
    id: 9,
    name: 'Tropical Burst',
    category: 'Smoothies',
    description: 'Mango, passion fruit, and coconut milk blended for a refreshing escape.',
    price: '$7.00',
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 10,
    name: 'Forest Berry',
    category: 'Smoothies',
    description: 'Wild blueberries, strawberries, and greek yogurt topped with chia seeds.',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 11,
    name: 'Pistachio Croissant',
    category: 'Pastries',
    description: 'Multi-layered butter croissant filled with house-made pistachio cream.',
    price: '$5.75',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 12,
    name: 'Cardamom Bun',
    category: 'Pastries',
    description: 'Traditional Swedish-style bun with a heavy cardamom crust.',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1586333240439-ad152917f692?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 13,
    name: 'Hojicha Latte',
    category: 'Tea',
    description: 'Roasted Japanese green tea with notes of chocolate and charcoal.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=600'
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
    id: 15,
    name: 'White Flat White',
    category: 'Espresso',
    description: 'Micro-foamed milk over a short double ristretto for intense smoothness.',
    price: '$4.75',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 16,
    name: 'Kyoto Drip',
    category: 'Cold Brew',
    description: 'Slow-drip cold coffee, drop-by-drop for 12 hours. Pure clarity.',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1495474472205-51f7d4c0c169?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 17,
    name: 'Almond Dream',
    category: 'Smoothies',
    description: 'Almond butter, banana, dates, and a pinch of Himalayan salt.',
    price: '$8.00',
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&q=80&w=600'
  },

  {
    id: 18,
    name: 'Citrus Espresso Tonic',
    category: 'Specialty',
    description: 'Double shot over sparkling water, fever-tree tonic, and lemon zest.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 19,
    name: 'Ruby Hibiscus',
    category: 'Tea',
    description: 'Tart and vibrant chilled hibiscus tea with local wildflower honey.',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 20,
    name: 'Pain au Chocolat',
    category: 'Pastries',
    description: 'Classic French pastry with two bars of dark Valrhona chocolate.',
    price: '$5.25',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  }
];

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { addToCart } = useAppContext();

  const filteredProducts = PRODUCTS.filter(
    p => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="relative min-h-screen bg-[#fcfaf9] dark:bg-[#000000] selection:bg-[#4d8b31] selection:text-[#fcfaf9] overflow-x-hidden transition-colors duration-300">

      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-[1600px] mx-auto min-h-screen flex flex-col">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#000000]/5 dark:border-[#fcfaf9]/5">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-12 h-[1px] bg-[#4d8b31]" />
                <span className="text-[#4d8b31] font-mono text-xs tracking-widest uppercase font-bold">The Menu</span>
              </motion.div>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#000000] dark:text-[#fcfaf9]">
                Place your order
              </h1>
            </div>
            
            <p className="text-[#000000]/60 dark:text-[#fcfaf9]/60 font-sans max-w-sm mb-2 text-sm leading-relaxed">
              Experience the density of flavor. Meticulously sourced, precisely brewed, delivered to your table.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-12 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2.5 rounded-full text-xs tracking-widest uppercase font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-[#000000] dark:bg-[#fcfaf9] border-[#000000] dark:border-[#fcfaf9] text-[#fcfaf9] dark:text-[#000000]' 
                    : 'bg-transparent border-[#000000]/10 dark:border-[#fcfaf9]/10 text-[#000000]/40 dark:text-[#fcfaf9]/40 hover:border-[#4d8b31] hover:text-[#4d8b31]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-[#000000]/40 dark:text-[#fcfaf9]/40 font-mono text-sm tracking-widest uppercase">
              No items discovered in this territory
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="relative group flex flex-col border-r border-b border-[#000000]/5 dark:border-[#fcfaf9]/5 p-4 -m-4 transition-colors hover:bg-[#f3d3bd]/10 dark:hover:bg-[#f3d3bd]/5"
                >
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#f3d3bd]/20 dark:bg-[#fcfaf9]/5 mb-4 group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="absolute bottom-4 right-4 bg-[#4d8b31] text-[#fcfaf9] w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-display text-lg font-bold leading-tight text-[#000000] dark:text-[#fcfaf9] group-hover:text-[#4d8b31] transition-colors">{product.name}</h3>
                      <span className="font-mono text-sm font-semibold text-[#4d8b31] shrink-0">{product.price}</span>
                    </div>
                    <p className="text-xs text-[#000000]/50 dark:text-[#fcfaf9]/40 mb-4 line-clamp-3 leading-relaxed font-sans">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#000000]/5 dark:border-[#fcfaf9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#000000]/30 dark:text-[#fcfaf9]/30">
                        {product.category}
                      </span>
                      <Link href={`#`} className="text-[10px] uppercase tracking-widest font-bold text-[#4d8b31] hover:underline">
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {hoveredProduct && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-8 right-8 z-50 pointer-events-none hidden xl:block"
          >
            <div className="bg-[#000000] dark:bg-[#fcfaf9] text-[#fcfaf9] dark:text-[#000000] px-6 py-3 rounded-full font-mono text-[10px] tracking-widest uppercase">
              SELECTING: {PRODUCTS.find(p => p.id === hoveredProduct)?.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

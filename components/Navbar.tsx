'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, ShoppingBag, Trash2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAppContext } from '@/app/context';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart } = useAppContext();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled 
          ? isHome 
            ? 'bg-[#000000]/60 dark:bg-[#000000]/80 backdrop-blur-md text-[#fcfaf9] py-4 shadow-sm' 
            : 'bg-[#fcfaf9]/90 dark:bg-[#000000]/90 backdrop-blur-md text-[#000000] dark:text-[#fcfaf9] py-4 shadow-sm border-b border-[#000000]/5 dark:border-[#fcfaf9]/10' 
          : isHome 
            ? 'mix-blend-difference text-[#fcfaf9] py-6' 
            : 'text-[#000000] dark:text-[#fcfaf9] py-6 bg-transparent'
      }`}>
        <Link href="/" className="font-display text-2xl font-bold tracking-tighter cursor-pointer">
          COFFEE MAP.
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide uppercase">
          <Link href="/#home" className="hover:text-[#4d8b31] transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-[#4d8b31] transition-colors">About</Link>
          <Link href="/#menu" className="hover:text-[#4d8b31] transition-colors">Menu</Link>
          <Link href="/order" className={`${pathname === '/order' ? 'text-[#4d8b31]' : 'hover:text-[#4d8b31]'} transition-colors ${isHome && !isScrolled ? 'border border-[#fcfaf9]/30 px-4 py-2 rounded-full hover:border-[#fcfaf9]' : ''}`}>
            Order
          </Link>
          
          <div className="flex items-center gap-6 border-l border-current pl-6 opacity-80">
            {mounted && (
              <button 
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="hover:text-[#4d8b31] transition-colors"
                aria-label="Toggle dark mode"
              >
                {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-[#4d8b31] transition-colors relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -top-2 -left-2 bg-[#4d8b31] text-[#fcfaf9] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
              <span>({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden">
          {mounted && (
            <button 
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="hover:text-[#4d8b31] transition-colors"
            >
              {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-[#4d8b31] transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#4d8b31] text-[#fcfaf9] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[60] flex flex-col justify-center items-center gap-8 ${isHome ? 'bg-[#000000] text-[#fcfaf9]' : 'bg-[#fcfaf9] dark:bg-[#000000] text-[#000000] dark:text-[#fcfaf9]'}`}
          >
            <Link href="/#home" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-widest hover:text-[#4d8b31] transition-colors">Home</Link>
            <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-widest hover:text-[#4d8b31] transition-colors">About</Link>
            <Link href="/#menu" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-widest hover:text-[#4d8b31] transition-colors">Menu</Link>
            <Link href="/order" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-widest text-[#4d8b31] mt-4 transition-colors">Order Now</Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar Placeholder (Cart drawer) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[60] bg-[#000000]/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%', filter: 'blur(8px)' }}
              animate={{ x: 0, filter: 'blur(0px)' }}
              exit={{ x: '100%', filter: 'blur(8px)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#fcfaf9] dark:bg-[#0f0f0f] text-[#000000] dark:text-[#fcfaf9] z-[70] shadow-2xl flex flex-col border-l border-[#000000]/5 dark:border-[#fcfaf9]/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#000000]/10 dark:border-[#fcfaf9]/10">
                <h2 className="font-display text-2xl font-bold">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-[#4d8b31] transition-colors"><X size={24} /></button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <p className="text-[#000000]/50 dark:text-[#fcfaf9]/50 font-mono text-sm tracking-widest uppercase text-center mt-10">Cart is empty</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#f3d3bd]/30 shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-display font-medium text-lg leading-tight mb-1">{item.product.name}</h3>
                        <p className="text-[#000000]/50 dark:text-[#fcfaf9]/50 text-sm mb-2">{item.product.price} x {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-[#000000]/40 dark:text-[#fcfaf9]/40 hover:text-red-500 transition-colors self-start p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-[#000000]/10 dark:border-[#fcfaf9]/10 bg-[#fcfaf9] dark:bg-[#0f0f0f]">
                <button className="w-full bg-[#000000] dark:bg-[#fcfaf9] text-[#fcfaf9] dark:text-[#000000] hover:bg-[#4d8b31] dark:hover:bg-[#4d8b31] dark:hover:text-[#fcfaf9] transition-colors py-4 rounded-full font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" disabled={cartItems.length === 0}>
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

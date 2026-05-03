'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
    // Only trigger transition if loading is not already true or needed
    const finishTimer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(finishTimer);
  }, [pathname]);
  
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="screen-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#fcfaf9] dark:bg-[#000000] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-t-2 border-r-2 border-[#000000] dark:border-[#f3d3bd] rounded-full mb-6"
            />
            <span className="font-display text-[#000000] dark:text-[#f3d3bd] text-sm tracking-[0.4em] uppercase">
              Brewing
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: 'blur(15px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  );
}

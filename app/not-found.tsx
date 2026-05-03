'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fcfaf9] dark:bg-[#000000] flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Compass size={64} className="text-[#4d8b31] mb-8 mx-auto" strokeWidth={1} />
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 text-[#000000] dark:text-[#fcfaf9]">
          404
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#000000]/60 dark:text-[#fcfaf9]/60 max-w-md mx-auto mb-12">
          This territory remains uncharted. The coordinates you followed did not lead to a brew.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-3 border border-[#000000]/30 dark:border-[#fcfaf9]/30 px-8 py-4 rounded-full text-sm font-medium hover:bg-[#f3d3bd] hover:text-[#000000] hover:border-[#f3d3bd] transition-all duration-300"
        >
          Return to Base
        </Link>
      </motion.div>
    </div>
  );
}

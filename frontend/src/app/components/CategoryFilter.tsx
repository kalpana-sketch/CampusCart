import { motion } from 'motion/react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category)}
          className={`relative px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all overflow-hidden ${
            selected === category
              ? 'text-white shadow-lg shadow-blue-500/30'
              : 'bg-white/40 dark:bg-white/5 backdrop-blur-md text-neutral-600 dark:text-neutral-400 border border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10'
          }`}
        >
          {selected === category && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 animate-shimmer"></div>
            </>
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
}
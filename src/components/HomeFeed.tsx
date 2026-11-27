import { useMemo, useState } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { SceneArt } from './SceneArt';
import { categories, questions } from '@/data/questions';

type Props = {
  onSelect: (id: string) => void;
};

export function HomeFeed({ onSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return questions;
    return questions.filter((q) => q.category === activeCategory);
  }, [activeCategory]);

  const featured = questions[0];

  return (
    <div className="animate-fade-in">
      {/* Hero / featured */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <SceneArt scene={featured.scene} gradient={featured.gradient} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-500 text-ink-200 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent-300" />
              A field guide to curiosity
            </span>
            <h1 className="mt-5 font-display text-4xl font-600 leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
              Discover the questions that shape our world.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200">
              Lumen turns deep wonder into something you can explore in an afternoon.
              Pick a question, follow it somewhere new.
            </p>
            <button
              onClick={() => onSelect(featured.id)}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-600 text-ink-950 transition-all hover:gap-3 hover:shadow-xl hover:shadow-white/10"
            >
              Start with today's question
              <TrendingUp className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-600 text-white">Questions worth chasing</h2>
            <p className="mt-1 text-sm text-ink-400">
              {filtered.length} {filtered.length === 1 ? 'question' : 'questions'} to explore
            </p>
          </div>
          {/* Category filter */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-500 transition-all ${
                  activeCategory === cat
                    ? 'bg-accent-500 text-ink-950'
                    : 'border border-white/10 bg-white/5 text-ink-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((q, i) => (
            <QuestionCard key={q.id} question={q} onSelect={onSelect} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-ink-400">
            No questions in this category yet — check back soon.
          </p>
        )}
      </section>
    </div>
  );
}

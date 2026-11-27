import { ArrowUpRight, Clock } from 'lucide-react';
import { SceneArt } from './SceneArt';
import type { Question } from '@/data/questions';

type Props = {
  question: Question;
  onSelect: (id: string) => void;
  index?: number;
};

export function QuestionCard({ question, onSelect, index = 0 }: Props) {
  return (
    <button
      onClick={() => onSelect(question.id)}
      style={{ animationDelay: `${index * 70}ms` }}
      className="group animate-fade-up relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
    >
      {/* Artwork */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <SceneArt
          scene={question.scene}
          gradient={question.gradient}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/60 px-2.5 py-1 text-[11px] font-500 uppercase tracking-wider text-ink-200 backdrop-blur-sm">
          {question.category}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink-950/60 px-2.5 py-1 text-[11px] font-500 text-ink-200 backdrop-blur-sm">
          <Clock className="h-3 w-3" />
          {question.readTime}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-600 leading-snug text-white text-balance transition-colors group-hover:text-accent-200">
          {question.question}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-300">
          {question.tagline}
        </p>
        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-500 text-accent-300 transition-all group-hover:gap-3">
          Explore
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
}

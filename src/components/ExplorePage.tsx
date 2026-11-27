import { ArrowLeft, ArrowUpRight, Clock, Lightbulb, Sparkles } from 'lucide-react';
import { SceneArt } from './SceneArt';
import { GravitySimulation } from './GravitySimulation';
import { getQuestion, questions } from '@/data/questions';

type Props = {
  questionId: string;
  onBack: () => void;
  onSelect: (id: string) => void;
};

export function ExplorePage({ questionId, onBack, onSelect }: Props) {
  const question = getQuestion(questionId);

  if (!question) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-ink-300">This question could not be found.</p>
        <button
          onClick={onBack}
          className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
        >
          Back to feed
        </button>
      </div>
    );
  }

  const relatedQuestions = question.related
    .map((id) => getQuestion(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <SceneArt scene={question.scene} gradient={question.gradient} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
          <button
            onClick={onBack}
            className="group mb-8 inline-flex items-center gap-2 rounded-lg bg-ink-950/40 px-3 py-2 text-sm font-500 text-ink-200 backdrop-blur-sm transition-all hover:bg-ink-950/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to feed
          </button>
          <div className="flex items-center gap-3 text-xs font-500 text-ink-200">
            <span className="rounded-full bg-ink-950/50 px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
              {question.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {question.readTime}
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-600 leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            {question.question}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-200">
            {question.tagline}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Intro */}
        <p className="font-display text-xl font-500 leading-relaxed text-ink-100 text-balance">
          {question.intro}
        </p>

        {/* Interactive gravity sim — only on the gravity question */}
        {question.id === 'gravity-simulation' && (
          <div className="mt-12 animate-fade-up">
            <GravitySimulation />
          </div>
        )}

        {/* Sections */}
        <div className="mt-12 space-y-10">
          {question.sections.map((section, i) => (
            <section
              key={i}
              style={{ animationDelay: `${i * 100}ms` }}
              className="animate-fade-up"
            >
              <h2 className="font-display text-xl font-600 text-white">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-ink-300">
                {section.body}
              </p>
              {section.fact && (
                <div className="mt-4 flex gap-3 rounded-xl border border-accent-500/20 bg-accent-500/5 p-4">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent-300" />
                  <p className="text-sm leading-relaxed text-accent-100">
                    <span className="font-600">Did you know? </span>
                    {section.fact}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related questions */}
        {relatedQuestions.length > 0 && (
          <div className="mt-16 border-t border-white/8 pt-12">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent-300" />
              <h2 className="font-display text-xl font-600 text-white">
                Follow this somewhere new
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedQuestions.map((rq) => (
                <button
                  key={rq.id}
                  onClick={() => onSelect(rq.id)}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/8 bg-ink-900/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <SceneArt
                      scene={rq.scene}
                      gradient={rq.gradient}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-ink-400">
                      {rq.category}
                    </p>
                    <h3 className="mt-1 font-display text-sm font-600 leading-snug text-white text-balance">
                      {rq.question}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer CTA back to feed */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-sm text-ink-400">
            {questions.length} questions and counting in the feed.
          </p>
          <button
            onClick={onBack}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-500 text-white transition-all hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all questions
          </button>
        </div>
      </div>
    </div>
  );
}

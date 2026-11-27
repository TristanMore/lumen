import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { HomeFeed } from '@/components/HomeFeed';
import { ExplorePage } from '@/components/ExplorePage';

type View = { name: 'home' } | { name: 'explore'; questionId: string };

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' });

  const openQuestion = (id: string) => {
    setView({ name: 'explore', questionId: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView({ name: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keep document title in sync
  useEffect(() => {
    if (view.name === 'home') {
      document.title = 'Lumen — Discover the questions that shape our world';
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-ink-950">
      <Header
        current={view.name}
        onNavigate={(dest) => {
          if (dest === 'home') goHome();
          else goHome(); // "Explore" returns to the feed in this prototype
        }}
      />
      <main>
        {view.name === 'home' ? (
          <HomeFeed onSelect={openQuestion} />
        ) : (
          <ExplorePage
            questionId={view.questionId}
            onBack={goHome}
            onSelect={openQuestion}
          />
        )}
      </main>

      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="font-display text-lg font-600 text-white">Lumen</p>
          <p className="mt-1 text-sm text-ink-400">
            A prototype for curiosity-driven discovery. Sample content, no accounts.
          </p>
        </div>
      </footer>
    </div>
  );
}

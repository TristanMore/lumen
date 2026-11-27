import { Compass, Sparkles } from 'lucide-react';

type Props = {
  current: 'home' | 'explore';
  onNavigate: (view: 'home' | 'explore') => void;
};

export function Header({ current, onNavigate }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/30">
            <Sparkles className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
            <span className="absolute -inset-1 rounded-xl bg-accent-400/30 blur-md transition-opacity group-hover:opacity-100 opacity-0" />
          </span>
          <span className="font-display text-xl font-600 tracking-tight text-white">
            Lumen
          </span>
        </button>

        <nav className="flex items-center gap-1">
          <NavButton active={current === 'home'} onClick={() => onNavigate('home')}>
            Feed
          </NavButton>
          <NavButton active={current === 'explore'} onClick={() => onNavigate('explore')}>
            <Compass className="mr-1.5 h-4 w-4" />
            Explore
          </NavButton>
        </nav>
      </div>
    </header>
  );
}

function NavButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded-lg px-3.5 py-2 text-sm font-500 transition-all sm:px-4 ${
        active
          ? 'bg-white/10 text-white'
          : 'text-ink-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

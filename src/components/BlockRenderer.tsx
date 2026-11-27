import { Lightbulb } from 'lucide-react';
import type { ContentBlock } from '@/types';
import { Diagram, Chart } from './Diagrams';
import { GravitySimulation } from './GravitySimulation';
import { DoubleSlitSimulation } from './interactive/DoubleSlitSimulation';
import { LightScatteringSimulation } from './interactive/LightScatteringSimulation';
import { RocketThrustSimulation } from './interactive/RocketThrustSimulation';
import { TimeDilationSimulation } from './interactive/TimeDilationSimulation';
import { BlackHoleSimulation } from './interactive/BlackHoleSimulation';

export function BlockRenderer({ block, index }: { block: ContentBlock; index: number }) {
  const delay = `${Math.min(index * 60, 400)}ms`;

  switch (block.block_type) {
    case 'heading':
      return (
        <section className="animate-fade-up" style={{ animationDelay: delay }}>
          <h2 className="font-display text-xl font-600 text-white">{block.heading}</h2>
          {block.body && (
            <p className="mt-3 text-base leading-[1.7] text-ink-300">{block.body}</p>
          )}
        </section>
      );

    case 'text':
      return (
        <p
          className="animate-fade-up text-base leading-[1.7] text-ink-300"
          style={{ animationDelay: delay }}
        >
          {block.body}
        </p>
      );

    case 'fact':
      return (
        <div
          className="animate-fade-up mt-2 flex gap-3 rounded-xl border border-accent-500/20 bg-accent-500/5 p-4"
          style={{ animationDelay: delay }}
        >
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent-300" />
          <p className="text-sm leading-relaxed text-accent-100">
            <span className="font-600">Did you know? </span>
            {block.body}
          </p>
        </div>
      );

    case 'diagram':
      return (
        <div className="animate-fade-up" style={{ animationDelay: delay }}>
          {block.config && <Diagram diagramKey={block.config.key} />}
        </div>
      );

    case 'chart':
      return (
        <div className="animate-fade-up" style={{ animationDelay: delay }}>
          {block.config && <Chart chartKey={block.config.key} />}
        </div>
      );

    case 'interactive':
      return (
        <div className="animate-fade-up my-8" style={{ animationDelay: delay }}>
          {block.config && <InteractiveByKey key_={block.config.key} />}
        </div>
      );

    default:
      return null;
  }
}

function InteractiveByKey({ key_ }: { key_: string }) {
  switch (key_) {
    case 'gravity-sandbox':
      return <GravitySimulation />;
    case 'double-slit':
      return <DoubleSlitSimulation />;
    case 'light-scattering':
      return <LightScatteringSimulation />;
    case 'rocket-thrust':
      return <RocketThrustSimulation />;
    case 'time-dilation':
      return <TimeDilationSimulation />;
    case 'black-hole-sim':
      return <BlackHoleSimulation />;
    default:
      return null;
  }
}

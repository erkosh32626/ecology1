import React, { useState } from 'react';
import { GLOBAL_STATS } from '../utils/hungerData';

export const StatsSection: React.FC = () => {
  const [selectedStatId, setSelectedStatId] = useState<string>('stat-1');

  const activeStat =
    GLOBAL_STATS.find((item) => item.id === selectedStatId) || GLOBAL_STATS[0];

  return (
    <section
      id="block-2"
      aria-labelledby="block-2-heading"
      className="relative w-full lg:h-screen lg:max-h-screen py-16 lg:py-0 lg:pt-20 lg:pb-8 px-6 md:px-12 xl:pr-20 flex items-center justify-center bg-gradient-to-b from-[#0a0608] via-[#0e0c14] to-[#0a0608] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-between h-full max-h-[780px]">
        {/* Section Kicker & Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
              <span className="font-mono tabular-nums">02 / 09</span>
              <span aria-hidden="true">·</span>
              <span>2-блок (Слайд): Жағдайдың ауқымы (Статистика)</span>
            </div>
            <h2
              id="block-2-heading"
              className="font-instrument text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.06] tracking-tight"
            >
              Бүгінгі жаһандық көрініс
            </h2>
          </div>
          <p className="text-white/65 text-xs md:text-sm max-w-md leading-relaxed">
            Әлемдік азық-түлік жүйесіндегі парадокс: миллиондаған тонна тағам
            рәсуа болған сәтте миллиардтаған адам сапалы асқа жете алмай отыр.
          </p>
        </div>

        {/* 3 Main Indicator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 min-h-0 items-stretch">
          {GLOBAL_STATS.map((stat, idx) => {
            const isSelected = stat.id === selectedStatId;
            return (
              <button
                key={stat.id}
                type="button"
                onClick={() => setSelectedStatId(stat.id)}
                className={`text-left rounded-2xl p-6 lg:p-7 transition-all duration-300 liquid-glass cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'ring-1 ring-white/45 bg-white/[0.06]'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-white/55 mb-4">
                    <span>{stat.label}</span>
                    <span className="font-mono tabular-nums">0{idx + 1}</span>
                  </div>

                  <div className="font-instrument text-white text-3xl sm:text-4xl lg:text-5xl leading-none tracking-tight tabular-nums mb-3 text-glow">
                    {stat.value}
                  </div>

                  <p className="text-white/85 text-sm lg:text-base leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-xs text-white/55 flex items-center justify-between gap-2">
                  <span>{stat.sourceNote}</span>
                  <span className="text-white/80 whitespace-nowrap shrink-0">
                    {isSelected ? 'Таңдалған ↓' : 'Талдау →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Scale & Breakdown Bar */}
        <div className="mt-6 rounded-2xl p-5 lg:p-6 bg-white/[0.03] border border-white/10 shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-white/55">
                <span>Интерактивті салыстыру</span>
                <span aria-hidden="true">·</span>
                <span>{activeStat.label}</span>
              </div>
              <h3 className="text-base md:text-lg font-medium text-white">
                {activeStat.value} — {activeStat.description}
              </h3>
              <p className="text-xs md:text-sm text-white/70">
                {activeStat.contextMetric}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {GLOBAL_STATS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedStatId(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedStatId === item.id
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Proportion Bar (8 Billion World Population Scale) */}
          <div className="mt-4 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/60 font-mono tabular-nums">
              <span>Созылмалы аштық: ~735 млн (9.1%)</span>
              <span>Сапалы асқа қолжетімсіздік: 3.1 млрд (38.7%)</span>
              <span>Әлем халқы: ~8.0 млрд (100%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden flex">
              <div
                style={{ width: '9.2%' }}
                className="h-full bg-amber-400 transition-all duration-500"
                title="Созылмалы аштыққа ұшыраған ~735 млн адам"
              />
              <div
                style={{ width: '29.5%' }}
                className="h-full bg-sky-400/70 transition-all duration-500"
                title="Толыққанды тамақтануға қаржысы жетпейтін 3.1 млрд адам"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

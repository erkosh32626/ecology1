import React, { useState } from 'react';
import {
  SOLUTION_DIRECTIONS,
  calculateSolutionImpact,
} from '../utils/hungerData';

export const SolutionsSection: React.FC = () => {
  const [activeIds, setActiveIds] = useState<string[]>(
    SOLUTION_DIRECTIONS.map((s) => s.id)
  );
  const [intensity, setIntensity] = useState<number>(100);

  const toggleSolution = (id: string) => {
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const impact = calculateSolutionImpact(activeIds, intensity);

  return (
    <section
      id="block-8"
      aria-labelledby="block-8-heading"
      className="relative w-full lg:h-screen lg:max-h-screen py-16 lg:py-0 lg:pt-20 lg:pb-8 px-6 md:px-12 xl:pr-20 flex items-center justify-center border-t border-white/10 bg-[#0a0608] overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-between h-full max-h-[800px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
              <span className="font-mono tabular-nums">08 / 09</span>
              <span aria-hidden="true">·</span>
              <span>8-блок (Слайд): Шешу жолдары мен инновациялар</span>
            </div>
            <h2
              id="block-8-heading"
              className="font-instrument text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight"
            >
              Дағдарыстан қалай шығамыз?
            </h2>
          </div>
          <p className="text-white/65 text-xs md:text-sm max-w-md leading-relaxed">
            Төрт негізгі инновациялық және гуманитарлық бағытты біріктіру арқылы
            созылмалы аштықты түбегейлі қысқартуға болады.
          </p>
        </div>

        {/* 4 Solution Directions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
          {SOLUTION_DIRECTIONS.map((solution, idx) => {
            const isChecked = activeIds.includes(solution.id);
            return (
              <div
                key={solution.id}
                onClick={() => toggleSolution(solution.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isChecked}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSolution(solution.id);
                  }
                }}
                className={`rounded-2xl p-5 lg:p-6 transition-all duration-300 liquid-glass cursor-pointer flex flex-col justify-between ${
                  isChecked
                    ? 'ring-1 ring-white/45 bg-white/[0.06]'
                    : 'opacity-65 hover:opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-white/55 mb-2">
                    <span>Негізгі бағыт · 0{idx + 1}</span>
                    <span className="font-mono tabular-nums text-white/85">
                      {isChecked ? 'Қосулы ✓' : 'Өшірулі'}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">
                    {solution.title}
                  </h3>

                  <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                  <span>{solution.implementationTimeline}</span>
                  <span className="font-mono tabular-nums text-white">
                    Әлеуеті: ~{solution.potentialSavedMillions} млн адам
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Solution Impact Simulator */}
        <div className="mt-5 rounded-2xl p-4 lg:p-5 bg-white/[0.03] border border-white/10 shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-xl flex-1">
              <div className="flex items-center gap-2 text-xs text-white/55">
                <span>Интерактивті модельдеу</span>
                <span aria-hidden="true">·</span>
                <span>{impact.activeCount} / 4 бағыт таңдалды</span>
              </div>
              <h3 className="text-sm md:text-base font-medium text-white">
                Шешімдерді енгізу нәтижесіндегі болжамды әсер
              </h3>
              <div className="space-y-1 pt-0.5">
                <label
                  htmlFor="solution-intensity-slider"
                  className="flex items-center justify-between text-xs text-white/75"
                >
                  <span>Жаһандық іске асыру деңгейі:</span>
                  <span className="font-mono tabular-nums font-semibold text-white">
                    {intensity}%
                  </span>
                </label>
                <input
                  id="solution-intensity-slider"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 font-mono tabular-nums shrink-0">
              <div className="p-3 lg:p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-[11px] text-white/55 block font-sans mb-0.5">
                  Аштықтан құтқарылатындар
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                  {impact.totalSavedMillions} млн
                </span>
              </div>

              <div className="p-3 lg:p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-[11px] text-white/55 block font-sans mb-0.5">
                  Ысыраптың азаюы
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                  -{impact.wasteReductionPercent}%
                </span>
              </div>

              <div className="p-3 lg:p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="text-[11px] text-white/55 block font-sans mb-0.5">
                  Дағдарысты жеңу үлесі
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-300">
                  {impact.reliefPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

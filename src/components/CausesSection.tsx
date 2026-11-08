import React, { useState } from 'react';
import { CAUSE_BLOCKS, CauseBlock } from '../utils/hungerData';

export const CausesSection: React.FC = () => {
  const [wasteViewMode, setWasteViewMode] = useState<
    'both' | 'developed' | 'developing'
  >('both');

  return (
    <div aria-label="Азық-түлік тапшылығының негізгі 4 себебі">
      {CAUSE_BLOCKS.map((cause: CauseBlock) => {
        const isFoodWasteBlock = cause.blockNumber === 6;

        return (
          <section
            key={cause.id}
            id={cause.id}
            aria-labelledby={`${cause.id}-heading`}
            className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 flex items-center justify-center border-t border-white/10 bg-[#0a0608]"
          >
            <div className="max-w-6xl w-full mx-auto">
              {/* Top Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="font-mono tabular-nums">
                    0{cause.blockNumber} / 09
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {cause.blockNumber}-блок (Слайд): {cause.causeLabel}
                  </span>
                </div>
                <div className="text-xs text-white/70 font-mono tabular-nums">
                  <span>{cause.keyIndicatorLabel}: </span>
                  <span className="text-white font-medium">
                    {cause.keyIndicatorValue}
                  </span>
                </div>
              </div>

              {/* Main Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-12 items-start">
                {/* Left Column: Block Heading & Summary */}
                <div className="lg:col-span-5 space-y-6">
                  <p className="text-xs tracking-wider text-white/55">
                    0{cause.causeIndex}. НЕГІЗГІ СЕБЕП
                  </p>
                  <h2
                    id={`${cause.id}-heading`}
                    style={{ textWrap: 'balance' }}
                    className="font-instrument text-white text-4xl sm:text-5xl leading-[1.08] tracking-tight"
                  >
                    {cause.title}
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed">
                    {cause.summary}
                  </p>

                  {isFoodWasteBlock && (
                    <div className="pt-2">
                      <p className="text-xs text-white/50 mb-2.5">
                        Аймақтық салыстыру сүзгісі:
                      </p>
                      <div className="inline-flex items-center gap-1 p-1 bg-white/[0.06] rounded-lg border border-white/10">
                        <button
                          type="button"
                          onClick={() => setWasteViewMode('both')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            wasteViewMode === 'both'
                              ? 'bg-white text-black'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          Барлығы
                        </button>
                        <button
                          type="button"
                          onClick={() => setWasteViewMode('developed')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            wasteViewMode === 'developed'
                              ? 'bg-white text-black'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          Дамыған елдерде
                        </button>
                        <button
                          type="button"
                          onClick={() => setWasteViewMode('developing')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            wasteViewMode === 'developing'
                              ? 'bg-white text-black'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          Дамушы елдерде
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Theses Cards */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="text-xs text-white/55 mb-2">
                    Негізгі тезистер
                  </div>
                  {cause.theses
                    .filter((thesis) => {
                      if (!isFoodWasteBlock || wasteViewMode === 'both')
                        return true;
                      if (wasteViewMode === 'developed')
                        return thesis.title.includes('Дамыған');
                      return thesis.title.includes('Дамушы');
                    })
                    .map((thesis, idx) => (
                      <article
                        key={thesis.title}
                        className="rounded-2xl p-6 md:p-8 liquid-glass transition-all duration-300 hover:bg-white/[0.05]"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                          <h3 className="text-xl md:text-2xl font-medium text-white">
                            <span className="font-mono tabular-nums text-white/45 text-base mr-2.5">
                              0{idx + 1}.
                            </span>
                            {thesis.title}
                          </h3>
                          <span className="text-xs text-white/60 font-mono tabular-nums">
                            {thesis.metricHighlight}
                          </span>
                        </div>
                        <p className="text-white/80 text-base leading-relaxed">
                          {thesis.description}
                        </p>
                      </article>
                    ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

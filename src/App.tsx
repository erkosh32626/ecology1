/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { CausesSection } from './components/CausesSection';
import { DangerMapSection } from './components/DangerMapSection';
import { SolutionsSection } from './components/SolutionsSection';
import { QuoteSection } from './components/QuoteSection';
import { SlideProgressRail } from './components/SlideProgressRail';
import { ShareModal } from './components/ShareModal';
import { SLIDE_BLOCKS } from './utils/hungerData';

export default function App() {
  const [activeBlockId, setActiveBlockId] = useState<string>('block-1');
  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const scrollToBlock = (blockId: string) => {
    setActiveBlockId(blockId);
    const el = document.getElementById(blockId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.innerHeight * 0.4;
      for (let i = SLIDE_BLOCKS.length - 1; i >= 0; i--) {
        const block = SLIDE_BLOCKS[i];
        const el = document.getElementById(block.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMiddle) {
            setActiveBlockId(block.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0608] min-h-screen text-white relative selection:bg-white/20">
      <Navbar
        activeBlockId={activeBlockId}
        onSelectBlock={scrollToBlock}
        onOpenShare={() => setShareOpen(true)}
      />

      <SlideProgressRail
        activeBlockId={activeBlockId}
        onSelectBlock={scrollToBlock}
      />

      <main>
        {/* 1-блок (Слайд): Басты бет (Титул) */}
        <Hero onExploreClick={() => scrollToBlock('block-2')} />

        {/* 2-блок (Слайд): Жағдайдың ауқымы (Статистика) */}
        <StatsSection />

        {/* 3, 4, 5, 6-блоктар (Слайдтар): 1–4 себептер */}
        <CausesSection />

        {/* 7-блок (Слайд): Ең қауіпті аймақтар (География) */}
        <DangerMapSection />

        {/* 8-блок (Слайд): Шешу жолдары мен инновациялар */}
        <SolutionsSection />

        {/* 9-блок (Слайд): Қорытынды (Үндеу) — Parallax Sky, Rainbow & Clouds */}
        <QuoteSection
          onScrollToTop={() => scrollToBlock('block-1')}
          onOpenShare={() => setShareOpen(true)}
        />
      </main>

      <footer className="bg-[#05080f] border-t border-white/10 py-8 px-6 md:px-12 text-xs text-white/55">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-dancing text-lg text-white">Serene</span>
            <span aria-hidden="true">·</span>
            <span>
              Әлемдегі аштық мәселесі және азық-түлік тапшылығының себептері
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Барлық 9 блок бір бетте</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => scrollToBlock('block-1')}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Басына оралу ↑
            </button>
          </div>
        </div>
      </footer>

      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}

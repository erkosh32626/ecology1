import React, { useState, useEffect } from 'react';
import { SLIDE_BLOCKS } from '../utils/hungerData';

interface NavbarProps {
  activeBlockId: string;
  onSelectBlock: (blockId: string) => void;
  onOpenShare: () => void;
}

const PRIMARY_NAV_ITEMS = [
  { id: 'block-2', label: 'Статистика' },
  { id: 'block-3', label: 'Себептер (1–4)' },
  { id: 'block-7', label: 'Қауіпті аймақтар' },
  { id: 'block-8', label: 'Шешу жолдары' },
  { id: 'block-9', label: 'Қорытынды' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeBlockId,
  onSelectBlock,
  onOpenShare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onSelectBlock(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-8 px-6 md:px-12 py-4 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#0a0608]/85 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#block-1"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('block-1');
          }}
          className="font-dancing text-white text-2xl md:text-3xl whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
        >
          Serene
        </a>

        {/* Zone 2: Desktop Navigation Links (4-5 concise single-line links) */}
        <nav
          aria-label="Негізгі бөлімдер"
          className="hidden lg:flex items-center gap-10"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isCausesActive =
              item.id === 'block-3' &&
              ['block-3', 'block-4', 'block-5', 'block-6'].includes(
                activeBlockId
              );
            const isActive = activeBlockId === item.id || isCausesActive;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`text-sm tracking-wide transition-colors whitespace-nowrap shrink-0 pb-1 border-b ${
                  isActive
                    ? 'text-white border-white font-medium'
                    : 'text-white/80 hover:text-white border-transparent hover:border-white/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA (Desktop) & Animated Hamburger (Mobile) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenShare}
            className="hidden lg:inline-flex items-center justify-center bg-white text-black px-7 py-3 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow whitespace-nowrap shrink-0 cursor-pointer"
          >
            Презентациямен бөлісу
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Мәзірді жабу' : 'Мәзірді ашу'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span
              className="block w-5 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transform: mobileMenuOpen
                  ? 'translateY(6px) rotate(45deg)'
                  : 'translateY(-5px) rotate(0deg)',
              }}
            />
            <span
              className="block w-5 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: mobileMenuOpen ? 0 : 1,
                transform: mobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
            <span
              className="block w-5 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transform: mobileMenuOpen
                  ? 'translateY(-6px) rotate(-45deg)'
                  : 'translateY(5px) rotate(0deg)',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Slide-In Drawer */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-xs'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 p-6 pt-24 flex flex-col justify-between transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="space-y-2 overflow-y-auto pr-1">
            <p className="text-xs text-white/50 tracking-wider mb-3">
              Барлық 9 слайд-блок (бір бетте)
            </p>
            {SLIDE_BLOCKS.map((block, index) => {
              const isActive = activeBlockId === block.id;
              return (
                <a
                  key={block.id}
                  href={`#${block.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(block.id);
                  }}
                  style={{
                    transitionDelay: mobileMenuOpen
                      ? `${150 + index * 45}ms`
                      : '0ms',
                  }}
                  className={`block py-2.5 px-3 rounded-lg text-sm transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-6'
                  } ${
                    isActive
                      ? 'bg-white/12 text-white font-medium'
                      : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-white/45 font-mono tabular-nums mr-2">
                    0{block.number}.
                  </span>
                  <span>{block.shortLabel}</span>
                </a>
              );
            })}
          </div>

          <div
            style={{
              transitionDelay: mobileMenuOpen ? '450ms' : '0ms',
            }}
            className={`pt-4 border-t border-white/10 transition-all duration-300 ${
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShare();
              }}
              className="w-full bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow cursor-pointer"
            >
              Презентациямен бөлісу
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

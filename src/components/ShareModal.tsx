import React, { useState } from 'react';
import {
  SLIDE_BLOCKS,
  GLOBAL_STATS,
  CAUSE_BLOCKS,
  DANGER_REGIONS,
  SOLUTION_DIRECTIONS,
  CONCLUSION_CONTENT,
} from '../utils/hungerData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'none' | 'summary' | 'link'>(
    'none'
  );

  if (!isOpen) return null;

  const fullTextSummary = [
    `1-блок: ${SLIDE_BLOCKS[0].title}`,
    `2-блок (Статистика): ${GLOBAL_STATS.map((s) => `${s.value} — ${s.description}`).join(' | ')}`,
    ...CAUSE_BLOCKS.map(
      (c) =>
        `${c.blockNumber}-блок (${c.causeLabel}): ${c.title} — ${c.theses.map((t) => t.title).join(', ')}`
    ),
    `7-блок (Қауіпті аймақтар): ${DANGER_REGIONS.map((r) => r.title).join('; ')}`,
    `8-блок (Шешу жолдары): ${SOLUTION_DIRECTIONS.map((s) => s.title).join(', ')}`,
    `9-блок (Қорытынды): ${CONCLUSION_CONTENT.blockTitle} — ${CONCLUSION_CONTENT.quote}`,
  ].join('\n\n');

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(fullTextSummary);
    } catch {
      // Clipboard fallback
    }
    setCopiedType('summary');
    setTimeout(() => setCopiedType('none'), 3000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Clipboard fallback
    }
    setCopiedType('link');
    setTimeout(() => setCopiedType('none'), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-[#110d13] border border-white/15 p-6 md:p-8 text-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs text-white/55 mb-1">
              Бір беттік презентация түйіндемесі (1–9 блоктар)
            </p>
            <h2
              id="share-modal-title"
              className="font-instrument text-3xl text-white"
            >
              Презентациямен бөлісу және көшіру
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Терезені жабу"
            className="px-3 py-1.5 rounded-lg text-xs text-white/70 hover:text-white bg-white/10 cursor-pointer"
          >
            Жабу ✕
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto rounded-xl bg-black/50 border border-white/10 p-4 text-xs md:text-sm text-white/80 space-y-2.5 font-sans leading-relaxed">
          {SLIDE_BLOCKS.map((b) => (
            <div
              key={b.id}
              className="py-1.5 border-b border-white/5 last:border-none"
            >
              <span className="font-mono tabular-nums text-white/50 mr-2">
                0{b.number}.
              </span>
              <span className="font-medium text-white">{b.slideBadge}:</span>{' '}
              <span>{b.title}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-5 py-2.5 rounded-full text-xs md:text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            {copiedType === 'link'
              ? 'Сілтеме көшірілді ✓'
              : 'Сілтемені көшіру'}
          </button>
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-6 py-2.5 rounded-full text-xs md:text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors button-glow cursor-pointer"
          >
            {copiedType === 'summary'
              ? 'Барлық 9 блок мәтіні көшірілді ✓'
              : 'Толық конспектіні көшіру'}
          </button>
        </div>
      </div>
    </div>
  );
};

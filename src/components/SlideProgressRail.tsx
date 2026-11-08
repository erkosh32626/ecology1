import React from 'react';
import { SLIDE_BLOCKS } from '../utils/hungerData';

interface SlideProgressRailProps {
  activeBlockId: string;
  onSelectBlock: (blockId: string) => void;
}

export const SlideProgressRail: React.FC<SlideProgressRailProps> = ({
  activeBlockId,
  onSelectBlock,
}) => {
  return (
    <aside
      aria-label="Слайдтар тізімі (1–9 блоктар)"
      className="group/rail hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 flex-col gap-1.5 p-1.5 rounded-2xl bg-black/55 backdrop-blur-md border border-white/10"
    >
      {SLIDE_BLOCKS.map((block) => {
        const isActive = activeBlockId === block.id;
        return (
          <button
            key={block.id}
            type="button"
            onClick={() => onSelectBlock(block.id)}
            title={`${block.number}-блок: ${block.title}`}
            className={`flex items-center justify-end gap-0 group-hover/rail:gap-2 px-2 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isActive
                ? 'bg-white text-black font-medium'
                : 'text-white/55 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="font-mono tabular-nums">0{block.number}</span>
            <span className="overflow-hidden transition-all duration-200 max-w-0 opacity-0 group-hover/rail:max-w-[110px] group-hover/rail:opacity-100">
              {block.shortLabel}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

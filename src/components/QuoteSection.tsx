import React, { useEffect, useRef, useState } from 'react';
import {
  CONCLUSION_CONTENT,
  computeParallaxTargets,
  lerp,
} from '../utils/hungerData';

interface QuoteSectionProps {
  onScrollToTop: () => void;
  onOpenShare: () => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  onScrollToTop,
  onOpenShare,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rainbowRef = useRef<HTMLDivElement | null>(null);
  const leftCloudRef = useRef<HTMLDivElement | null>(null);
  const rightCloudRef = useRef<HTMLDivElement | null>(null);

  const [rainbowImgError, setRainbowImgError] = useState(false);
  const [cloudImgError, setCloudImgError] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const currentValues = {
      rainbowY: 120,
      leftCloudX: -200,
      rightCloudX: 200,
      cloudY: 0,
      cloudOpacity: 0,
    };

    const animate = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const targets = computeParallaxTargets(
          windowHeight,
          rect.top,
          rect.height
        );

        currentValues.rainbowY = lerp(
          currentValues.rainbowY,
          targets.rainbowY,
          0.06
        );
        currentValues.leftCloudX = lerp(
          currentValues.leftCloudX,
          targets.leftCloudX,
          0.04
        );
        currentValues.rightCloudX = lerp(
          currentValues.rightCloudX,
          targets.rightCloudX,
          0.04
        );
        currentValues.cloudY = lerp(currentValues.cloudY, targets.cloudY, 0.04);

        const maxDist = 200;
        const leftDist = Math.min(maxDist, Math.abs(currentValues.leftCloudX));
        const computedOpacity = Math.max(0, Math.min(1, 1 - leftDist / maxDist));
        currentValues.cloudOpacity = lerp(
          currentValues.cloudOpacity,
          computedOpacity,
          0.06
        );

        if (rainbowRef.current) {
          rainbowRef.current.style.transform = `translate3d(0, ${currentValues.rainbowY.toFixed(2)}px, 0)`;
        }

        if (leftCloudRef.current) {
          leftCloudRef.current.style.transform = `translate3d(${currentValues.leftCloudX.toFixed(2)}px, ${currentValues.cloudY.toFixed(2)}px, 0)`;
          leftCloudRef.current.style.opacity =
            currentValues.cloudOpacity.toFixed(3);
        }

        if (rightCloudRef.current) {
          rightCloudRef.current.style.transform = `translate3d(${currentValues.rightCloudX.toFixed(2)}px, ${currentValues.cloudY.toFixed(2)}px, 0) scaleX(-1)`;
          rightCloudRef.current.style.opacity =
            currentValues.cloudOpacity.toFixed(3);
        }
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="block-9"
      aria-labelledby="block-9-heading"
      style={{
        background:
          'linear-gradient(180deg, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
      className="relative w-full min-h-screen h-screen overflow-hidden flex items-center justify-center px-6 md:px-12"
    >
      {/* 1. Rainbow Layer */}
      <div
        ref={rainbowRef}
        style={{ transform: 'translate3d(0, 120px, 0)' }}
        className="absolute inset-x-0 top-0 z-30 pointer-events-none will-change-transform"
      >
        {!rainbowImgError ? (
          <img
            src={CONCLUSION_CONTENT.rainbowAssetUrl}
            alt="Аспан шұғыласы"
            referrerPolicy="no-referrer"
            onError={() => setRainbowImgError(true)}
            className="w-full h-auto object-cover opacity-90"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-b from-amber-300/15 via-sky-300/10 to-transparent blur-2xl" />
        )}
      </div>

      {/* 2. Left Cloud Layer */}
      <div
        ref={leftCloudRef}
        style={{
          marginLeft: '-15%',
          opacity: 0,
          transform: 'translate3d(-200px, 0px, 0)',
        }}
        className="hidden sm:block absolute left-0 bottom-[10%] z-10 w-[500px] md:w-[650px] pointer-events-none will-change-transform"
      >
        {!cloudImgError ? (
          <img
            src={CONCLUSION_CONTENT.cloudAssetUrl}
            alt="Сол жақ бұлт қабаты"
            referrerPolicy="no-referrer"
            onError={() => setCloudImgError(true)}
            className="w-full h-auto object-contain"
          />
        ) : (
          <div className="w-full h-56 rounded-full bg-white/15 blur-3xl" />
        )}
      </div>

      {/* 3. Right Cloud Layer */}
      <div
        ref={rightCloudRef}
        style={{
          marginRight: '-20%',
          opacity: 0,
          transform: 'translate3d(200px, 0px, 0) scaleX(-1)',
        }}
        className="hidden sm:block absolute right-0 bottom-[15%] z-10 w-[500px] md:w-[650px] pointer-events-none will-change-transform"
      >
        {!cloudImgError ? (
          <img
            src={CONCLUSION_CONTENT.cloudAssetUrl}
            alt="Оң жақ бұлт қабаты"
            referrerPolicy="no-referrer"
            onError={() => setCloudImgError(true)}
            className="w-full h-auto object-contain"
          />
        ) : (
          <div className="w-full h-56 rounded-full bg-white/15 blur-3xl" />
        )}
      </div>

      {/* 4. Quote & Conclusion Content (Block 9) */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-6 py-8 rounded-3xl bg-[#010A17]/25 backdrop-blur-[2px]">
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/85 tracking-wide mb-4 drop-shadow-[0_2px_8px_rgba(1,10,23,0.8)]">
          <span className="font-mono tabular-nums">09 / 09</span>
          <span aria-hidden="true">·</span>
          <span>9-блок (Слайд): Қорытынды (Үндеу)</span>
        </div>

        <h2
          id="block-9-heading"
          className="text-lg sm:text-xl md:text-2xl font-medium text-white tracking-wide mb-6 drop-shadow-[0_2px_10px_rgba(1,10,23,0.85)]"
        >
          {CONCLUSION_CONTENT.blockTitle}
        </h2>

        <blockquote className="font-instrument text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.4] md:leading-[1.45] text-glow drop-shadow-[0_2px_14px_rgba(1,10,23,0.9)]">
          {CONCLUSION_CONTENT.quote}
        </blockquote>

        <p className="mt-6 md:mt-8 text-white/95 text-sm md:text-base tracking-wide drop-shadow-[0_2px_10px_rgba(1,10,23,0.9)]">
          Dr. Mia Callahan — Serene Foundation · {CONCLUSION_CONTENT.attribution}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onScrollToTop}
            className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow whitespace-nowrap shrink-0 cursor-pointer"
          >
            ↑ {CONCLUSION_CONTENT.buttonPrimary}
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            className="px-8 py-3.5 rounded-full font-medium text-sm tracking-wide text-white bg-black/35 hover:bg-black/50 border border-white/30 backdrop-blur-md transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {CONCLUSION_CONTENT.buttonSecondary} / Конспектіні көшіру
          </button>
        </div>
      </div>
    </section>
  );
};

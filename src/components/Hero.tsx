import React, { useState, useRef, useEffect } from 'react';
import { HERO_CONTENT } from '../utils/hungerData';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [soundActive, setSoundActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleSound = () => {
    if (!soundActive) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current && AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm drone
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3 fifth

          gain.gain.setValueAtTime(0.015, ctx.currentTime);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();

          audioCtxRef.current = ctx;
          gainNodeRef.current = gain;
        } else if (audioCtxRef.current && gainNodeRef.current) {
          audioCtxRef.current.resume().catch(() => {});
          gainNodeRef.current.gain.setTargetAtTime(
            0.015,
            audioCtxRef.current.currentTime,
            0.2
          );
        }
      } catch {
        // Fallback if Web Audio is blocked
      }
      setSoundActive(true);
    } else {
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.2
        );
      }
      setSoundActive(false);
    }
  };

  return (
    <section
      id="block-1"
      aria-labelledby="hero-heading"
      className="relative w-full min-h-screen h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_CONTENT.videoUrl}
      />

      {/* Dark Overlay Scrim */}
      <div className="absolute inset-0 bg-black/35 bg-gradient-to-b from-black/50 via-black/25 to-[#0a0608]" />

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto -mt-[40px] md:-mt-[60px] text-center">
        <div className="flex items-center gap-2 text-xs md:text-sm text-white/75 tracking-wide mb-5">
          <span>1-блок (Слайд)</span>
          <span aria-hidden="true">·</span>
          <span>Басты бет (Титул)</span>
          <span aria-hidden="true">·</span>
          <span>Жаһандық зерттеу</span>
        </div>

        <h1
          id="hero-heading"
          style={{ textWrap: 'balance' }}
          className="font-instrument text-white text-[34px] sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.02] tracking-tight text-center text-glow"
        >
          {HERO_CONTENT.title}
        </h1>

        <p className="text-white/80 text-sm sm:text-base md:text-lg text-center mt-5 md:mt-7 max-w-2xl leading-relaxed">
          {HERO_CONTENT.subtitle}
        </p>

        <div className="mt-7 md:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreClick}
            className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow whitespace-nowrap shrink-0 cursor-pointer"
          >
            {HERO_CONTENT.ctaText}
          </button>
        </div>
      </div>

      {/* Sound Indicator (Desktop Only, bottom-left corner) */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundActive}
        aria-label="Атмосфералық дыбысты қосу немесе өшіру"
        className="hidden md:flex items-center gap-3.5 absolute bottom-8 left-8 z-20 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full pr-3"
      >
        <span className="w-10 h-10 rounded-full border border-white/25 group-hover:border-white/50 flex items-center justify-center transition-colors bg-black/25 backdrop-blur-xs">
          {soundActive ? (
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-white animate-pulse" />
              <span className="w-0.5 h-2 bg-white animate-pulse" />
              <span className="w-0.5 h-3.5 bg-white animate-pulse" />
            </span>
          ) : (
            <span className="w-3.5 h-[1.5px] bg-white/80 block" />
          )}
        </span>
        <span className="text-white/65 group-hover:text-white/90 text-xs leading-tight transition-colors">
          <span className="block">Experience</span>
          <span className="block">
            {soundActive ? 'sound active' : 'with sound'}
          </span>
        </span>
      </button>

      {/* Bottom-right Slide Indicator */}
      <div className="hidden md:flex items-center gap-3 absolute bottom-8 right-8 z-20 text-xs text-white/60 font-mono tabular-nums">
        <span>01 / 09 SLIDE</span>
        <span aria-hidden="true">·</span>
        <span>БІР БЕТТІК ФОРМАТ</span>
      </div>
    </section>
  );
};

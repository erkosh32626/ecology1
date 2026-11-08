import React, { useState } from 'react';
import { DANGER_REGIONS, DangerRegion } from '../utils/hungerData';

export const DangerMapSection: React.FC = () => {
  const [activeRegionId, setActiveRegionId] =
    useState<DangerRegion['id']>('africa');

  const activeRegion =
    DANGER_REGIONS.find((r) => r.id === activeRegionId) || DANGER_REGIONS[0];

  return (
    <section
      id="block-7"
      aria-labelledby="block-7-heading"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 flex items-center justify-center border-t border-white/10 bg-gradient-to-b from-[#0a0608] via-[#100b12] to-[#0a0608]"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
              <span className="font-mono tabular-nums">07 / 09</span>
              <span aria-hidden="true">·</span>
              <span>7-блок (Слайд): Ең қауіпті аймақтар (География)</span>
            </div>
            <h2
              id="block-7-heading"
              className="font-instrument text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight"
            >
              Қауіпті аймақтар картасы
            </h2>
          </div>
          <p className="text-white/65 text-sm md:text-base max-w-md leading-relaxed">
            Құрғақшылық, қарулы қақтығыстар және экономикалық күйзеліс қатар
            келген әлемдегі үш негізгі гуманитарлық дағдарыс белдеуі.
          </p>
        </div>

        {/* Interactive Map + Region Selector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Region Cards (All 3 regions visible + interactive) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {DANGER_REGIONS.map((region, idx) => {
              const isSelected = region.id === activeRegionId;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveRegionId(region.id)}
                  className={`text-left rounded-2xl p-6 transition-all duration-300 liquid-glass cursor-pointer ${
                    isSelected
                      ? 'ring-1 ring-white/50 bg-white/[0.08]'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-white/55 mb-2">
                    <span>0{idx + 1}. Аймақ</span>
                    <span className="font-mono tabular-nums text-white/80">
                      ~{region.affectedMillions} млн адам зардап шегуде
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                    {region.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {region.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive World Risk Map SVG & Active Region Telemetry */}
          <div className="lg:col-span-7 rounded-2xl p-6 md:p-8 bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs text-white/55">Таңдалған дағдарыс ошағы</p>
                <h3 className="text-lg md:text-xl font-medium text-white">
                  {activeRegion.title}
                </h3>
              </div>
              <div className="text-right font-mono tabular-nums">
                <span className="text-xs text-white/55 block">Қауіп деңгейі</span>
                <span className="text-sm text-amber-300">
                  {activeRegion.severityLevel}
                </span>
              </div>
            </div>

            {/* Stylized World Map SVG */}
            <div className="relative w-full aspect-[16/9] rounded-xl bg-[#070910] border border-white/10 overflow-hidden flex items-center justify-center">
              <svg
                viewBox="0 0 900 440"
                className="w-full h-full"
                role="img"
                aria-label="Әлемдегі аштық қаупі жоғары аймақтар картасы"
              >
                {/* Subtle latitude/longitude grid */}
                <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                  <line x1="0" y1="110" x2="900" y2="110" />
                  <line x1="0" y1="220" x2="900" y2="220" />
                  <line x1="0" y1="330" x2="900" y2="330" />
                  <line x1="225" y1="0" x2="225" y2="440" />
                  <line x1="450" y1="0" x2="450" y2="440" />
                  <line x1="675" y1="0" x2="675" y2="440" />
                </g>

                {/* Simplified Continental Silhouettes */}
                <g fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)" strokeWidth="1">
                  {/* North & Central America */}
                  <path d="M110,70 L250,65 L295,140 L265,215 L295,245 L245,250 L195,195 L130,145 Z" />
                  {/* South America */}
                  <path d="M275,255 L345,275 L365,345 L320,415 L285,390 L265,305 Z" />
                  {/* Europe */}
                  <path d="M430,75 L555,65 L575,135 L515,155 L440,145 Z" />
                  {/* Africa */}
                  <path d="M435,170 L545,165 L605,235 L595,310 L545,385 L495,365 L475,280 L430,235 Z" />
                  {/* Middle East & Asia */}
                  <path d="M555,140 L785,85 L825,185 L765,265 L675,255 L580,225 L555,175 Z" />
                  {/* Australia */}
                  <path d="M720,315 L815,310 L825,375 L740,385 Z" />
                </g>

                {/* Danger Region Ellipses */}
                {DANGER_REGIONS.map((region) => {
                  const isActive = region.id === activeRegionId;
                  return (
                    <g
                      key={region.id}
                      onClick={() => setActiveRegionId(region.id)}
                      className="cursor-pointer"
                    >
                      <ellipse
                        cx={region.coordinates.cx}
                        cy={region.coordinates.cy}
                        rx={region.coordinates.rx}
                        ry={region.coordinates.ry}
                        fill={
                          isActive
                            ? 'rgba(251, 191, 36, 0.22)'
                            : 'rgba(255, 255, 255, 0.06)'
                        }
                        stroke={
                          isActive
                            ? 'rgba(251, 191, 36, 0.85)'
                            : 'rgba(255, 255, 255, 0.25)'
                        }
                        strokeWidth={isActive ? '2' : '1'}
                        strokeDasharray={isActive ? 'none' : '4 4'}
                      />
                    </g>
                  );
                })}

                {/* Country Pins for Active Region */}
                {activeRegion.countryPins.map((pin) => (
                  <g key={pin.name}>
                    <line
                      x1={pin.x}
                      y1={pin.y}
                      x2={pin.x + (pin.labelDx < 0 ? -8 : 10)}
                      y2={pin.y + pin.labelDy + 11}
                      stroke="rgba(251, 191, 36, 0.65)"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="5"
                      fill="#fbbf24"
                      stroke="#0a0608"
                      strokeWidth="2"
                    />
                    <rect
                      x={pin.x + pin.labelDx}
                      y={pin.y + pin.labelDy}
                      width="118"
                      height="22"
                      rx="4"
                      fill="rgba(10, 6, 8, 0.92)"
                      stroke="rgba(251, 191, 36, 0.45)"
                    />
                    <text
                      x={pin.x + pin.labelDx + 7}
                      y={pin.y + pin.labelDy + 14.5}
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                    >
                      {pin.name} · {pin.acuteMillions}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom Details of Active Region */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/70">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/50">Негізгі факторлар:</span>
                {activeRegion.primaryDrivers.map((driver, idx) => (
                  <React.Fragment key={driver}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span className="text-white/90">{driver}</span>
                  </React.Fragment>
                ))}
              </div>
              <div className="font-mono tabular-nums text-white/90 shrink-0">
                Негізгі елдер: {activeRegion.countries}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

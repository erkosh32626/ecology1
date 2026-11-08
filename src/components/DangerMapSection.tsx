import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  DANGER_REGIONS,
  DangerRegion,
  DangerCountryPin,
} from '../utils/hungerData';

type MapTileStyle = 'dark' | 'satellite' | 'topo';

const TILE_LAYERS: Record<
  MapTileStyle,
  { url: string; labelUrl?: string; attribution: string; label: string }
> = {
  dark: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    labelUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap',
    label: 'Түнгі карта',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    labelUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
    label: 'Спутник',
  },
  topo: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    label: 'Стандартты',
  },
};

const ISO_TO_PIN_NAME: Record<string, string> = {
  SDN: 'Судан',
  SOM: 'Сомали',
  TCD: 'Чад',
  YEM: 'Йемен',
  AFG: 'Ауғанстан',
  SYR: 'Сирия',
  HTI: 'Гаити',
  GTM: 'Гватемала',
  HND: 'Гондурас',
};

export const DangerMapSection: React.FC = () => {
  const [activeRegionId, setActiveRegionId] =
    useState<DangerRegion['id']>('africa');
  const [selectedCountry, setSelectedCountry] =
    useState<DangerCountryPin | null>(DANGER_REGIONS[0].countryPins[0]);
  const [tileStyle, setTileStyle] = useState<MapTileStyle>('dark');
  const [isWorldOverview, setIsWorldOverview] = useState<boolean>(false);
  const [worldGeoJson, setWorldGeoJson] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileGroupRef = useRef<L.LayerGroup | null>(null);
  const overlaysGroupRef = useRef<L.LayerGroup | null>(null);

  const activeRegion =
    DANGER_REGIONS.find((r) => r.id === activeRegionId) || DANGER_REGIONS[0];

  // Fetch high-precision world country borders GeoJSON
  useEffect(() => {
    let active = true;
    fetch(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && data.type === 'FeatureCollection') {
          setWorldGeoJson(data);
        }
      })
      .catch(() => {
        // Fallback uses built-in country polygons
      });
    return () => {
      active = false;
    };
  }, []);

  // Initialize real Leaflet map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: activeRegion.mapCenter,
      zoom: activeRegion.mapZoom,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const baseTileGroup = L.layerGroup().addTo(map);
    const overlaysGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    baseTileGroupRef.current = baseTileGroup;
    overlaysGroupRef.current = overlaysGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch tile style when user clicks Түнгі карта / Спутник / Стандартты
  useEffect(() => {
    const baseGroup = baseTileGroupRef.current;
    if (!baseGroup) return;

    baseGroup.clearLayers();
    const cfg = TILE_LAYERS[tileStyle];

    L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: 18,
    }).addTo(baseGroup);

    if (cfg.labelUrl) {
      L.tileLayer(cfg.labelUrl, {
        maxZoom: 18,
        opacity: 0.85,
      }).addTo(baseGroup);
    }
  }, [tileStyle]);

  // Render exact country borders and interactive hotspot markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = overlaysGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // Build lookup of crisis countries
    const pinByName = new Map<
      string,
      { region: DangerRegion; pin: DangerCountryPin }
    >();
    DANGER_REGIONS.forEach((region) => {
      region.countryPins.forEach((pin) => {
        pinByName.set(pin.name, { region, pin });
      });
    });

    const renderedGeoJsonNames = new Set<string>();

    // Render exact GeoJSON country shapes if loaded
    if (worldGeoJson) {
      L.geoJSON(worldGeoJson, {
        filter: (feature) => {
          const iso = feature.id as string;
          return Boolean(iso && ISO_TO_PIN_NAME[iso]);
        },
        style: (feature) => {
          const iso = feature?.id as string;
          const pinName = ISO_TO_PIN_NAME[iso];
          const entry = pinName ? pinByName.get(pinName) : undefined;
          if (!entry) return {};
          renderedGeoJsonNames.add(pinName);

          const isRegionActive =
            isWorldOverview || entry.region.id === activeRegionId;
          const isPinSelected = selectedCountry?.name === entry.pin.name;

          return {
            color: isPinSelected
              ? '#ffffff'
              : isRegionActive
                ? entry.region.accentHex
                : 'rgba(255,255,255,0.35)',
            weight: isPinSelected ? 2.5 : isRegionActive ? 1.8 : 1,
            fillColor: entry.region.accentHex,
            fillOpacity: isPinSelected ? 0.48 : isRegionActive ? 0.28 : 0.1,
          };
        },
        onEachFeature: (feature, layer) => {
          const iso = feature.id as string;
          const pinName = ISO_TO_PIN_NAME[iso];
          const entry = pinName ? pinByName.get(pinName) : undefined;
          if (!entry) return;

          layer.on('click', () => {
            setIsWorldOverview(false);
            setActiveRegionId(entry.region.id);
            setSelectedCountry(entry.pin);
            map.flyTo([entry.pin.lat, entry.pin.lng], 5, { duration: 1.0 });
          });
        },
      }).addTo(group);
    }

    // Render markers (and fallback polygons if GeoJSON wasn't loaded for a country)
    DANGER_REGIONS.forEach((region) => {
      const isRegionActive =
        isWorldOverview || region.id === activeRegionId;

      region.countryPins.forEach((pin) => {
        const isPinSelected = selectedCountry?.name === pin.name;

        if (!renderedGeoJsonNames.has(pin.name)) {
          const poly = L.polygon(pin.polygon, {
            color: isPinSelected
              ? '#ffffff'
              : isRegionActive
                ? region.accentHex
                : 'rgba(255,255,255,0.3)',
            weight: isPinSelected ? 2.5 : isRegionActive ? 1.8 : 1,
            fillColor: region.accentHex,
            fillOpacity: isPinSelected ? 0.42 : isRegionActive ? 0.24 : 0.08,
          });

          poly.on('click', () => {
            setIsWorldOverview(false);
            setActiveRegionId(region.id);
            setSelectedCountry(pin);
            map.flyTo([pin.lat, pin.lng], 5, { duration: 1.0 });
          });

          poly.addTo(group);
        }

        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: isPinSelected ? 8 : 6,
          color: '#0a0608',
          weight: 2,
          fillColor: isPinSelected ? '#ffffff' : region.accentHex,
          fillOpacity: 1,
        });

        marker.bindTooltip(`${pin.name} · ${pin.acuteMillions}`, {
          permanent: isRegionActive,
          direction: 'top',
          offset: [0, -8],
          className: 'crisis-country-tooltip',
        });

        marker.bindPopup(
          `<div style="min-width:190px;font-family:Inter,sans-serif;">
            <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:2px;">Астанасы: ${pin.capital}</div>
            <div style="font-size:15px;font-weight:600;color:#fff;margin-bottom:4px;">${pin.name} — ${pin.acuteMillions}</div>
            <div style="font-size:11px;color:#fbbf24;margin-bottom:6px;">${pin.ipcPhase}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.85);line-height:1.35;">${pin.mainDriver}</div>
          </div>`
        );

        marker.on('click', () => {
          setIsWorldOverview(false);
          setActiveRegionId(region.id);
          setSelectedCountry(pin);
        });

        marker.addTo(group);
      });
    });
  }, [activeRegionId, selectedCountry, isWorldOverview, worldGeoJson]);

  const handleSelectRegion = (region: DangerRegion) => {
    setIsWorldOverview(false);
    setActiveRegionId(region.id);
    setSelectedCountry(region.countryPins[0]);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(region.mapCenter, region.mapZoom, {
        duration: 1.1,
      });
    }
  };

  const handleSelectCountryChip = (
    region: DangerRegion,
    pin: DangerCountryPin
  ) => {
    setIsWorldOverview(false);
    setActiveRegionId(region.id);
    setSelectedCountry(pin);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([pin.lat, pin.lng], 5, {
        duration: 1.0,
      });
    }
  };

  const handleWorldOverview = () => {
    setIsWorldOverview(true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([18.0, 12.0], 2, { duration: 1.1 });
    }
  };

  return (
    <section
      id="block-7"
      aria-labelledby="block-7-heading"
      className="relative w-full lg:h-screen lg:max-h-screen py-16 lg:py-0 lg:pt-20 lg:pb-8 px-6 md:px-12 xl:pr-20 flex items-center justify-center border-t border-white/10 bg-gradient-to-b from-[#0a0608] via-[#100b12] to-[#0a0608] overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-between h-full max-h-[820px]">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
              <span className="font-mono tabular-nums">07 / 09</span>
              <span aria-hidden="true">·</span>
              <span>7-блок (Слайд): Ең қауіпті аймақтар (География)</span>
            </div>
            <h2
              id="block-7-heading"
              className="font-instrument text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight"
            >
              Қауіпті аймақтар картасы
            </h2>
          </div>

          {/* Map Layer & World Overview Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleWorldOverview}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                isWorldOverview
                  ? 'bg-white text-black border-white'
                  : 'bg-white/[0.06] text-white/80 border-white/15 hover:text-white'
              }`}
            >
              Әлемдік шолу (Барлық 3 аймақ)
            </button>

            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/[0.05] border border-white/10">
              {(Object.keys(TILE_LAYERS) as MapTileStyle[]).map((styleKey) => (
                <button
                  key={styleKey}
                  type="button"
                  onClick={() => setTileStyle(styleKey)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    tileStyle === styleKey
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {TILE_LAYERS[styleKey].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Map + Region Selector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0">
          {/* Left: 3 Region Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3 min-h-0">
            {DANGER_REGIONS.map((region, idx) => {
              const isSelected = !isWorldOverview && region.id === activeRegionId;
              return (
                <div
                  key={region.id}
                  onClick={() => handleSelectRegion(region)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectRegion(region);
                    }
                  }}
                  className={`text-left rounded-2xl p-4 lg:p-5 transition-all duration-300 liquid-glass cursor-pointer flex flex-col justify-between flex-1 ${
                    isSelected
                      ? 'ring-1 ring-white/55 bg-white/[0.08]'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/55 mb-1">
                      <span>0{idx + 1}. Географиялық белдеу</span>
                      <span className="font-mono tabular-nums text-amber-300">
                        ~{region.affectedMillions} млн адам
                      </span>
                    </div>
                    <h3 className="text-base lg:text-lg font-medium text-white mb-1 leading-snug">
                      {region.title}
                    </h3>
                    <p className="text-white/75 text-xs lg:text-sm leading-relaxed">
                      {region.description}
                    </p>
                  </div>

                  {/* Quick Country Jump Buttons */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                    {region.countryPins.map((pin) => {
                      const isCountryActive =
                        selectedCountry?.name === pin.name && !isWorldOverview;
                      return (
                        <button
                          key={pin.name}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCountryChip(region, pin);
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-mono tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            isCountryActive
                              ? 'bg-white text-black font-medium'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          {pin.name} ({pin.acuteMillions})
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Real Interactive Leaflet World Map & Active Country Details */}
          <div className="lg:col-span-7 rounded-2xl p-4 lg:p-5 bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[380px] lg:min-h-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 shrink-0">
              <div>
                <p className="text-xs text-white/55">
                  Шынайы интерактивті географиялық карта (Leaflet GIS)
                </p>
                <h3 className="text-base lg:text-lg font-medium text-white">
                  {isWorldOverview
                    ? 'Әлемдегі барлық 3 аштық белдеуі'
                    : activeRegion.title}
                </h3>
              </div>
              <div className="text-right font-mono tabular-nums">
                <span className="text-xs text-white/55 block">Қауіп деңгейі</span>
                <span className="text-xs lg:text-sm text-amber-300">
                  {activeRegion.severityLevel}
                </span>
              </div>
            </div>

            {/* Real Leaflet Map Container */}
            <div className="relative w-full flex-1 min-h-[260px] rounded-xl overflow-hidden border border-white/15 bg-[#060911]">
              <div
                ref={mapContainerRef}
                data-testid="real-world-hunger-map"
                className="w-full h-full z-10"
              />
            </div>

            {/* Selected Country / Region Footer Details */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white/75 shrink-0">
              {selectedCountry ? (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white font-medium">
                      {selectedCountry.name} ({selectedCountry.capital}):
                    </span>
                    <span className="text-amber-300 font-mono tabular-nums">
                      {selectedCountry.acuteMillions} жедел тапшылықта
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedCountry.mainDriver}</span>
                  </div>
                  <span className="font-mono tabular-nums text-white/60 whitespace-nowrap shrink-0">
                    Координата: {selectedCountry.lat.toFixed(1)}°,{' '}
                    {selectedCountry.lng.toFixed(1)}°
                  </span>
                </>
              ) : (
                <div>Аймақты немесе мемлекетті картадан таңдаңыз</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

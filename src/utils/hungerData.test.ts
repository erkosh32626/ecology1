import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SLIDE_BLOCKS,
  GLOBAL_STATS,
  CAUSE_BLOCKS,
  DANGER_REGIONS,
  SOLUTION_DIRECTIONS,
  CONCLUSION_CONTENT,
  clamp,
  lerp,
  computeParallaxTargets,
  calculateSolutionImpact,
} from './hungerData';

test('all 9 presentation blocks exist in sequential order on a single page model', () => {
  assert.equal(SLIDE_BLOCKS.length, 9);
  assert.deepEqual(
    SLIDE_BLOCKS.map((b) => b.number),
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  assert.equal(
    SLIDE_BLOCKS[0].title,
    'Әлемдегі аштық мәселесі және азық-түлік тапшылығының себептері'
  );
  assert.equal(SLIDE_BLOCKS[8].title, 'Азық-түлік — адамның негізгі құқығы');
});

test('global statistics match exact Kazakh indicators (735M, 1/3, 3.1B)', () => {
  assert.equal(GLOBAL_STATS.length, 3);
  assert.equal(GLOBAL_STATS[0].value, '~735 миллион адам');
  assert.equal(GLOBAL_STATS[1].value, '1/3 бөлігі');
  assert.equal(GLOBAL_STATS[2].value, '3.1 миллиард адам');
});

test('all 4 causes, 3 geographic danger regions with real GIS coordinates/polygons, and 4 solution directions are complete', () => {
  assert.equal(CAUSE_BLOCKS.length, 4);
  assert.equal(DANGER_REGIONS.length, 3);
  for (const region of DANGER_REGIONS) {
    assert.equal(region.mapCenter.length, 2);
    assert.ok(region.countryPins.length >= 3);
    for (const pin of region.countryPins) {
      assert.ok(pin.lat >= -90 && pin.lat <= 90);
      assert.ok(pin.lng >= -180 && pin.lng <= 180);
      assert.ok(pin.polygon.length >= 5);
    }
  }
  assert.equal(SOLUTION_DIRECTIONS.length, 4);
  assert.ok(CONCLUSION_CONTENT.quote.includes('әділ экономика құру'));
});

test('parallax math clamps progress and computes rainbow and cloud targets accurately', () => {
  assert.equal(clamp(0, 1, -0.5), 0);
  assert.equal(clamp(0, 1, 1.5), 1);
  assert.equal(lerp(0, 100, 0.06), 6);

  // Before entering view (progress = 0)
  const before = computeParallaxTargets(1000, 1000, 1000);
  assert.equal(before.progress, 0);
  assert.equal(before.rainbowY, 120);
  assert.equal(before.leftCloudX, -200);
  assert.equal(before.rightCloudX, 200);

  // Mid-scroll (progress = 0.5)
  const mid = computeParallaxTargets(1000, 0, 1000);
  assert.equal(mid.progress, 0.5);
  assert.equal(mid.rainbowY, -20);
  assert.equal(mid.leftCloudX, 0);
  assert.equal(mid.rightCloudX, 0);
  assert.equal(mid.cloudY, -25);
});

test('solution impact calculator aggregates hunger reduction across selected levers', () => {
  const allIds = SOLUTION_DIRECTIONS.map((s) => s.id);
  const fullImpact = calculateSolutionImpact(allIds, 100);
  assert.equal(fullImpact.activeCount, 4);
  assert.equal(fullImpact.totalSavedMillions, 735);
  assert.equal(fullImpact.remainingHungryMillions, 0);
  assert.equal(fullImpact.reliefPercentage, 100);

  const partialImpact = calculateSolutionImpact(['smart-agro'], 50);
  assert.equal(partialImpact.activeCount, 1);
  assert.equal(partialImpact.totalSavedMillions, 105);
  assert.equal(partialImpact.remainingHungryMillions, 630);
});

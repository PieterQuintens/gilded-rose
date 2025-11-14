import {
  buildItem,
  runSimulation,
  buildAgedBrieItem,
  buildSulfurasItem,
  buildBackStagePassItem,
  buildConjuredItem,
} from './gilded-rose.helpers';

describe('Gilded Rose Item', () => {
  it('Quality decreases as it aproaches the sell by date', () => {
    const item = buildItem({
      sellIn: 20,
      quality: 20,
    });
    runSimulation([item]);

    expect(item.sellIn).toBe(19);
    expect(item.quality).toBe(19);
  });

  it('Quality decreases twice as fast past the sell by date', () => {
    const item = buildItem({
      sellIn: 5,
      quality: 40,
    });
    // first 5 iterations => -5
    runSimulation([item], 5);

    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(35);

    // last 5 iterations => -10
    runSimulation([item], 5);

    expect(item.sellIn).toBe(-5);
    expect(item.quality).toBe(25);
  });

  it('Quality cannot be negative', () => {
    const item = buildItem({
      sellIn: 5,
      quality: 5,
    });
    runSimulation([item], 10);

    expect(item.sellIn).toBe(-5);
    expect(item.quality).toBe(0);
  });

  it('Aged Brie increases in quality the older it gets', () => {
    const item = buildAgedBrieItem({
      quality: 5,
    });
    runSimulation([item], 10);

    expect(item.quality).toBeGreaterThan(5);
  });

  it('Quality never passes 50', () => {
    const item = buildAgedBrieItem({
      quality: 46,
    });
    runSimulation([item], 20);

    expect(item.quality).toBe(50);
  });

  it('Sulfuras never decreases in quality', () => {
    const sulfurasItem = buildSulfurasItem();
    const regularItem = buildItem();

    const sulfurasBeforeSimulation = sulfurasItem.quality;
    const regularItemBeforeSimulation = regularItem.quality;

    runSimulation([sulfurasItem, regularItem], 10);

    expect(sulfurasItem.quality).toBe(sulfurasBeforeSimulation);
    expect(regularItem.quality).not.toBe(regularItemBeforeSimulation);
  });

  it("Sulfuras never has to be sold (sellIn date doesn't change)", () => {
    const sulfuras = buildSulfurasItem();
    const regular = buildItem();

    const sulfurasSellInBefore = sulfuras.sellIn;
    const regularSellInBefore = regular.sellIn;

    runSimulation([sulfuras, regular], 10);

    expect(sulfuras.sellIn).toBe(sulfurasSellInBefore);
    expect(regular.sellIn).not.toBe(regularSellInBefore);
  });

  describe('Backstage Passes increase in quality the older it gets', () => {
    it('By 1 when more then 10 days', () => {
      const item = buildBackStagePassItem({ sellIn: 20, quality: 10 });

      runSimulation([item], 10);

      expect(item.quality).toBe(20);
    });

    it('By 2 when between 10 and 5 days', () => {
      const item = buildBackStagePassItem({ sellIn: 10, quality: 10 });

      runSimulation([item], 5);

      expect(item.quality).toBe(20);
    });

    it('By 3 when between 5 and 0 days', () => {
      const item = buildBackStagePassItem({ sellIn: 5, quality: 10 });

      runSimulation([item], 5);

      expect(item.quality).toBe(25);
    });

    it('Quality drops to 0 after concert', () => {
      const item = buildBackStagePassItem({ sellIn: 5, quality: 10 });

      runSimulation([item], 10);

      expect(item.quality).toBe(0);
    });
  });

  it('Conjured degrades in quality twice as fast as normal items', () => {
    const item = buildConjuredItem({ quality: 35 });

    runSimulation([item], 5);

    expect(item.quality).toBe(25);
  });

  it('Conjured degrades in quality twice as fast as normal items, sellIn below 0', () => {
    const item = buildConjuredItem({ quality: 35, sellIn: 2 });

    runSimulation([item], 2);
    // Should -4
    expect(item.quality).toBe(31);

    runSimulation([item], 2);
    // Should -8
    expect(item.quality).toBe(23);
  });
});

import { Item, GildedRose } from '@/gilded-rose';
import { ItemTestCase } from 'test/item-test-case.interface';

const runSimulation = (testCase: ItemTestCase): Item => {
  const item = new Item(
    testCase.name,
    testCase.startSellIn,
    testCase.startQuality
  );

  const gildedRose = new GildedRose([item]);

  for (let i = 0; i < testCase.iterations; i++) {
    gildedRose.updateQuality();
  }

  return item;
};

describe('Gilded Rose Item', () => {
  it('Quality decreases as it aproaches the sell by date', () => {
    const testCase: ItemTestCase = {
      name: 'foo',
      startSellIn: 20,
      startQuality: 20,
      endSellIn: 19,
      endQuality: 19,
      iterations: 1,
    };
    const item = runSimulation(testCase);

    expect(item.sellIn).toBe(testCase.endSellIn);
    expect(item.quality).toBe(testCase.endQuality);
  });

  it.todo('Quality decreases twice as fast past the sell by date');

  it.todo('Quality cannot be negative');

  it.todo('Aged Brie increases in quality the older it gets');

  it.todo('Quality never passes 50');

  it.todo('Sulfuras never decreases in quality');

  it.todo("Sulfuras never has to be sold (sellIn date doesn't change)");

  describe('Backstage Passes increase in quality the older it gets', () => {
    it.todo('By 1 when more then 10 days');

    it.todo('By 2 when between 10 and 5 days');

    it.todo('By 3 when between 5 and 0 days');

    it.todo('Quality drops to 0 after concert');
  });

  it.todo('Conjured degrades in quality twice as fast as normal items');
});

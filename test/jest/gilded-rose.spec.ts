import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Quality of item decreases as it aproaches sell by date', () => {
    const item = new Item('foo', 20, 20);
    const gildedRose = new GildedRose([item]);
    gildedRose.updateQuality();

    expect(item.sellIn).toBe(19);
    expect(item.quality).toBe(19);
  });
});

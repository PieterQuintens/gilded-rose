import { Item, GildedRose } from '@/gilded-rose';

export const buildItem = (item?: Partial<Item>) =>
  new Item(item?.name ?? 'foo', item?.sellIn ?? 25, item?.quality ?? 25);

export const buildSulfurasItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: 'Sulfuras, Hand of Ragnaros' });

export const buildAgedBrieItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: 'Aged Brie' });

export const buildBackStagePassItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: 'Backstage passes to a TAFKAL80ETC concert' });

export const buildConjuredItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: 'Conjured' });

export const runSimulation = (
  items: Item[],
  iterations: number = 1
): Item[] => {
  const gildedRose = new GildedRose(items);

  for (let i = 0; i < iterations; i++) {
    gildedRose.updateQuality();
  }

  return items;
};

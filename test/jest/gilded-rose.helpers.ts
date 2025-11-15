import { Item, GildedRose, SpecialCaseItemNames } from '@/gilded-rose';

export const buildItem = (item?: Partial<Item>) =>
  new Item(item?.name ?? 'foo', item?.sellIn ?? 25, item?.quality ?? 25);

export const buildSulfurasItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: SpecialCaseItemNames.SULFURAS });

export const buildAgedBrieItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: SpecialCaseItemNames.AGED_BRIE });

export const buildBackStagePassItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: SpecialCaseItemNames.BACKSTAGE_PASSES });

export const buildConjuredItem = (item?: Partial<Item>) =>
  buildItem({ ...item, name: `${SpecialCaseItemNames.CONJURED} foo` });

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

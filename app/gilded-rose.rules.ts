import { Item } from './gilded-rose';

const MAX_QUALITY_LEVEL = 50;

export enum SpecialCaseItemNames {
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED = 'Conjured',
}
const itemIsExpired = (item: Item): boolean => {
  return item.sellIn <= 0;
};

const itemIsConjured = (item: Item): boolean => {
  return item.name.startsWith(SpecialCaseItemNames.CONJURED);
};

const increaseItemQuality = (item: Item, amount: number = 1): Item => {
  const inceaseAmount = itemIsExpired(item) ? amount * 2 : amount;
  item.quality = Math.min(MAX_QUALITY_LEVEL, item.quality + inceaseAmount);

  return item;
};

const decreaseItemQuality = (item: Item, amount: number = 1): Item => {
  const decreaseAmount = itemIsExpired(item) ? amount * 2 : amount;
  item.quality = Math.max(0, item.quality - decreaseAmount);

  return item;
};

const decreaseItemSellIn = (item: Item, decrease: number = 1): Item => {
  item.sellIn -= decrease;

  return item;
};

const updateBackstagePass = (item: Item): Item => {
  if (itemIsExpired(item)) {
    item.quality = 0;

    return item;
  }
  const increaseAmount = item.sellIn > 10 ? 1 : item.sellIn > 5 ? 2 : 3;
  item.quality = Math.min(MAX_QUALITY_LEVEL, item.quality + increaseAmount);

  return item;
};

const noItemUpdates: ReadonlySet<string> = new Set([
  SpecialCaseItemNames.SULFURAS.toString(),
]);

const customItemUpdates: Record<string, (item: Item) => Item> = {
  [SpecialCaseItemNames.AGED_BRIE]: (item: Item): Item =>
    increaseItemQuality(item),
  [SpecialCaseItemNames.BACKSTAGE_PASSES]: (item: Item): Item =>
    updateBackstagePass(item),
};

export const updateItem = (item: Item): Item => {
  if (noItemUpdates.has(item.name)) return item;

  const updateFunction = customItemUpdates[item.name];

  if (updateFunction) {
    updateFunction(item);
  } else {
    const decreaseAmount = itemIsConjured(item) ? 2 : 1;
    decreaseItemQuality(item, decreaseAmount);
  }

  decreaseItemSellIn(item);

  return item;
};

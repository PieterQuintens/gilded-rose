import { Item } from './gilded-rose';
import {
  MAX_QUALITY_LEVEL,
  SpecialCaseItemNames,
} from './gilded-rose.constants';

const skipItemSellInUpdate: ReadonlySet<string> = new Set([
  SpecialCaseItemNames.SULFURAS,
]);

const itemQualityUpdates: Record<string, (item: Item) => Item> = {
  [SpecialCaseItemNames.SULFURAS]: (item: Item): Item => item,
  [SpecialCaseItemNames.AGED_BRIE]: (item: Item): Item =>
    increaseItemQuality(item),
  [SpecialCaseItemNames.BACKSTAGE_PASSES]: (item: Item): Item =>
    updateBackstagePass(item),
};

const itemIsExpired = (item: Item): boolean => {
  return item.sellIn <= 0;
};

const itemIsConjured = (item: Item): boolean => {
  return item.name.startsWith(SpecialCaseItemNames.CONJURED);
};

const increaseItemQuality = (item: Item, amount: number = 1): Item => {
  const increaseAmount = itemIsExpired(item) ? amount * 2 : amount;
  item.quality = Math.min(MAX_QUALITY_LEVEL, item.quality + increaseAmount);

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

const defaultUpdateFunction = (item: Item): Item => {
  const decreaseAmount = itemIsConjured(item) ? 2 : 1;
  decreaseItemQuality(item, decreaseAmount);

  return item;
};

export const updateItem = (item: Item): Item => {
  const updateFunction = itemQualityUpdates[item.name];

  if (updateFunction) {
    updateFunction(item);
  } else {
    defaultUpdateFunction(item);
  }

  if (!skipItemSellInUpdate.has(item.name)) {
    decreaseItemSellIn(item);
  }

  return item;
};

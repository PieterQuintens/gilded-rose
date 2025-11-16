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

  return {
    ...item,
    quality: Math.min(MAX_QUALITY_LEVEL, item.quality + increaseAmount),
  };
};

const decreaseItemQuality = (item: Item, amount: number = 1): Item => {
  const decreaseAmount = itemIsExpired(item) ? amount * 2 : amount;

  return { ...item, quality: Math.max(0, item.quality - decreaseAmount) };
};

const decreaseItemSellIn = (item: Item, decrease: number = 1): Item => {
  return { ...item, sellIn: item.sellIn - decrease };
};

const updateBackstagePass = (item: Item): Item => {
  if (itemIsExpired(item)) {
    return { ...item, quality: 0 };
  }
  const increaseAmount = item.sellIn > 10 ? 1 : item.sellIn > 5 ? 2 : 3;

  return {
    ...item,
    quality: Math.min(MAX_QUALITY_LEVEL, item.quality + increaseAmount),
  };
};

const defaultUpdateQuality = (item: Item): Item => {
  const decreaseAmount = itemIsConjured(item) ? 2 : 1;

  return decreaseItemQuality(item, decreaseAmount);
};

export const updateItem = (item: Item): Item => {
  let updatedItem: Item = { ...item };
  const updateQuality = itemQualityUpdates[item.name];

  if (updateQuality) {
    updatedItem = updateQuality(updatedItem);
  } else {
    updatedItem = defaultUpdateQuality(updatedItem);
  }

  if (!skipItemSellInUpdate.has(updatedItem.name)) {
    updatedItem = decreaseItemSellIn(updatedItem);
  }

  return updatedItem;
};

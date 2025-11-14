export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum SpecialCaseItemNames {
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED = 'Conjured',
}

const MAX_QUALITY_LEVEL = 50;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  itemIsExpired(item: Item): boolean {
    return item.sellIn <= 0;
  }

  increaseItemQuality(item: Item, amount: number = 1) {
    const inceaseAmount = this.itemIsExpired(item) ? amount * 2 : amount;
    item.quality = Math.min(MAX_QUALITY_LEVEL, item.quality + inceaseAmount);
  }

  decreaseItemQuality(item: Item, amount: number = 1) {
    const decreaseAmount = this.itemIsExpired(item) ? amount * 2 : amount;
    item.quality = Math.max(0, item.quality - decreaseAmount);
  }

  decreaseItemSellIn(item: Item, decrease: number = 1) {
    item.sellIn -= decrease;
  }

  updateBackstagePass(item: Item) {
    if (this.itemIsExpired(item)) {
      item.quality = 0;
      return item;
    }
    const increaseAmount = item.sellIn > 10 ? 1 : item.sellIn > 5 ? 2 : 3;
    item.quality = Math.min(MAX_QUALITY_LEVEL, item.quality + increaseAmount);
  }

  updateItem(item: Item): Item {
    switch (item.name) {
      case SpecialCaseItemNames.SULFURAS:
        return item;
      case SpecialCaseItemNames.AGED_BRIE:
        this.increaseItemQuality(item);
        break;
      case SpecialCaseItemNames.BACKSTAGE_PASSES:
        this.updateBackstagePass(item);
        break;
      case SpecialCaseItemNames.CONJURED:
        this.decreaseItemQuality(item, 2);
        break;
      default:
        this.decreaseItemQuality(item);
    }

    this.decreaseItemSellIn(item);

    return item;
  }

  updateQuality() {
    // return this.updateQualityOld();
    return this.items.map((item) => this.updateItem(item));
  }
}

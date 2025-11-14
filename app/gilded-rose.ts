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

const MAX_QUALITY_LEVEL = 50;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  increaseItemQuality(item: Item, amount: number = 1) {
    if (MAX_QUALITY_LEVEL - item.quality <= amount) {
      item.quality = MAX_QUALITY_LEVEL;
    } else if (item.sellIn <= 0) {
      item.quality += amount * 2;
    } else {
      item.quality += amount;
    }
    return item;
  }

  decreaseItemQuality(item: Item, amount: number = 1) {
    if (item.quality <= amount) {
      item.quality = 0;
    } else if (item.sellIn <= 0) {
      item.quality -= amount * 2;
    } else {
      item.quality -= amount;
    }
    return item;
  }

  decreaseItemSellIn(item: Item, decrease: number = 1) {
    item.sellIn -= decrease;
    return item;
  }

  updateItem(item: Item): Item {
    switch (item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        return item;
      case 'Aged Brie':
        this.increaseItemQuality(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateBackstagePass(item);
        break;
      case 'Conjured':
        break;
      default:
        this.decreaseItemQuality(item);
    }

    this.decreaseItemSellIn(item);

    return item;
  }

  updateBackstagePass(item: Item): Item {
    if (item.sellIn <= 0) {
      item.quality = 0;
      return item;
    }
    const increaseAmount = item.sellIn > 10 ? 1 : item.sellIn > 5 ? 2 : 3;

    this.increaseItemQuality(item, increaseAmount);

    return item;
  }

  updateQuality() {
    // return this.updateQualityOld();
    return this.items.map((item) => this.updateItem(item));
  }

  updateQualityOld() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != 'Aged Brie' &&
        this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (
            this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

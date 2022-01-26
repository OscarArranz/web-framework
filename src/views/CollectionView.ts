import { Collection } from '../models/Collection';
import { Model } from '../models/Model';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render = (): void => {
    const templateElement = document.createElement('template');

    for (const model of this.collection.models) {
      const itemParent = document.createElement('div');

      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.replaceChildren(templateElement.content);
  };
}

import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  bindModel = () => {
    this.model.on('change', () => {
      this.render();
    });
  };

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      const elements = fragment.querySelectorAll(selector);

      elements.forEach((element) =>
        element.addEventListener(eventName, eventsMap[eventKey])
      );
    }
  };

  render = (): void => {
    const templateElement = document.createElement('template');

    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.replaceChildren(templateElement.content);
  };
}

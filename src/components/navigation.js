import {AbstractComponent} from '../components/abstract-component.js';

export class Navigation extends AbstractComponent {
  constructor({items}) {
    super();
    this._items = items;
  }
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${Array.from(this._items).map((title) => `<a class="trip-tabs__btn" href="#">${title}</a>`).join(``)}
      </nav>`;
  }
}

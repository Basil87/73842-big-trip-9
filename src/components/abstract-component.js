import {util} from '../util.js';

export class AbstractComponent {
  constructor() {

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement(element) {
    if (element) {
      element.remove();
    }
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
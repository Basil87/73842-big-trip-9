import {AbstractComponent} from '../components/abstract-component.js';

export class Filter extends AbstractComponent {
  constructor({title}) {
    super();

    this.title = title;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
    ${Array.from(this.title).map((it) => `<div class="trip-filters__filter">
      <input id="filter-${it}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it}" checked>
      <label class="trip-filters__filter-label" for="filter-${it}">${it.toUpperCase()}</label>
    </div>`).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }
}

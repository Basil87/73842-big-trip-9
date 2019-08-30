import {AbstractComponent} from '../components/abstract-component.js';

export class Point extends AbstractComponent {
  constructor({title, icon, dueDate, price, additionalOptions}) {
    super();
    this._title = title;
    this._icon = icon;
    this._dueDate = new Date(dueDate);
    this._price = price;
    this._additionalOptions = additionalOptions;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${this._dueDate.getHours()} : ${this._dueDate.getMinutes()}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${this._dueDate.getHours() + 1} : ${this._dueDate.getMinutes() + 30}</time>
          </p>
          <p class="event__duration">1H 30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
          ${Array.from(this._additionalOptions).map((it) => `<span class="event__offer-title">${it[0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${it[1]}</span>`).slice(``)}
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  }
}

import {AbstractComponent} from '../components/abstract-component.js';
import moment from 'moment';

export class Point extends AbstractComponent {
  constructor({title, icon, startTime, endTime, price, additionalOptions}) {
    super();
    this._title = title;
    this._icon = icon;
    this._startTime = moment(startTime);
    this._endTime = moment(endTime);
    this._price = price;
    this._additionalOptions = additionalOptions;

    this._duration = moment.duration(this._endTime.diff(this._startTime));
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
            <time class="event__start-time" datetime="${this._startTime}">${this._startTime.format(`HH : mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${this._endTime}">${this._endTime.format(`HH : mm`)}</time>
          </p>
          <p class="event__duration">${this._duration.hours()}H ${this._duration.minutes()}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._additionalOptions.map((it) => {
    if (it.isActive) {
      return `<li class="event__offer">
            <span class="event__offer-title">${it.label}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
            </li>`;
    }
    return ``;
  }).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
      </li>`;
  }
}

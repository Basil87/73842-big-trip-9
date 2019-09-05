import {AbstractComponent} from '../components/abstract-component.js';
import {util} from '../util.js';
import {Point} from '../components/point.js';
import {PointEdit} from '../components/point-edit.js';

export class PointController extends AbstractComponent {
  constructor(container, data, onDataChange) {
    super();
    this._data = data;
    this.pointContainer = container;
    this._onDataChange = onDataChange;
    this._point = new Point(data);
    this._pointEdit = new PointEdit(data);
    this._pointElement = this._point.getElement();
    this._pointEditElement = this._pointEdit.getElement();
  }

  create() {

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.pointContainer.replaceChild(this._pointElement, this._pointEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._pointElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this.pointContainer.replaceChild(this._pointEditElement, this._pointElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEditElement.querySelectorAll(`input`)
    .forEach((it) => {
      it.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      it.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    this._pointEditElement.querySelector(`.event`)
      .addEventListener(`submit`, () => {
        this.pointContainer.replaceChild(this._pointElement, this._pointEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEditElement.querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {

        const formData = new FormData(this._pointEditElement.querySelector(`.event`));

        const entry = {
          destination: formData.get(`event-destination`),
          startTime: formData.get(`event-start-time`),
          endTime: formData.get(`event-end-time`),
          price: formData.get(`event-price`),
          additionalOptions: formData.get(`*event-offer`),
        };

        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    util.render(this.pointContainer, this._pointElement, util.position.BEFOREEND);
  }
}

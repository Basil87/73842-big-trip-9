import {AbstractComponent} from '../components/abstract-component.js';
import {util} from '../util.js';
import {Point} from '../components/point.js';
import {PointEdit} from '../components/point-edit.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class PointController extends AbstractComponent {
  constructor(container, data, mode, onChangeView, onDataChange) {
    super();
    this._data = data;
    this.container = container;
    this.pointContainer = this.container.getElement().querySelector(`.trip-events__list`);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._point = new Point(data);
    this._pointEdit = new PointEdit(data);
    this._pointElement = this._point.getElement();
    this._pointEditElement = this._pointEdit.getElement();

    this.create(mode);
  }

  create(mode) {

    let renderPosition = util.position.BEFOREEND;
    let currentView = this._point;

    if (mode === Mode.ADDING) {
      renderPosition = util.position.AFTERBEGIN;
      currentView = this._pointEdit;
    }

    flatpickr(this._pointEditElement.querySelector(`[name=event-start-time]`), {
      altFormat: `d/m/y \H:i`,
      altInput: true,
      enableTime: true,
      defaultDate: this._data.startTime,
      [`time_24hr`]: true,
    });

    flatpickr(this._pointEditElement.querySelector(`[name=event-end-time]`), {
      altFormat: `d/m/y H:i`,
      altInput: true,
      enableTime: true,
      defaultDate: this._data.endTime,
      [`time_24hr`]: true,
    });


    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.setDefaultView();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._pointElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
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
        const elementForm = this._pointEditElement.querySelector(`.event`);
        const eventLabelElement = this._pointEditElement.querySelector(`.event__label`);
        const entry = {
          title: eventLabelElement.textContent + ` ` + formData.get(`event-destination`),
          startTime: formData.get(`event-start-time`),
          endTime: formData.get(`event-end-time`),
          price: formData.get(`event-price`),
          additionalOptions: this._data.additionalOptions.map((it) => {
            return {name: it.name, label: it.label, price: it.price, isActive: !!formData.get(it.name)};
          }),
          sightseeiengImg: elementForm.querySelector(`.event__photo`).src,
          icon: formData.get(`event-type`),
          destination: formData.get(`event-destination`),
        };

        this._onDataChange(entry, mode === `default` ? this._data : null);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEditElement.querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this._onDataChange(null, this._data);
      });

    util.render(this.pointContainer, currentView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this.pointContainer.contains(this._pointEditElement)) {
      this.pointContainer.replaceChild(this._pointElement, this._pointEditElement);
    }
  }
}

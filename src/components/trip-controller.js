import {util} from '../util.js';
import {AbstractComponent} from '../components/abstract-component.js';
import {Point} from '../components/point.js';
import {PointEdit} from '../components/point-edit.js';
import {Sort} from '../components/sort.js';

export class TripController extends AbstractComponent {
  constructor(container, points) {
    super();
    this.container = container;
    this.pointContainer = this.container.querySelector(`.trip-events__list`);
    this._points = points;
    this._sort = new Sort();
  }

  init() {
    util.render(this.container, this._sort.getElement(), util.position.AFTERBEGIN);
    this._points.forEach((pointMock) => this._initPoint(pointMock));

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _initPoint(taskMock) {
    const point = new Point(taskMock);
    const pointEdit = new PointEdit(taskMock);
    const pointElement = point.getElement();
    const pointEditElement = pointEdit.getElement();

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.pointContainer.replaceChild(pointElement, pointEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this.pointContainer.replaceChild(pointEditElement, pointElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    pointEditElement.querySelectorAll(`input`)
    .forEach((it) => {
      it.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      it.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    pointEditElement.querySelector(`.event`)
      .addEventListener(`submit`, () => {
        this.pointContainer.replaceChild(pointElement, pointEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    util.render(this.pointContainer, pointElement, util.position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this.pointContainer.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `time`:
        const sortedByTimeTasks = this._points.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByTimeTasks.forEach((taskMock) => this._initPoint(taskMock));
        evt.target.previousElementSibling.checked = true;
        break;
      case `price`:
        const sortedByPriceTasks = this._points.slice().sort((a, b) => a.price - b.price);
        sortedByPriceTasks.forEach((taskMock) => this._initPoint(taskMock));
        evt.target.previousElementSibling.checked = true;
        break;
      case `event`:
        this._points.forEach((taskMock) => this._initPoint(taskMock));
        evt.target.previousElementSibling.checked = true;
        break;
    }
  }
}

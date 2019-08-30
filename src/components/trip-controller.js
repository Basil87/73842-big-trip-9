import {util} from '../util.js';
import {AbstractComponent} from '../components/abstract-component.js';
import {Point} from '../components/point.js';
import {PointEdit} from '../components/point-edit.js';
import {Sort} from '../components/sort.js';

export class TripController extends AbstractComponent {
  constructor(container, points) {
    super();
    this.container = container;
    this._points = points;
    this._sort = new Sort();
  }

  init() {
    util.render(this._container, this._sort.getElement(), util.position.BEFOREBEGIN);
    this._points.forEach((pointMock) => this._initPoint(pointMock));
  }

  _initPoint(taskMock) {
    const point = new Point(taskMock);
    const pointEdit = new PointEdit(taskMock);
    const pointElement = point.getElement();
    const pointEditElement = pointEdit.getElement();

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.container.replaceChild(pointElement, pointEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this.container.replaceChild(pointEditElement, pointElement);
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
        this.container.replaceChild(pointElement, pointEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    util.render(this.container, pointElement, util.position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this.container.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `time`:
        const sortedByTimeTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByTimeTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `price`:
        const sortedByPriceTasks = this._tasks.slice().sort((a, b) => a.price - b.price);
        sortedByPriceTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `event`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}

import {util} from '../util.js';
import {AbstractComponent} from '../components/abstract-component.js';
import {Point} from '../components/point.js';
import {PointEdit} from '../components/point-edit.js';

export class TripController extends AbstractComponent {
  constructor(container, points) {
    super();
    this.container = container;
    this._points = points;
  }

  init() {
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
}

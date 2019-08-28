import {util} from '../util.js';
import {AbstractComponent} from '../components/abstract-component.js';

export class TripController extends AbstractComponent {
  constructor({container, points}) {
    super();
    this.container = container;
    this._points = points;
  }

  init() {
    const task = new Point(taskMock);
    const taskEdit = new PointEdit(taskMock);
    const taskElement = task.getElement();
    const taskEditElement = taskEdit.getElement();

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.container.replaceChild(taskElement, taskEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this.container.replaceChild(taskEditElement, taskElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditElement.querySelectorAll(`input`)
    .forEach((it) => {
      it.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      it.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    taskEditElement.querySelector(`.event`)
      .addEventListener(`submit`, () => {
        this.container.replaceChild(taskElement, taskEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    util.render(this.container, taskElement, util.position.BEFOREEND);
  }
}

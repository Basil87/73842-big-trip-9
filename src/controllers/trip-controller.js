import {util} from '../util.js';
import {AbstractComponent} from '../components/abstract-component.js';
import {Day} from '../components/day.js';
import {Sort} from '../components/sort.js';
import {PointController} from '../controllers/point-controller.js';

export class TripController extends AbstractComponent {
  constructor(container, points) {
    super();
    this.container = container;
    this._points = points;
    this._day = new Day();
    this._sort = new Sort();
    this._onDataChange = this._onDataChange.bind(this);
    this.pointContainer = this._day.getElement().querySelector(`.trip-events__list`);
  }

  init() {
    util.render(this.container, this._sort.getElement(), util.position.AFTERBEGIN);
    util.render(this.container, this._day.getElement(), util.position.BEFOREEND);
    this._points.forEach((pointMock) => this._renderPoint(pointMock));

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _onDataChange(newData, oldData) {
    this._points[this._points.findIndex((it2) => it2 === oldData)] = newData;

    this._points.forEach((pointMock) => this._renderPoint(pointMock));
  }

  _renderPoint(point) {
    const pointController = new PointController(this.pointContainer, point, this._onDataChange /* , this._onChangeView */);
    // this._subscriptions.push(taskController.setDefaultView.bind(taskController));
    pointController.create();
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
        sortedByTimeTasks.forEach((taskMock) => this._renderPoint(taskMock));
        evt.target.previousElementSibling.checked = true;
        break;
      case `price`:
        const sortedByPriceTasks = this._points.slice().sort((a, b) => a.price - b.price);
        sortedByPriceTasks.forEach((taskMock) => this._renderPoint(taskMock));
        evt.target.previousElementSibling.checked = true;
        break;
      case `event`:
        this._points.forEach((taskMock) => this._renderPoint(taskMock));
        evt.target.previousElementSibling.checked = true;
        break;
    }
  }
}

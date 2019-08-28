import {util} from '../src/util.js';

import {getPoint} from '../src/data.js';
import {getNavigation} from '../src/data.js';
import {getFilter} from '../src/data.js';
import {getRoutInfo} from '../src/data.js';

import {createRoutTemplate} from '../src/components/rout.js';
import {createNavigationTemplate} from '../src/components/navigation.js';

import {PointEdit} from '../src/components/point-edit.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {createContainerTemplate} from '../src/components/container.js';
import {Point} from '../src/components/point.js';
import {TripController} from '../src/components/trip-controller.js';

const POINTS_COUNT = 4;

const renderTask = (taskMock) => {
  const task = new Point(taskMock);
  const taskEdit = new PointEdit(taskMock);
  const taskElement = task.getElement();
  const taskEditElement = taskEdit.getElement();

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      pointsContainer.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskElement.querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      pointsContainer.replaceChild(taskEditElement, taskElement);
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
      pointsContainer.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  util.render(pointsContainer, taskElement, util.position.BEFOREEND);
};

const pointMocks = new Array(POINTS_COUNT)
                .fill(``)
                .map(getPoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilter = (container) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getFilter)
    .map(createFilterTemplate)
    .join(``));
};

const renderNavigation = (container) => {
  container.insertAdjacentHTML(`afterend`, new Array(1)
    .fill(``)
    .map(getNavigation)
    .map(createNavigationTemplate)
    .join(``));
};

const renderRoutInfo = (container) => {
  container.insertAdjacentHTML(`afterbegin`, new Array(1)
    .fill(``)
    .map(getRoutInfo)
    .map(createRoutTemplate)
    .join(``));
};

const pointsExistingCheck = () => {
  if (!pointsContainer.children.length) {
    pointsContainer.innerHTML = `
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }
};

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const siteTripControlsTitleElement = siteTripControlsElement.querySelector(`h2`);

renderNavigation(siteTripControlsTitleElement);
renderFilter(siteTripControlsElement);
render(siteTripEventsElement, createContainerTemplate(), `beforeend`);
const pointsContainer = siteTripEventsElement.querySelector(`.trip-events__list`);
pointMocks.forEach((pointMock) => renderTask(pointMock));

const tripController = new TripController(pointsContainer, pointMocks);
tripController.init();
pointsExistingCheck();

renderRoutInfo(siteTripInfoElement);

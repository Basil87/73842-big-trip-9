import {util} from '../src/util.js';
import {getPoint} from '../src/data.js';
import {getNavigation} from '../src/data.js';
import {getFilter} from '../src/data.js';
import {getRoutInfo} from '../src/data.js';

import {createRoutTemplate} from '../src/components/rout.js';
import {Navigation} from '../src/components/navigation.js';
import {Statistics} from '../src/components/statistics.js';
import {Filter} from '../src/components/filter.js';
import {TripController} from '../src/controllers/trip-controller.js';

const POINTS_COUNT = 4;

const pointMocks = new Array(POINTS_COUNT)
                .fill(``)
                .map(getPoint);

const renderRoutInfo = (container) => {
  container.insertAdjacentHTML(`afterbegin`, new Array(1)
    .fill(``)
    .map(getRoutInfo)
    .map(createRoutTemplate)
    .join(``));
};

const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const addEventBtnElement = document.querySelector(`.trip-main__event-add-btn`);
const navigation = new Navigation(getNavigation());
const statistics = new Statistics(pointMocks);
const filter = new Filter(getFilter());
statistics.getElement().classList.add(`visually-hidden`);

util.render(siteTripControlsElement, navigation.getElement(), util.position.AFTERBEGIN);
util.render(siteTripControlsElement, filter.getElement(), util.position.BEFOREEND);
util.render(pageBodyContainer, statistics.getElement(), util.position.BEFOREEND);

const tripController = new TripController(siteTripEventsElement, pointMocks);

tripController.init();
renderRoutInfo(siteTripInfoElement);

navigation.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }

  switch (evt.target.textContent) {
    case `Table`:
      statistics.getElement().classList.add(`visually-hidden`);
      tripController.show();
      break;
    case `Stats`:
      tripController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
  }
});

filter.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const pointsElements = document.querySelectorAll(`.trip-events__item`);

  if (evt.target.tagName !== `LABEL`) {
    return;
  }

  switch (evt.target.textContent) {
    case `EVERYTHING`:
      pointsElements.forEach((it) => it.classList.remove(`visually-hidden`));
      evt.target.previousElementSibling.checked = true;
      break;
    case `FUTURE`:
      pointsElements.forEach((it) => {
        const pointTime = it.querySelector(`.event__start-time`).dateTime;
        if (new Date(pointTime) > new Date()) {
          it.classList.add(`visually-hidden`);
        } else {
          it.classList.remove(`visually-hidden`);
        }
      });
      evt.target.previousElementSibling.checked = true;
      break;
    case `PAST`:
      pointsElements.forEach((it) => {
        const pointTime = it.querySelector(`.event__end-time`).dateTime;
        if (new Date(pointTime) < new Date()) {
          it.classList.add(`visually-hidden`);
        } else {
          it.classList.remove(`visually-hidden`);
        }
      });
      evt.target.previousElementSibling.checked = true;
      break;
  }
});

addEventBtnElement.addEventListener(`click`, () => {
  tripController.createPoint();
  const evtDetails = document.querySelector(`.event__details`);
  // при создании точки скрываем блок с информацией о месте назначения
  evtDetails.classList.add(`visually-hidden`);
});



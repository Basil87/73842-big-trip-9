import {getPoint} from '../src/data.js';
import {getNavigation} from '../src/data.js';
import {getFilter} from '../src/data.js';
import {getRoutInfo} from '../src/data.js';

import {createRoutTemplate} from '../src/components/rout.js';
import {createNavigationTemplate} from '../src/components/navigation.js';

import {createFormTemplate} from '../src/components/form.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {createContainerTemplate} from '../src/components/container.js';
import {createCardTemplate} from '../src/components/card.js';

const POINTS_COUNT = 4;

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

const renderPoints = (container, count) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(getPoint)
    .map(createCardTemplate)
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

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const siteTripControlsTitleElement = siteTripControlsElement.querySelector(`h2`);

renderNavigation(siteTripControlsTitleElement);
renderFilter(siteTripControlsElement);
render(siteTripEventsElement, createContainerTemplate(), `beforeend`);

const eventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(eventsListElement, createFormTemplate(), `beforeend`);

renderPoints(eventsListElement, POINTS_COUNT);
renderRoutInfo(siteTripInfoElement);

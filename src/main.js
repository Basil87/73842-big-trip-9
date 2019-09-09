import {getPoint} from '../src/data.js';
import {getNavigation} from '../src/data.js';
import {getFilter} from '../src/data.js';
import {getRoutInfo} from '../src/data.js';

import {createRoutTemplate} from '../src/components/rout.js';
import {createNavigationTemplate} from '../src/components/navigation.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {TripController} from '../src/controllers/trip-controller.js';

const POINTS_COUNT = 4;

const pointMocks = new Array(POINTS_COUNT)
                .fill(``)
                .map(getPoint);

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

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const siteTripControlsTitleElement = siteTripControlsElement.querySelector(`h2`);

renderNavigation(siteTripControlsTitleElement);
renderFilter(siteTripControlsElement);

const tripController = new TripController(siteTripEventsElement, pointMocks);

tripController.init();

renderRoutInfo(siteTripInfoElement);

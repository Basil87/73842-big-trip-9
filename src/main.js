import {createRoutTemplate} from '../src/components/rout.js';
import {createNavigationTemplate} from '../src/components/navigation.js';

import {createFormTemplate} from '../src/components/form.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {createContainerTemplate} from '../src/components/container.js';
import {createCardTemplate} from '../src/components/card.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripInfoElement = document.querySelector(`.trip-info`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);
const siteTripControlsTitleElement = siteTripControlsElement.querySelector(`h2`);

render(siteTripInfoElement, createRoutTemplate(), `afterbegin`);
render(siteTripControlsTitleElement, createNavigationTemplate(), `afterend`);
render(siteTripControlsElement, createFilterTemplate(), `beforeend`);
render(siteTripEventsElement, createContainerTemplate(), `beforeend`);

const eventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(eventsListElement, createFormTemplate(), `beforeend`);

new Array(3).fill(``).forEach(() => render(eventsListElement, createCardTemplate(), `beforeend`));

export const createFilterTemplate = ({title}) => {
  return `<form class="trip-filters" action="#" method="get">
  ${Array.from(title).map((it) => `<div class="trip-filters__filter">
    <input id="filter-${it}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it}" checked>
    <label class="trip-filters__filter-label" for="filter-${it}">${it.toUpperCase()}</label>
  </div>`).join(``)}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

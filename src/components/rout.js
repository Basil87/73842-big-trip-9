export const createRoutTemplate = ({cities}) => {
  return `
    <div class="trip-info__main">
    <h1 class="trip-info__title">${cities()}</h1>

    <p class="trip-info__dates"></p>
    </div>`;
};

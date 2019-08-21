export const createRoutTemplate = ({cities, travelDuration}) => {
  return `
    <div class="trip-info__main">
    <h1 class="trip-info__title">${cities()}</h1>

    <p class="trip-info__dates">${travelDuration()}</p>
    </div>`;
};

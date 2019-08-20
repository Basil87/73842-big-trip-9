export const createNavigationTemplate = ({items}) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${Array.from(items).map((title) => `<a class="trip-tabs__btn" href="#">${title}</a>`).join(``)}
    </nav>`;
};

export const getPoint = () => ({
  title: [
    `Taxi to airport`,
    `Flight to Geneva`,
    `Drive to Chamonix`,
    `Check into hotel`,
    `Drive to Geneva`,
    `Natural History Museum`,
    `Flight to Amsterdam`
  ][Math.floor(Math.random() * 7)],
  icon: [
    `bus`,
    `check-in`,
    `drive`,
    `flight`,
    `restaurant`,
    `ship`,
    `sightseeing`,
    `taxi`,
    `train`,
    `transport`,
    `trip`,
  ][Math.floor(Math.random() * 11)],
  city: [
    `Moscow`,
    `Saint-Petersburg`,
    `Novosibirsk`,
    `Sochi`,
    `Saratov`,
    `Penza`,
    `Anapa`,
    `Tomsk`,
  ][Math.floor(Math.random() * 8)],
  sightseeiengImg: `http://picsum.photos/300/150?r=${Math.random()}`,
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ].map((it) => Math.round(Math.random()) ? it : ``).filter(Boolean).slice(0, 3),
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  price: 10 + Math.floor(Math.random() * 300),
  additionalOptions: new Map([
    [`Add luggage `, `10`],
    [`Switch to comfort class `, `150`],
    [`Add meal `, `2`],
    [`Choose seats`, `5`],
    [`Travel by train`, `40`]
  ]),
});

export const getNavigation = () => ({
  items: new Set([
    `Table`,
    `Stats`
  ]),
});

export const getFilter = () => ({
  title: new Set([
    `everything`,
    `future`,
    `past`
  ]),
});

export const getRoutInfo = () => ({
  cities: () => {
    const eventsElements = document.querySelectorAll(`.trip-events__item`);

    const rout = Array.from(eventsElements).reduce((result, it) => {
      const destinationElements = it.querySelector(`.event__input--destination`);
      return destinationElements ? [...result, destinationElements.value] : result;
    }, []);

    if (rout.length > 3) {
      return `${rout[0]} — ... — ${rout[rout.length - 1]}`;
    }

    return rout.join(` - `);
  },
  travelDuration: () => {
    const eventsElements = document.querySelectorAll(`.trip-events__item`);
    return `${eventsElements[0].querySelector(`.event__start-time`).dateTime}`;
  },
});

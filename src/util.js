export const util = {
  position: {
    AFTERBEGIN: `afterbegin`,
    BEFOREEND: `beforeend`,
  },
  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  },
  render(container, element, place) {
    switch (place) {
      case this.position.AFTERBEGIN:
        container.prepend(element);
        break;
      case this.position.BEFOREEND:
        container.append(element);
        break;
    }
  },
  unrender(element) {
    if (element) {
      element.remove();
    }
  },
};

export class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.title = `${data[`type`]} to ${data[`destination`][`name`]}`;
    this.description = data[`destination`][`description`] || ``;
    this.destination = data[`destination`][`name`] || ``;
    this.sightseeingImg = data[`destination`][`pictures`];
    this.icon = data[`type`];
    this.additionalOptions = data[`offers`];
    this.startTime = new Date(data[`date_from`]);
    this.endTime = new Date(data[`date_to`]);
    this.price = data[`base_price`];
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

import {AbstractComponent} from '../components/abstract-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export class Statistics extends AbstractComponent {
  constructor() {
    super();

    let labelsInfo = [`FLY`, `STAY`, `DRIVE`, `LOOK`, `EAT`, `RIDE`];
    let dataInfo = [400, 300, 200, 160, 150, 100];
    const statisticsElement = this.getElement();
    const moneysCtx = statisticsElement.querySelector(`.statistics__chart--money`);
    const timesCtx = statisticsElement.querySelector(`.statistics__chart--time`);
    const transportsCtx = statisticsElement.querySelector(`.statistics__chart--transport`);
    const moneyData = this._getStatisticsConfiguration(labelsInfo, dataInfo, `MONEY`);
    const transportsData = this._getStatisticsConfiguration(labelsInfo, dataInfo, `TRANSPORT`);
    const timesData = this._getStatisticsConfiguration(labelsInfo, dataInfo, `TIME SPENT`);
    this._moneysChart = new Chart(timesCtx, timesData);
    this._moneysChart = new Chart(moneysCtx, moneyData);
    this._moneysChart = new Chart(transportsCtx, transportsData);
  }

  getTemplate() {
    return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
  }

  _getStatisticsConfiguration(labelsInfo, dataInfo, titleInfo) {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: labelsInfo,
        datasets: [{
          data: dataInfo,
          backgroundColor: `#ffffff`,
          borderWidth: 0,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 10,
            left: 50,
          }
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: true,
          text: titleInfo,
          fontSize: 20,
          fontColor: `#000000`,
          position: `left`
        },
      },
    };
  }
}

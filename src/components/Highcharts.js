/** Copyright © 2013-2020 DataYes, All Rights Reserved. */

import Highcharts from 'highcharts/highstock';
import ReactHighchartsFromModule from 'react-highcharts';
import ReactHighstockFromModule from 'react-highcharts/ReactHighstock';

export const dateTimeLabelFormats = {
  millisecond: '%Y-%m-%d',
  second: '%Y-%m-%d',
  minute: '%Y-%m-%d',
  hour: '%Y-%m-%d',
  day: '%Y-%m-%d',
  week: '%Y-%m-%d',
  month: '%Y-%m',
  year: '%Y',
};

const globalOptions = {
  global: {
    useUTC: false,
  },
  lang: {
    thousandsSep: ',',
    rangeSelectorZoom: '', // 不显示 'zoom' 文字
  },
  credits: {
    enabled: false,
  },
};

Highcharts.setOptions(globalOptions);

export const baseConfig = {
  chart: {
    animation: false,
    alignTicks: false,
  },
  title: {
    text: '',
  },
  rangeSelector: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  colors: [
    '#4D82FF',
    '#FFB62A',
    '#A0D468',
    '#FB6E52',
    '#2DCACF',
    '#81A6FC',
    '#E169CB',
    '#A260E2',
    '#FFDA19',
    '#B3AAAA',
  ],
  plotOptions: {
    line: {
      marker: {
        enabled: false,
      },
    },
  },
  navigator: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  xAxis: {
    title: {
      text: '',
    },
    lineColor: '#E9E9E9',
    crosshair: {
      color: '#0d233a',
      dashStyle: 'dash',
      width: 1,
    },
  },
};

export const baseDateConfig = {
  ...baseConfig,
  xAxis: {
    ...baseConfig.xAxis,
    type: 'datetime',
    dateTimeLabelFormats,
    minTickInterval: 24 * 3600 * 1000,
  },
};

export const ReactHighcharts = ReactHighchartsFromModule.withHighcharts(
  Highcharts
);
export const ReactHighstock = ReactHighstockFromModule.withHighcharts(
  Highcharts
);

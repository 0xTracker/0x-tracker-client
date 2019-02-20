import _ from 'lodash';
import timekeeper from 'timekeeper';

import { TIME_PERIOD } from '../../../constants';
import padMetrics from './pad-metrics';

const defaults = {
  tokenVolume: '0',
  volume: 0,
};

describe('features/metrics/util/pad-metrics', () => {
  beforeAll(() => {
    timekeeper.freeze('2018-03-07T07:32:00Z');
  });

  afterAll(() => {
    timekeeper.reset();
  });

  it('pads metrics for year time period', () => {
    const data = [
      { date: new Date('2018-02-16T00:00:00Z'), tokenVolume: 2, volume: 52 },
    ];
    const paddedData = padMetrics(data, TIME_PERIOD.YEAR, defaults);

    expect(paddedData).toMatchSnapshot();
  });

  it('pads metrics with data for missing dates', () => {
    const data = [
      { date: new Date('2018-02-16T00:00:00Z'), tokenVolume: 2, volume: 52 },
    ];
    const paddedData = padMetrics(data, TIME_PERIOD.YEAR, defaults);
    const date = _.find(paddedData, { date: new Date('2018-02-15T00:00:00Z') });

    expect(date).toBeDefined();
    expect(date.volume).toBe(0);
  });

  it('does not pad data for existing dates', () => {
    const data = [{ date: new Date('2018-02-16'), tokenVolume: 2, volume: 52 }];
    const paddedData = padMetrics(data, TIME_PERIOD.YEAR, defaults);

    const dates = _.filter(paddedData, {
      date: new Date('2018-02-16T00:00:00Z'),
    });

    expect(dates).toHaveLength(1);
    expect(dates[0].volume).toBe(data[0].volume);
  });
});

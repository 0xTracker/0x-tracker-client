import normalizePeriod from './normalize-period';

const verbosePeriod = period => {
  const normalizedPeriod = normalizePeriod(period);

  switch (normalizedPeriod) {
    case '24h':
      return '24 hour';
    case '7d':
      return '7 day';
    case '1m':
      return '1 month';
    case '1y':
      return '1 year';
    case 'all':
      return 'all time';
    default:
      throw new Error(`Unrecognised period: ${period}`);
  }
};

export default verbosePeriod;

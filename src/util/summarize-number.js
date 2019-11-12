import numeral from 'numeral';

const summarizeNumber = value => {
  const summarizedValue = numeral(value).format('0.[0]a');

  return summarizedValue;
};

export default summarizeNumber;

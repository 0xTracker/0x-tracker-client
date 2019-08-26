import numeral from 'numeral';
import PropTypes from 'prop-types';

const Number = ({ children }) => numeral(children).format('0,0');

Number.propTypes = {
  children: PropTypes.number.isRequired,
};

export default Number;

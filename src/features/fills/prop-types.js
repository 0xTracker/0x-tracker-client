import PropTypes from 'prop-types';

import tokensPropTypes from '../tokens/prop-types';
import tradersPropTypes from '../traders/prop-types';

const fillStatusPropType = PropTypes.oneOf(['failed', 'pending', 'successful']);

const fillShape = PropTypes.shape({
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      price: PropTypes.shape({ USD: PropTypes.number.isRequired }),
      tokenAddress: PropTypes.string.isRequired,
      tokenSymbol: PropTypes.string,
      tokenType: PropTypes.string,
      traderType: tradersPropTypes.traderType.isRequired,
      type: tokensPropTypes.tokenType.isRequired,
    }),
  ).isRequired,
  date: PropTypes.string.isRequired,
  feeRecipient: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  makerAddress: PropTypes.string.isRequired,
  makerFee: PropTypes.shape({
    USD: PropTypes.number,
    ZRX: PropTypes.string.isRequired,
  }),
  orderHash: PropTypes.string.isRequired,
  protocolVersion: PropTypes.number.isRequired,
  senderAddress: PropTypes.string.isRequired,
  status: fillStatusPropType.isRequired,
  takerAddress: PropTypes.string.isRequired,
  takerFee: PropTypes.shape({
    USD: PropTypes.number,
    ZRX: PropTypes.string.isRequired,
  }),
  totalFees: PropTypes.shape({
    USD: PropTypes.number,
    ZRX: PropTypes.string.isRequired,
  }),
  transactionHash: PropTypes.string.isRequired,
  value: PropTypes.shape({ USD: PropTypes.number.isRequired }),
});

const partialFillShape = PropTypes.shape({
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      price: PropTypes.shape({ USD: PropTypes.number.isRequired }),
      tokenAddress: PropTypes.string.isRequired,
      tokenSymbol: PropTypes.string,
      tokenType: PropTypes.string,
      traderType: tradersPropTypes.traderType.isRequired,
      type: tokensPropTypes.tokenType.isRequired,
    }),
  ).isRequired,
  date: PropTypes.string.isRequired,
  feeRecipient: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  makerAddress: PropTypes.string.isRequired,
  status: fillStatusPropType.isRequired,
  takerAddress: PropTypes.string.isRequired,
  value: PropTypes.shape({ USD: PropTypes.number.isRequired }),
});

const propTypes = {
  fill: fillShape,
  partialFill: partialFillShape,
  status: fillStatusPropType,
};

export default propTypes;

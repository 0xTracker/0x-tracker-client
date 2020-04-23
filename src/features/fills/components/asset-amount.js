import PropTypes from 'prop-types';

import formatTokenAmount from '../../../util/format-token-amount';

const AssetAmount = ({ asset }) => formatTokenAmount(asset.amount);

AssetAmount.propTypes = {
  asset: PropTypes.shape({
    amount: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default AssetAmount;

import PropTypes from 'prop-types';
import React from 'react';

import AddressLink from './address-link';
import AddressVolumeLabel from './address-volume-label';
import addressesPropTypes from '../prop-types';
import prettyPeriod from '../../../util/pretty-period';
import sharedPropTypes from '../../../prop-types';

const AddressList = ({ addresses, positionOffset, timePeriod }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th>#</th>
        <th>Address</th>
        <th className="text-right">Fill Count ({prettyPeriod(timePeriod)})</th>
        <th className="text-right">Fill Volume ({prettyPeriod(timePeriod)})</th>
      </tr>
    </thead>
    <tbody>
      {addresses.map((address, index) => (
        <tr key={address.address}>
          <td className="align-middle">{`${positionOffset + index + 1}`}</td>
          <td className="align-middle" width="99%">
            <AddressLink address={address.address}>
              {address.address}
            </AddressLink>
          </td>
          <td className="align-middle text-right">{address.stats.fillCount}</td>
          <td className="align-middle text-right">
            <AddressVolumeLabel stats={address.stats} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(addressesPropTypes.addressWithStats).isRequired,
  positionOffset: PropTypes.number,
  timePeriod: sharedPropTypes.timePeriod.isRequired,
};

AddressList.defaultProps = {
  positionOffset: 0,
};

export default AddressList;

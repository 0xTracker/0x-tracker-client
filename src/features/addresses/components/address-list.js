import PropTypes from 'prop-types';
import React from 'react';

import AddressLink from './address-link';
import AddressVolumeLabel from './address-volume-label';
import addressesPropTypes from '../prop-types';
import Number from '../../../components/number';

const AddressList = ({ addresses, positionOffset }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th>#</th>
        <th>Address</th>
        <th className="text-right">Fills</th>
        <th className="text-right">Volume</th>
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
          <td className="align-middle text-right">
            <Number>{address.stats.fillCount}</Number>
          </td>
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
};

AddressList.defaultProps = {
  positionOffset: 0,
};

export default AddressList;

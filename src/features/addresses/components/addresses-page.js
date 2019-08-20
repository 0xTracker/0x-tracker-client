import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import AddressList from './address-list';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import useAddresses from '../hooks/use-addresses';

const AddressesPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);

  const [addresses, loadingAddresses, addressesError] = useAddresses({
    autoReload: true,
    limit: 50,
    page: params.get('page') || 1,
  });

  if (addressesError) {
    throw addressesError;
  }

  const { items, page, pageCount, pageSize, recordCount } = addresses;

  return (
    <>
      <Helmet key="addresses">
        <title>Addresses</title>
      </Helmet>
      <PageLayout
        breadcrumbItems={[{ title: 'Addresses', url: URL.ADDRESSES }]}
        title="Addresses"
      >
        <Card fullHeight>
          {loadingAddresses ? (
            <LoadingIndicator centered />
          ) : (
            <>
              <AddressList
                addresses={items}
                positionOffset={(page - 1) * pageSize}
                timePeriod={TIME_PERIOD.DAY}
              />
              <Paginator
                onPageChange={newPage => {
                  history.push(`${URL.ADDRESSES}?page=${newPage}`);
                }}
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                recordCount={recordCount}
              />
            </>
          )}
        </Card>
      </PageLayout>
    </>
  );
};

AddressesPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddressesPage;

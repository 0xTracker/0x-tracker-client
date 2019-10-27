import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import TraderList from './trader-list';
import useTraders from '../hooks/use-traders';

const TopTradersCard = ({ navigateTo, page, selectedFilters }) => {
  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 50,
    page,
    ...selectedFilters,
  });

  const { items, pageCount, pageSize, recordCount } = traders;

  return (
    <Card fullHeight>
      {loading ? (
        <LoadingIndicator centered />
      ) : (
        <>
          <TraderList positionOffset={(page - 1) * pageSize} traders={items} />
          <Paginator
            onPageChange={newPage => {
              navigateTo(
                buildUrl(URL.TRADERS, {
                  page: newPage,
                  ...selectedFilters,
                }),
              );
            }}
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            recordCount={recordCount}
          />
        </>
      )}
    </Card>
  );
};

TopTradersCard.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  selectedFilters: PropTypes.object.isRequired,
};

export default TopTradersCard;

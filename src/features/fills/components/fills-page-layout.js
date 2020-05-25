import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import { useNavigator } from '../../../hooks';
import { FillsIcon } from '../../../components/icons';
import FillsFilter from './fills-filter';
import PageLayout from '../../../components/page-layout';

const formatDate = (date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = _.padStart(parsedDate.getUTCMonth() + 1, 2, 0);
  const day = _.padStart(parsedDate.getUTCDate(), 2, 0);

  return `${day}/${month}/${year}`;
};

const getSubTitle = (dateFrom, dateTo) => {
  if (dateFrom !== undefined && dateTo !== undefined) {
    return `from ${formatDate(dateFrom)} to ${formatDate(dateTo)}`;
  }

  if (dateFrom !== undefined) {
    return `from ${formatDate(dateFrom)} to now`;
  }

  if (dateTo !== undefined) {
    return `from 0x launch to ${formatDate(dateTo)}`;
  }

  return 'from all time';
};

const FillsPageLayout = ({ children, period, selectedFilters }) => {
  const { navigateTo } = useNavigator();

  const dateFrom = _.isPlainObject(period) ? period.from : undefined;
  const dateTo = _.isPlainObject(period) ? period.to : undefined;

  return (
    <PageLayout
      actions={
        <FillsFilter
          onChange={(newFilters) => {
            navigateTo(URL.FILLS, newFilters);
          }}
          selectedFilters={{
            ...selectedFilters,
            dateFrom,
            dateTo,
          }}
        />
      }
      icon={<FillsIcon size={44} />}
      subTitle={getSubTitle(dateFrom, dateTo)}
      title="Browse Fills"
    >
      {children}
    </PageLayout>
  );
};

FillsPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  period: PropTypes.string.isRequired,
  selectedFilters: PropTypes.object.isRequired,
};

export default FillsPageLayout;

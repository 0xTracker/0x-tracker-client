import { useParams } from 'react-router';
import React from 'react';
import styled from 'styled-components';

import { useMetadata } from '../../../hooks';
import { truncateAddress } from '../../../util';
import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { EtherscanIcon } from '../../../components/icons';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import FillAddresses from './fill-addresses';
import FillDetails from './fill-details';
import Link from '../../../components/link';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useFill from '../hooks/use-fill';
import Visible from '../../../components/visible';

const ActionLink = styled(Link)`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 44px;
  padding: 0 8px;

  &:hover {
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.4);
  }

  ${media.greaterThan('sm')`
    padding: 0 16px;
  `}
`;

const FillPage = () => {
  useMetadata({ title: '0x Protocol Trade Details' });

  const { id } = useParams();
  const [fill, loading] = useFill(id);

  if (fill === undefined && !loading) {
    return <PageNotFound />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <PageLayout
      actions={
        <ActionLink href={`https://etherscan.io/tx/${fill.transactionHash}`}>
          <EtherscanIcon
            css={`
              ${media.greaterThan('md')`
                margin-right: 8px;
              `}
            `}
            size={19}
          />
          <Visible above="sm">View on Etherscan</Visible>
        </ActionLink>
      }
      icon={
        <svg
          fill="currentColor"
          height="44"
          viewBox="0 0 24 24"
          width="44"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 001 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm-2 13H7v-2h7v2zm3-4H7V9h10v2z" />
        </svg>
      }
      subTitle={`for ${truncateAddress(fill.transactionHash, 30)}`}
      title="Trade Details"
    >
      <CardGrid>
        <CardGridRow>
          <CardGridCol>
            <Card autoHeight={false}>
              <CardBody padded>
                <FillDetails fill={fill} />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card autoHeight={false}>
              <CardBody padded>
                <FillAddresses fill={fill} />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default FillPage;

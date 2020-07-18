import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useMetadata } from '../../../hooks';
import { callApi, truncateAddress } from '../../../util';
import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { EtherscanIcon } from '../../../components/icons';
import Card from '../../../components/card';
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
  useMetadata({ title: '0x Protocol Fill Details' });

  const { id } = useParams();
  const [fill, loading] = useFill(id);
  const [maker, setMaker] = useState();
  const [taker, setTaker] = useState();

  useEffect(() => {
    if (fill !== undefined) {
      callApi(`traders/${fill.takerAddress}`)
        .then((foundTaker) => {
          setTaker(foundTaker);
        })
        .catch((error) => {
          if (error.response && error.response === 404) {
            return;
          }

          throw error;
        });

      callApi(`traders/${fill.makerAddress}`)
        .then((foundMaker) => {
          setMaker(foundMaker);
        })
        .catch((error) => {
          if (error.response && error.response === 404) {
            return;
          }

          throw error;
        });
    }
  }, [fill]);

  if (fill === undefined && !loading) {
    return <PageNotFound />;
  }

  if (loading || maker === undefined || taker === undefined) {
    return <LoadingPage />;
  }

  return (
    <PageLayout
      actions={
        <ActionLink
          href={`https://etherscan.io/transaction/${fill.transactionHash}`}
        >
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
      title="Fill Details"
    >
      <Card css="padding: 2rem;">
        <FillDetails fill={fill} maker={maker} taker={taker} />
      </Card>
    </PageLayout>
  );
};

export default FillPage;

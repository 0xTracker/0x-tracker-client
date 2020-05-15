import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';

import { useMetadata } from '../../../hooks';
import { callApi } from '../../../util';
import Card from '../../../components/card';
import FillDetails from './fill-details';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useFill from '../hooks/use-fill';

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
    <PageLayout title="Fill Details">
      <Card css="padding: 2rem;">
        <FillDetails fill={fill} maker={maker} taker={taker} />
      </Card>
    </PageLayout>
  );
};

export default FillPage;

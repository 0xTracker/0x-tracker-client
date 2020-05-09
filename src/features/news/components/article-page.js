import _ from 'lodash';
import { useParams } from 'react-router';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { DATE_FORMAT } from '../../../constants';
import { formatDate } from '../../../util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { useMetadata } from '../../../hooks';
import ArticleShareButtons from './article-share-buttons';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import LatestNewsCard from './latest-news-card';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import SideBanner from '../../advertising/components/side-banner';
import SubscribePanel from '../../../components/subscribe-panel';
import useArticle from '../hooks/use-article';
import Visible from '../../../components/visible';

const Content = styled.div`
  font-size: 16px;
  margin: 0 auto;
  max-width: 680px;

  a {
    color: inherit;
    text-decoration: underline;
    word-break: break-all;
  }

  > p:last-of-type,
  > hr:last-of-type,
  > img:last-of-type {
    display: none;
  }

  iframe {
    display: none;
  }

  img {
    max-width: 550px;
    width: 100%;
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
    padding: 1px;
  }

  figure {
    flex-direction: column;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    ${media.greaterThan('sm')`
      margin: 3rem 0;
    `}

    &:first-child {
      margin-top: 0;

      img {
        border: none;
        max-width: 100%;
        padding: 0;
      }
    }
  }

  figcaption {
    color: ${COLORS.NEUTRAL.MYSTIC_600};
    margin: 0.5rem 0 0 0;
    max-width: 400px;
    font-size: 15px;
    text-align: center;
  }

  p {
    margin: 0 0 1.5rem;
  }

  h3 {
    font-size: 24px;
    margin: 30px 0 10px;

    ${media.greaterThan('sm')`
      max-width: 80%;
    `}
  }

  li {
    margin-bottom: 1rem;
  }

  li:last-child {
    margin: 0;
  }
`;

const ArticleMetadata = styled.dl`
  font-size: 0.9rem;
  margin: 0 0 0.5rem;

  dt {
    display: none;
  }

  dd {
    margin: 0;
    vertical-align: middle;
    text-transform: none;
  }
`;

const ArticlePage = () => {
  const { slug, source } = useParams();
  const [article, loading] = useArticle(source, slug);

  const breakpoint = useCurrentBreakpoint();
  const title = _.get(article, 'title');
  const description = _.get(article, 'summary');

  useMetadata({
    description,
    openGraph: { description, title, type: 'article' },
    title,
  });

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <PageLayout showBanner={breakpoint.lessThan('lg')}>
        <CardGrid>
          <CardGridRow>
            <CardGridCol lg={7}>
              <Card>
                <CardBody
                  css={`
                    padding: 1rem;

                    ${media.greaterThan('sm')`
                    padding: 2rem;
                  `}
                  `}
                >
                  <h1 css="font-size: 1.75rem; margin: 0 0 1rem;">
                    {article.title}
                  </h1>
                  <span
                    css={`
                      align-items: center;
                      display: flex;
                      margin-bottom: 2rem;
                      border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
                      padding-bottom: 1rem;
                      justify-content: space-between;
                    `}
                  >
                    <div css="display: flex;">
                      <img
                        css="border-radius: 20px; margin-right: 0.75rem;"
                        height={40}
                        src="https://miro.medium.com/fit/c/96/96/1*l-_wsVPIYC8FQ0gu2_JO1w.jpeg"
                        width={40}
                      />
                      <ArticleMetadata>
                        <dt>Author</dt>
                        <dd>{article.author}</dd>
                        <dt>Date</dt>
                        <dd
                          css={`
                            color: ${COLORS.NEUTRAL.MYSTIC_700};
                          `}
                        >
                          {formatDate(article.date, DATE_FORMAT.COMPACT, {
                            timezone: false,
                          })}
                        </dd>
                      </ArticleMetadata>
                    </div>
                    <ArticleShareButtons css="flex-shrink: 0;" size={30} />
                  </span>
                  <Content
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  <div
                    css={`
                      align-items: center;
                      border-top: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
                      display: flex;
                      justify-content: flex-end;
                      margin-top: 8px;
                      padding-top: 24px;
                    `}
                  >
                    <span css="font-size: 18px;font-weight: 500; margin-right: 16px;">
                      Share:
                    </span>
                    <ArticleShareButtons title={article.title} />
                  </div>
                </CardBody>
              </Card>
            </CardGridCol>
            <CardGridCol lg={5}>
              <div css="position: sticky; top: 30px;">
                <Visible above="md">
                  <SideBanner css="margin-bottom: 2rem;" />
                </Visible>
                <LatestNewsCard autoHeight={false} />
              </div>
            </CardGridCol>
          </CardGridRow>
        </CardGrid>
      </PageLayout>
      <SubscribePanel />
    </>
  );
};

export default ArticlePage;

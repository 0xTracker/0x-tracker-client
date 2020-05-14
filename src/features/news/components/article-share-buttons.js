import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';
import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';

import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
} from '../../../components/icons';

const ArticleShareButtons = ({ className, size, title }) => {
  const location = useLocation();
  const url = location.href;

  return (
    <div className={className}>
      <TwitterShareButton
        css="margin-right: 4px;"
        title={title}
        url={url}
        via="0xTracker"
      >
        <TwitterIcon css="color: #1EA1F2;" height={size} width={size} />
      </TwitterShareButton>
      <RedditShareButton css="margin-right: 4px;" title={title} url={url}>
        <RedditIcon css="color: #FD4300;" height={size} width={size} />
      </RedditShareButton>
      <LinkedinShareButton
        css="margin-right: 4px;"
        source="0x Tracker"
        title={title}
        url={url}
      >
        <LinkedinIcon css="color: #0A6699;" height={size} width={size} />
      </LinkedinShareButton>
      <FacebookShareButton quote={title} url={url}>
        <FacebookIcon css="color: #3C5A99;" height={size} width={size} />
      </FacebookShareButton>
    </div>
  );
};

ArticleShareButtons.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
};

ArticleShareButtons.defaultProps = {
  className: undefined,
  size: 40,
};

export default ArticleShareButtons;

import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

const analyticsEnabled = process.env.REACT_APP_GA_TRACKING_ID !== undefined;

class AnalyticsTracker extends Component {
  componentDidMount() {
    this.trackPageView();
  }

  shouldComponentUpdate({ location: prevLocation }) {
    return this.locationChanged(prevLocation);
  }

  componentDidUpdate({ location: prevLocation }) {
    if (this.locationChanged(prevLocation)) {
      this.trackPageView();
    }
  }

  locationChanged(prevLocation) {
    const { location } = this.props;

    return (
      location.pathname !== prevLocation.pathname ||
      location.search !== prevLocation.search
    );
  }

  trackPageView() {
    if (analyticsEnabled) {
      const { location } = this.props;
      const page = location.pathname + location.search;

      ReactGA.set({
        page,
        location: `${window.location.origin}${page}`,
      });
      ReactGA.pageview(page);
    }
  }

  // eslint-disable-next-line lodash/prefer-constant, class-methods-use-this
  render() {
    return null;
  }
}

AnalyticsTracker.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
};

export default AnalyticsTracker;

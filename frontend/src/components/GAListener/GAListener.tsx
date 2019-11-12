import React from 'react';
// import PropTypes from '@/utils/propTypes';

import { Location } from 'history';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

const hasGAId = !!process.env.REACT_APP_GOOGLE_ANALYTICS;

if (hasGAId) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}

export const GAListener: React.FunctionComponent = ({ children }) => {
  const history = useHistory();

  const sendPageView = (location: Location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  };

  React.useEffect(() => {
    if (hasGAId) {
      sendPageView(history.location);
      history.listen(sendPageView);
    }
  }, [history, history.location]); // eslint-disable-line

  return <>{children}</>;
};

import React, { useEffect } from 'react';
import { useLocation, Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import initializeAnalytics from '../utils/initializeAnalytics';

import Authorization from './Authorization';
import { LabelProvider } from '../contexts/LabelContext';
import { ColumnProvider } from '../contexts/ColumnContext';
import { ProjectSearchProvider } from '../contexts/FilterBarContext';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, [location]);

  return [
    <LabelProvider>
      <ColumnProvider>
        <ProjectSearchProvider>
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <SecureRoute path="/" component={Authorization} />
        </ProjectSearchProvider>
      </ColumnProvider>
    </LabelProvider>,
  ];
};

export default App;

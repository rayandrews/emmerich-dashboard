import React from 'react';

import * as routes from '@/config/routes';

import { TabLayout, ITabRoute } from '@/components/Layout/TabLayout';
import { ProtectedRoute, UnauthenticatedRoute } from '@/components/Route';

import {} from './ListJournals';
import {} from './CreateJournal';

const journalRoutes: ITabRoute = {
  list: {
    path: routes.accounting.journal.list,
    component: React.lazy(() => import('./ListJournals')),
  },
  create: {
    path: routes.accounting.journal.create,
    component: React.lazy(() => import('./CreateJournal')),
  },
};

export const JournalPage: React.FunctionComponent = () => {
  return <TabLayout routes={journalRoutes} />;
};

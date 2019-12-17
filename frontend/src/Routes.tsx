import React from 'react';
import { Switch } from 'react-router-dom';

// import * as R from 'ramda';

// import { useDispatch, useSelector } from 'react-redux';

import * as routes from '@/config/routes';

// import { ApplicationState } from '@/reducers';
// import { checkProfileAction } from '@/reducers/auth';

import { GAListener } from '@/components/GAListener';
import { EmptyLayout, MainLayout } from '@/components/Layout';
import { PageSpinner } from '@/components/PageSpinner';
import { ProtectedRoute, UnauthenticatedRoute } from '@/components/Route';

// our own pages
// import LoginPage from '@/pages/LoginPage';
// import SignupPage from '@/pages/LoginPage';

// Auth module
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const SignupPage = React.lazy(() => import('@/pages/SignupPage'));
// End of auth module

// Accounting module
// 1. Journals
const ListJournalsPage = React.lazy(() =>
  import('@/pages/Accounting/Journal/ListJournals'),
);

const CreateJournalPage = React.lazy(() =>
  import('@/pages/Accounting/Journal/CreateJournal'),
);

const UpdateJournalPage = React.lazy(() =>
  import('@/pages/Accounting/Journal/UpdateJournal'),
);

// 2.  Accounts
const ListAccountsPage = React.lazy(() =>
  import('@/pages/Accounting/Account/ListAccounts'),
);

const CreateAccountPage = React.lazy(() =>
  import('@/pages/Accounting/Account/CreateAccount'),
);

const UpdateAccountPage = React.lazy(() =>
  import('@/pages/Accounting/Account/UpdateAccount'),
);

// 3.  Ledgers
// const ListLedgersPage = React.lazy(() =>
//   import('@/pages/Accounting/Ledger/ListLedgers'),
// );

// const CreateLedgerPage = React.lazy(() =>
//   import('@/pages/Accounting/Ledger/CreateLedger'),
// );
// End of accounting module

// const AlertPage = React.lazy(() => import('@/template-pages/AlertPage'));
// const AuthModalPage = React.lazy(() =>
//   import('@/template-pages/AuthModalPage'),
// );
// const BadgePage = React.lazy(() => import('@/template-pages/BadgePage'));
// const ButtonGroupPage = React.lazy(() =>
//   import('@/template-pages/ButtonGroupPage'),
// );
// const ButtonPage = React.lazy(() => import('@/template-pages/ButtonPage'));
// const CardPage = React.lazy(() => import('@/template-pages/CardPage'));
// const ChartPage = React.lazy(() => import('@/template-pages/ChartPage'));
const DashboardPage = React.lazy(() =>
  import('@/template-pages/DashboardPage'),
);
// const DropdownPage = React.lazy(() => import('@/template-pages/DropdownPage'));
// const FormPage = React.lazy(() => import('@/template-pages/FormPage'));
// const InputGroupPage = React.lazy(() =>
//   import('@/template-pages/InputGroupPage'),
// );
// const ModalPage = React.lazy(() => import('@/template-pages/ModalPage'));
// const ProgressPage = React.lazy(() => import('@/template-pages/ProgressPage'));
// const TablePage = React.lazy(() => import('@/template-pages/TablePage'));
// const TypographyPage = React.lazy(() =>
//   import('@/template-pages/TypographyPage'),
// );
// const WidgetPage = React.lazy(() => import('@/template-pages/WidgetPage'));

export const Routes: React.FunctionComponent = () => {
  // const pathName = useSelector(
  //   (state: ApplicationState) => state.router.location.pathname,
  // );
  // const dispatch = useDispatch();
  // const checkProfileRequest = React.useCallback(() => {
  //   dispatch(checkProfileAction.request());
  // }, [dispatch]);

  // React.useEffect(() => {
  //   if (R.includes(pathName, [routes.auth.login, routes.auth.signup])) return;
  //   checkProfileRequest();
  // }, [pathName, checkProfileRequest]);

  return (
    <GAListener>
      <Switch>
        <React.Suspense fallback={<PageSpinner />}>
          <UnauthenticatedRoute
            exact
            path={routes.auth.login}
            layout={EmptyLayout}
            component={LoginPage}
          />
          <UnauthenticatedRoute
            exact
            path={routes.auth.signup}
            layout={EmptyLayout}
            component={SignupPage}
          />

          <MainLayout>
            {/** added routes */}
            {/** 1. Accounting Modules */}
            {/** 1.1. Ledger Modules */}
            {/* <ProtectedRoute
              exact
              path={routes.accounting.ledger.list}
              component={ListLedgersPage}
            />
            <ProtectedRoute
              exact
              path={routes.accounting.ledger.create}
              component={CreateLedgerPage}
            /> */}
            {/** 1.2. Account Modules */}
            <ProtectedRoute
              exact
              path={routes.accounting.account.list}
              component={ListAccountsPage}
            />
            <ProtectedRoute
              exact
              path={routes.accounting.account.create}
              component={CreateAccountPage}
            />
            <ProtectedRoute
              exact
              path={routes.accounting.account.update}
              component={UpdateAccountPage}
            />
            {/** 1.3. Journal Modules */}
            <ProtectedRoute
              exact
              path={routes.accounting.journal.list}
              component={ListJournalsPage}
            />
            <ProtectedRoute
              exact
              path={routes.accounting.journal.create}
              component={CreateJournalPage}
            />
            <ProtectedRoute
              exact
              path={routes.accounting.journal.update}
              component={UpdateJournalPage}
            />
            {/** end of added routes */}

            <ProtectedRoute exact path="/" component={DashboardPage} />
            {/*<Route exact path="/login-modal" component={AuthModalPage} />
            <ProtectedRoute exact path="/buttons" component={ButtonPage} />
            <ProtectedRoute exact path="/cards" component={CardPage} />
            <ProtectedRoute exact path="/widgets" component={WidgetPage} />
            <ProtectedRoute
              exact
              path="/typography"
              component={TypographyPage}
            />
            <ProtectedRoute exact path="/alerts" component={AlertPage} />
            <ProtectedRoute exact path="/tables" component={TablePage} />
            <ProtectedRoute exact path="/badges" component={BadgePage} />
            <ProtectedRoute
              exact
              path="/button-groups"
              component={ButtonGroupPage}
            />
            <ProtectedRoute exact path="/dropdowns" component={DropdownPage} />
            <ProtectedRoute exact path="/progress" component={ProgressPage} />
            <ProtectedRoute exact path="/modals" component={ModalPage} />
            <ProtectedRoute exact path="/forms" component={FormPage} />
            <ProtectedRoute
              exact
              path="/input-groups"
              component={InputGroupPage}
            />
            <ProtectedRoute exact path="/charts" component={ChartPage} /> */}
          </MainLayout>
          {/* <Redirect to="/" /> */}
        </React.Suspense>
      </Switch>
    </GAListener>
  );
};

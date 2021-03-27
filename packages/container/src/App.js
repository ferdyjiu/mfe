import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [ isSignIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    if(isSignIn) {
        history.push('/dashboard');
    }
  }, [isSignIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignIn={isSignIn} onSignOut={() =>  setIsSignedIn(false)} />
          <Suspense fallback={<Progress></Progress>}>
            <Switch>
                <Route path="/auth" >
                    <AuthLazy onSignIn={() => setIsSignedIn(true)}></AuthLazy>
                </Route>
                <Route path="/dashboard">
                    {!isSignIn && <Redirect to='/'></Redirect>}
                    <DashboardLazy></DashboardLazy>
                </Route>
                <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

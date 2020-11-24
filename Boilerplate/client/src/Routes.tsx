import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';

const Routes: React.FunctionComponent = () => (
    <>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route render={() => <Redirect to="/"/>}/>
        </Switch>
    </>
);

export default Routes;

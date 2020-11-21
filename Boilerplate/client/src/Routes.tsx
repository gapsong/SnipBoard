import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';

const Routes: React.FunctionComponent = () => (
    <>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route render={() => <Redirect to="/"/>}/>
        </Switch>
    </>
);

export default Routes;

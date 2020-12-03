import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { Store } from 'redux';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import theme from '../theme';
import { ApplicationState } from '../store';
import { BrowserView } from '@src/app/components/BrowserView/BrowserView';

interface MainProps {
    store: Store<ApplicationState>;
    history: History;
}

const App: React.FC<MainProps> = ({ store, history }) => {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <ConnectedRouter history={history}>
                    <BrowserView />
                </ConnectedRouter>
            </MuiThemeProvider>
        </Provider>
    );
};

export default hot(module)(App);

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { ApplicationState } from '../../store';
import { createView, saveDashboard } from '@src/app/store/view/action';

const BrowserView: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const views = useSelector((state: ApplicationState) => state.dashboard.views);

    const dispatchSaveDashboard = () => {
        dispatch(saveDashboard());
    };

    const dispatchCreateView = () => {
        dispatch(createView());
    };

    return (
        <div>
            <Button variant='contained' color='primary' onClick={dispatchCreateView}>
                Createview
            </Button>{' '}
            <Button variant='contained' color='primary' onClick={dispatchSaveDashboard}>
                Save Dashboarddd
            </Button>
        </div>
    );
};

export { BrowserView };

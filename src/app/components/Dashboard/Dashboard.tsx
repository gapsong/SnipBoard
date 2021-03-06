import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { ApplicationState } from '../../store';
import { createView, saveDashboard } from '@src/app/store/view/action';
import { DraggableView } from './DraggableView';

const Dashboard: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const views = useSelector((state: ApplicationState) => state.dashboard.views);
    const viewOrder = useSelector((state: ApplicationState) => state.dashboard.viewOrder);

    const dispatchSaveDashboard = () => {
        dispatch(saveDashboard());
    };

    const dispatchCreateView = () => {
        dispatch(createView());
    };

    return (
        <div>
            {Object.keys(views).map(function (key, index) {
                return <DraggableView zIndex={viewOrder.findIndex((item) => item == key)} key={key} {...views[key]} />;
            })}
            <Button variant='contained' color='primary' onClick={dispatchCreateView}>
                Createview
            </Button>{' '}
            <Button variant='contained' color='primary' onClick={dispatchSaveDashboard}>
                Save Dashboard
            </Button>
        </div>
    );
};

export default Dashboard;

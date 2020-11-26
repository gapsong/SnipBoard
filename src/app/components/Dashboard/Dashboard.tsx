import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { initStore, createView } from '../../store/view/action';
import { ViewConfig } from '@types';
import { ApplicationState } from '../../store';
import { DraggableView } from './DraggableView';

const Dashboard: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const views = useSelector((state: ApplicationState) => state.dashboard.views);

    useEffect(() => {
        // @ts-ignore
        window.api.response('initStore', dispatchInitStore); // cleanup this component
        return () => {
            // @ts-ignore
            window.api.removeListener('initStore', dispatchInitStore);
        };
    }, []);

    const dispatchInitStore = (data: any) => dispatch(initStore(data));
    const dispatchCreateView = () => dispatch(createView());

    return (
        <div>
            {/* {views.map((view: ViewConfig) => (
                <DraggableView {...view} />
            ))} */}
            <Button variant='contained' color='primary' onClick={dispatchCreateView}>
                Createview
            </Button>
        </div>
    );
};

export default Dashboard;

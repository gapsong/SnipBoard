import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { ViewConfig } from '@types';
import { ApplicationState } from '../../store';
import { DraggableView } from './DraggableView';
import { send } from  '../../../common/ipc';
import { PONG } from '@src/common/channels';

const Dashboard: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const views = useSelector((state: ApplicationState) => state.dashboard.views);

    const dispatchPong = () => {
        dispatch(send(PONG, JSON.stringify({ yo: 123 })));
    };

    return (
        <div>
            {views.map((view: ViewConfig) => (
                <DraggableView key={view.url} {...view} />
            ))}
            <Button variant='contained' color='primary' onClick={dispatchPong}>
                Createview
            </Button>{' '}
            <Button variant='contained' color='primary' onClick={dispatchPong}>
                send
            </Button>
        </div>
    );
};

export default Dashboard;

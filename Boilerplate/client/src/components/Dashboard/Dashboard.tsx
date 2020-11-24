import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { initStore, createView } from '../../store/view/action';
import { DraggableView } from './DraggableView';

const Dashboard: React.FunctionComponent = () => {
    const dispatch = useDispatch();

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
            <DraggableView />
            <Button variant='contained' color='primary' onClick={dispatchCreateView}>
                Createview
            </Button>
        </div>
    );
};

export default Dashboard;

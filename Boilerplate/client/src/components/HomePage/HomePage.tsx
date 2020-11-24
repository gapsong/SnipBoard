import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { ViewConfig } from '../../store/view/types';
import { initStore } from '../../store/view/action';
import { DraggableView } from './DraggableView';

const HomePage: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const dispatchInitStore = (data: any) => dispatch(initStore(data));

    useEffect(() => {
        // @ts-ignore
        window.api.response('initStore', dispatchInitStore); // cleanup this component
        return () => {
            // @ts-ignore
            window.api.removeListener('initStore', dispatchInitStore);
        };
    }, []);

    const createView = () => {
        const viewConfig: ViewConfig = {
            key: 0,
            url: 'https://soundcloud.com',
            coords: { x: 0, y: 0, width: 200, height: 200 },
        };
        // eslint-disable-next-line no-underscore-dangle
        // @ts-ignore
        window.api.request('createView', JSON.stringify(viewConfig));
    };

    return (
        <div>
            <DraggableView />
            <Button variant='contained' color='primary' onClick={createView}>
                Createview
            </Button>
        </div>
    );
};

export default HomePage;

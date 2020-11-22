import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { ViewConfig } from '../../store/views/types';
import { DraggableView } from './DraggableView';

const sameFunc = (data: string) => {
    console.log('called');
    console.log(data);
};

const HomePage: React.FunctionComponent = () => {
    useEffect(() => {
        // @ts-ignore
        window.api.response('initStore', sameFunc); // cleanup this component
        return () => {
            // @ts-ignore
            window.api.removeListener('initStore', sameFunc);
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

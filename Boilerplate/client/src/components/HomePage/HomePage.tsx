import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Draggable } from './Draggable';
import { DraggableView } from './DraggableView';

// eslint-disable-next-line no-underscore-dangle
// @ts-ignore
window.api.response('fromMain', (data) => {
    console.log(`Received ${data} from main prddocess`);
});

const convertString = (url: string) => {
    if (!/^http?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
};

const HomePage: React.FunctionComponent = () => {
    const [urlValue, setGreeting] = useState('soundcloud.com');

    const submitUrl = () => {
        // eslint-disable-next-line no-underscore-dangle
        // @ts-ignore
        window.api.request('addView', convertString(urlValue));
    };

    return (
        <div>
            <DraggableView/>
            {/* <Draggable>
                <h1>{convertString(urlValue)}</h1>
                <TextField label='Standard' type='text' value={urlValue} onChange={(event) => setGreeting(event.target.value)} />
                <Button variant='contained' color='primary' onClick={submitUrl}>
                    open Browser
                </Button>{' '}
            </Draggable> */}
        </div>
    );
};

export default HomePage;

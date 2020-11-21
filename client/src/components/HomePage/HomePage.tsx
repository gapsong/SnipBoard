import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Draggable } from './Draggable';

const HomePage: React.FunctionComponent = () => {
    const [greeting, setGreeting] = useState('testurl.com');

    const convertString = (url: string) => {
        if (!/^http?:\/\//i.test(url)) {
            return 'https://' + url;
        }
        return url;
    };

    const onClick = () => {
        // eslint-disable-next-line no-underscore-dangle
        // @ts-ignore
        window.api.response('fromMain', (data) => {
            console.log(`Received ${data} from main process`);
        });
        // eslint-disable-next-line no-underscore-dangle
        // @ts-ignore
        window.api.request('toMain', 'some data');
    };

    return (
        <div>
            <Draggable>
                <h1>{convertString(greeting)}</h1>
                <TextField label='Standard' type='text' value={greeting} onChange={(event) => setGreeting(event.target.value)} />
                <Button variant='contained' color='primary' onClick={onClick}>
                    open Browser
                </Button>{' '}
            </Draggable>
        </div>
    );
};

export default HomePage;

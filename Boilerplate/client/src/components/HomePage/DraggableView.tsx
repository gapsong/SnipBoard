import React, { useState, useRef } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Rnd } from 'react-rnd';
import { ViewConfig } from '../../common/types';


const convertString = (url: string) => {
    if (!/^http?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
};

const DraggableView: React.FunctionComponent = () => {
    const [urlValue, setGreeting] = useState('soundcloud.com');
    const [x, setX] = useState(10);
    const [y, setY] = useState(60);
    const [width, setWidth] = useState(1000);
    const [height, setHeight] = useState(200);

    const updateView = () => {
        const viewConfig: ViewConfig = {
            url: convertString(urlValue),
            coords: { x, y, width, height },
        };
        // eslint-disable-next-line no-underscore-dangle
        // @ts-ignore
        window.api.request('updateView', JSON.stringify(viewConfig));
    };

    return (
        <div
            style={{
                textAlign: 'center',
                width: '100%',
                position: 'fixed',
                top: 0,
                zIndex: 9000,
            }}
        >
            <Rnd
                style={{
                    border: 'solid 2px #ddd',
                }}
                size={{ width, height }}
                position={{ x, y }}
                onDrag={(e, d) => {
                    setX(d.x);
                    setY(d.y);
                    updateView();
                }}
                onDragStop={(e, d) => {
                    setX(d.x);
                    setY(d.y);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    setWidth(parseInt(ref.style.width));
                    setHeight(parseInt(ref.style.height));
                }}
            >
                BrowserView
                <div
                    style={{
                        position: 'fixed',
                        bottom: '-150px',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'solid 2px #ddd',
                    }}
                >
                    <h1>{convertString(urlValue)}</h1>
                    <TextField label='Standard' type='text' value={urlValue} onChange={(event) => setGreeting(event.target.value)} />
                    <Button variant='contained' color='primary' onClick={updateView}>
                        updateView{' '}
                    </Button>{' '}
                </div>
            </Rnd>
        </div>
    );
};
export { DraggableView };

import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Rnd } from 'react-rnd';
import { ViewConfig } from '@types';
import { useDispatch } from 'react-redux';
import { updateViewPosition } from '@src/app/store/view/action';

const convertString = (url: string) => {
    if (!/^http?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
};

const DraggableView: React.FunctionComponent<ViewConfig> = (prop) => {
    const dispatch = useDispatch();
    const id = prop.id;

    const [urlValue, setGreeting] = useState(prop.url);
    const [x, setX] = useState(prop.x);
    const [y, setY] = useState(prop.y);
    const [width, setWidth] = useState(prop.width);
    const [height, setHeight] = useState(prop.height);

    const dispatchViewPosition = () => {
        dispatch(
            updateViewPosition({
                id: id,
                url: convertString(urlValue),
                x,
                y,
                width,
                height,
            })
        );
    };
    const updateUrl = () => {
        // @ts-ignore
        window.api.request('updateUrl', JSON.stringify(convertString(urlValue)));
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
                }}
                onDragStop={() => {
                    dispatchViewPosition();
                }}
                onResize={(e, direction, ref, delta, position) => {
                    setWidth(parseInt(ref.style.width));
                    setHeight(parseInt(ref.style.height));
                    setX(position.x);
                    setY(position.y);
                }}
                onResizeStop={() => {
                    dispatchViewPosition();
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
                    <Button variant='contained' color='primary' onClick={updateUrl}>
                        update URl{urlValue}
                    </Button>{' '}
                </div>
            </Rnd>
        </div>
    );
};
export { DraggableView };

import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Rnd } from 'react-rnd';
import { ViewConfig } from '@types';
import { useDispatch } from 'react-redux';
import { updateViewPosition, updateUrl, deleteView } from '@src/app/store/view/action';

const DraggableView: React.FunctionComponent<ViewConfig> = (prop) => {
    const dispatch = useDispatch();
    const id = prop.id;
    const [urlValue, setUrl] = useState(prop.url);
    const [x, setX] = useState(prop.x);
    const [y, setY] = useState(prop.y);
    const [width, setWidth] = useState(prop.width);
    const [height, setHeight] = useState(prop.height);

    const dispatchViewPosition = () => {
        dispatch(
            updateViewPosition({
                id: id,
                url: urlValue,
                x,
                y,
                width,
                height,
            })
        );
    };

    const dispatchUrl = () => {
        const prefix = 'https://';
        let temp;
        if (urlValue.substr(0, prefix.length) !== prefix) {
            temp = prefix + urlValue;
        }
        dispatch(updateUrl(id, temp));
    };

    const dispatchDelete = () => {
        dispatch(deleteView(id));
    };

    const dispatchCrop = () => {
        dispatch(deleteView(id));
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
                onDragStop={dispatchViewPosition}
                onResize={(e, direction, ref, delta, position) => {
                    setWidth(parseInt(ref.style.width));
                    setHeight(parseInt(ref.style.height));
                    setX(position.x);
                    setY(position.y);
                }}
                onResizeStop={dispatchViewPosition}
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
                    <TextField
                        label='Standard'
                        type='text'
                        value={urlValue}
                        onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === 'Enter') {
                                // Do code here
                                ev.preventDefault();
                                dispatchUrl();
                            }
                        }}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Button variant='contained' color='primary' onClick={dispatchDelete}>
                        Delete View
                    </Button>
                    <Button variant='contained' color='primary' onClick={dispatchCrop}>
                        Crop View
                    </Button>
                </div>
            </Rnd>
        </div>
    );
};
export { DraggableView };

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { deleteView, onDragStart, onDragEnd, dragView } from '@src/app/store/view/action';
import Draggable from 'react-draggable';

const initStyle = { x: 0, y: 0, width: '100%', height: '100%', background: 'red' };
const BrowserView: React.FunctionComponent = () => {
    const id = window.location.search.replace('?bvid=', '');
    const dispatch = useDispatch();
    const [urlValue, setUrl] = useState('https://github.com/gapsong/');
    const [shownUrl, setShownUrl] = useState(urlValue);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [bvStyle, setBvStyle] = useState(initStyle);

    const dispatchDelete = () => {
        dispatch(deleteView(id));
    };

    const fetchUrl = () => {
        const prefix = 'https://';
        let temp;
        if (urlValue.substr(0, prefix.length) !== prefix) {
            temp = prefix + urlValue;
        }
        setShownUrl(temp);
    };

    return (
        <Draggable
            defaultPosition={{ x: 0, y: 0 }}
            position={{ x, y }}
            onStart={(event, data) => {
                setX(data.x);
                setY(data.y);
                dispatch(onDragStart(id));
                setBvStyle({ x: 0, y: 0, width: `${data.node.clientWidth}px`, height: `${data.node.clientHeight}px`, background: 'green' });
                setWidth(data.node.clientWidth);
                setHeight(data.node.clientHeight);
            }}
            onDrag={(event, data) => {
                dispatch(
                    dragView({
                        id: id,
                        url: '123',
                        x: data.x,
                        y: data.y,
                        width,
                        height,
                    })
                );
            }}
            onStop={(event, data) => {
                dispatch(
                    onDragEnd({
                        id: id,
                        x: data.x,
                        y: data.y,
                    })
                );
                setX(0);
                setY(0);
                setBvStyle(initStyle);
            }}
        >
            <div style={bvStyle}>
                <TextField
                    label='Standard'
                    type='text'
                    value={urlValue}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            fetchUrl();
                        }
                    }}
                    onChange={(event) => setUrl(event.target.value)}
                />
                <Button variant='contained' color='primary' onClick={dispatchDelete}>
                    Delete BrowserView
                </Button>
                <webview id='wv1' src={shownUrl}></webview>
            </div>
        </Draggable>
    );
};

export { BrowserView };

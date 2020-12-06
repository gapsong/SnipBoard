import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { deleteView, onDragStart, onDragEnd } from '@src/app/store/view/action';
import { Rnd } from 'react-rnd';

const BrowserView: React.FunctionComponent = () => {
    const id = window.location.search.replace('?bvid=', '');
    const dispatch = useDispatch();
    const [urlValue, setUrl] = useState('https://github.com/gapsong/');
    const [shownUrl, setShownUrl] = useState(urlValue);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [bvStyle, setBvStyle] = useState({ x: 0, y: 0, width: '100%', height: '100%', background: 'red' });

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
        <Rnd
            id='Wrapper'
            default={bvStyle}
            position={{ x, y }}
            onDragStart={(event, data) => {
                setX(data.x);
                setY(data.y);
                dispatch(onDragStart(id));
                setBvStyle({ x: 0, y: 0, width: `${data.node.clientWidth}px`, height: `${data.node.clientHeight}px`, background: 'green' });
            }}
            onDragStop={(event, data) => {
                dispatch(
                    onDragEnd({
                        id: id,
                        x: data.x,
                        y: data.y,
                    })
                );
                setX(0);
                setY(0);
                setBvStyle({ x: 0, y: 0, width: '100%', height: '100%', background: 'red' });
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
        </Rnd>
    );
};

export { BrowserView };

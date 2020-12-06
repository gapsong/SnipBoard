import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { deleteView, dragView, onDragStart, onDragEnd } from '@src/app/store/view/action';
import { Rnd } from 'react-rnd';

const preventGhostImage = (event) => {
    //prevent ghostimage
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(img, 0, 0);
};

const BrowserView: React.FunctionComponent = () => {
    const id = window.location.search.replace('?bvid=', '');

    const dispatch = useDispatch();

    const [urlValue, setUrl] = useState('https://github.com/gapsong/');
    const [shownUrl, setShownUrl] = useState(urlValue);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

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
        // Wrapper
        <Rnd
            id='Wrapper'
            className='appWrapper'
            position={{ x, y }}
            onDragStart={(event, data) => {
                setX(data.x);
                setY(data.y);
                dispatch(onDragStart(id));
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
            }}
        >
            {/* Toolbar */}
            <div>
                <TextField
                    label='Standard'
                    type='text'
                    value={urlValue}
                    onKeyPress={(ev) => {
                        console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === 'Enter') {
                            // Do code here
                            ev.preventDefault();
                            fetchUrl();
                        }
                    }}
                    onChange={(event) => setUrl(event.target.value)}
                />
                <Button variant='contained' color='primary' onClick={dispatchDelete}>
                    Delete BrowserView
                </Button>
            </div>
            <webview className='appWrapper' id='wv1' src={shownUrl}></webview>
        </Rnd>
    );
};

export { BrowserView };

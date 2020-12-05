import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { deleteView, dragView, onDragStart, onDragEnd } from '@src/app/store/view/action';

const preventGhostImage = (event) => {
    //prevent ghostimage
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(img, 0, 0);
};
const BrowserView: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const id = window.location.search.replace('?bvid=', '');

    const dispatchDelete = () => {
        dispatch(deleteView(id));
    };

    const [urlValue, setUrl] = useState('https://github.com/gapsong/');
    const [isDragging, setIsDragging] = useState(false);
    const [shownUrl, setShownUrl] = useState(urlValue);
    const [cursorStartX, setCursorStartX] = useState(0);
    const [cursorStartY, setCursorStartY] = useState(0);

    const fetchUrl = () => {
        const prefix = 'https://';
        let temp;
        if (urlValue.substr(0, prefix.length) !== prefix) {
            temp = prefix + urlValue;
        }
        setShownUrl(temp);
    };

    const dragTask = (event) => {
        if (event.pageX !== 0 && event.pageY !== 0) {
            dispatch(
                dragView({
                    id: id,
                    deltaX: event.pageX - dragX,
                    deltaY: event.pageY - dragY,
                })
            );
        }
    };
    return (
        <div className='appWrapper'>
            <div
                id='23'
                draggable='true'
                onDragStart={(event) => {
                    setIsDragging(true);
                    preventGhostImage(event);
                    dispatch(onDragStart(id));
                    setCursorStartX(event.pageX);
                    setCursorStartY(event.pageY);
                }}
                onDrag={(event) => {
                    console.log('ondrag');
                    console.log(event.pageX);
                    console.log(event.pageY);
                    console.log(isDragging);
                }}
                onDragEnd={(event) => {
                    setIsDragging(false);
                    dispatch(
                        onDragEnd({
                            id: id,
                            deltaX: event.pageX - cursorStartX,
                            deltaY: event.pageY - cursorStartY,
                        })
                    );
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
                            fetchUrl();
                        }
                    }}
                    onChange={(event) => setUrl(event.target.value)}
                />
                <Button variant='contained' color='primary' onClick={dispatchDelete}>
                    Delete BrowserView
                </Button>
            </div>
            {!isDragging && (
                <div
                    className='appWrapper'
                    dangerouslySetInnerHTML={{ __html: `<webview class=appWrapper id=wv1 src=${shownUrl}></webview>` }}
                />
            )}
        </div>
    );
};

export { BrowserView };

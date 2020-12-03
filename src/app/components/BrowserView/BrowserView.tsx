import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { deleteView, dragView } from '@src/app/store/view/action';

const BrowserView: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const id = window.location.search.replace('?bvid=', '');

    const dispatchDelete = () => {
        dispatch(deleteView(id));
    };

    const [urlValue, setUrl] = useState('https://github.com/gapsong/SnipBoard/projects/1');
    const [shownUrl, setShownUrl] = useState(urlValue);

    const fetchUrl = () => {
        const prefix = 'https://';
        let temp;
        if (urlValue.substr(0, prefix.length) !== prefix) {
            temp = prefix + urlValue;
        }
        setShownUrl(temp);
    };

    const dragTask = (event) => {
        dispatch(
            dragView({
                id: id,
                cursorX: event.screenX,
                cursorY: event.screenY,
            })
        );
        console.log('logic goes herex', event.screenX);
        console.log('logic goes herey', event.screenY);
    };
    return (
        <div className='appWrapper'>
            <div
                draggable
                key={123}
                onDrag={(event) => {
                    dragTask(event);
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
            <div
                className='appWrapper'
                dangerouslySetInnerHTML={{ __html: `<webview class=appWrapper id=wv1 src=${shownUrl}></webview>` }}
            />
        </div>
    );
};

export { BrowserView };

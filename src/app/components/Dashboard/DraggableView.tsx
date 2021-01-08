import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Rnd } from 'react-rnd';
import { ViewConfig } from '@types';
import { useDispatch } from 'react-redux';
import { Webview } from '@app/components/Webview/Webview';
import { IpcMessageEvent, WebviewTag } from 'electron';
import { updateViewPosition, deleteView } from '@src/app/store/view/action';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    })
);

const DraggableView: React.FunctionComponent<{ zIndex: number } & ViewConfig> = ({ zIndex, id, url, rect }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [urlValue, setUrl] = useState(url);
    const [shownUrl, setShownUrl] = useState('https://de.wikipedia.org/wiki/Tiger');
    const [x, setX] = useState(rect.x);
    const [y, setY] = useState(rect.y);
    const [width, setWidth] = useState(rect.width);
    const [height, setHeight] = useState(rect.height);

    const dispatchViewPosition = () => {
        dispatch(
            updateViewPosition({
                id: id,
                url: urlValue,
                rect: {
                    x,
                    y,
                    width,
                    height,
                },
            })
        );
    };

    const dispatchDelete = () => {
        dispatch(deleteView(id));
    };

    const cropView = () => {
        const wv = document.getElementById(id) as WebviewTag;
        wv.addEventListener('ipc-message', (event: IpcMessageEvent) => {
            console.log(event.channel);
        });

        wv.executeJavaScript(`var isHover = false;
        var rect = {
            x: 0,
            y: 0,
            pageX: 100,
            pageY: 100,
        };
        
        const createViewport = () => {
            const VIEWPORT_ID = 'custom-viewport';
            if (document.getElementById(VIEWPORT_ID) == null) {
                const viewport = document.createElement('div');
                viewport.id = VIEWPORT_ID;
                viewport.style.position = 'absolute';
                viewport.style.border = 'solid';
                viewport.style.width = rect.pageX - rect.x + 'px';
                viewport.style.height = rect.pageY - rect.y + 'px';
                viewport.style.left = rect.x + 'px';
                viewport.style.top = rect.y + 'px';
                viewport.style.zIndex = '500';
                function mouseOver() {
                    isHover = true;
                }
        
                function mouseOut() {
                    isHover = false;
                }
                viewport.addEventListener('mouseover', mouseOver);
                viewport.addEventListener('mouseout', mouseOut);
        
                document.body.appendChild(viewport);
            }
        };
        
        const createMenu = () => {
            const BUTTON_ID = 'button-id';
            if (document.getElementById(BUTTON_ID) == null) {
                const button = document.createElement('input');
                button.id = BUTTON_ID;
                button.type = 'button';
                button.value = 'text';
                button.style.position = 'absolute';
                button.style.left = '0px';
                button.style.top = '0px';
                button.style.zIndex = '500';
                button.addEventListener('click', function () {
                    document.documentElement.style.cursor = 'crosshair';
                    console.log('crosshair');
                });
                document.body.appendChild(button);
            }
        };
        
        const init = () => {
            createMenu();
            createViewport();
        };
        
        const updateViewport = (rect) => {
            const viewport = document.getElementById('custom-viewport');
            viewport.style.width = rect.pageX - rect.x + 'px';
            viewport.style.height = rect.pageY - rect.y + 'px';
            viewport.style.top = rect.y + 'px';
            viewport.style.left = rect.x + 'px';
            return viewport;
        };
        
        document.body.addEventListener('mousedown', (e) => {
            if (!isHover) {
                rect = { ...rect, x: e.pageX, y: e.pageY };
                updateViewport({ x: 0, y: 0, pageX: 0, pageY: 0 });
            }
        });
        
        document.body.addEventListener('mouseup', (e) => {
            if (!isHover) {
                rect = { ...rect, pageX: e.pageX, pageY: e.pageY };
                updateViewport(rect);
                const body = {
                    url: window.location.href,
                    rect,
                    browserSettings: {
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight,
                        scrollTop: document.documentElement.scrollTop,
                        scrollLeft: document.documentElement.scrollLeft,
                    },
                };
        
                postViewport(body);
            }
        });
        
        const postViewport = (body) => {
            console.log('send', body)
            window.api.request(JSON.stringify(body)); 
        }

        function dragElement(elmnt) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (document.getElementById(elmnt.id + 'header')) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }
        
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
        
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
                elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
            }
        
            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        init();
        `);
    };

    return (
        <div
            style={{
                textAlign: 'center',
                width: '100%',
                position: 'fixed',
                top: 0,
                zIndex: zIndex,
            }}
        >
            <Rnd
                style={{
                    border: 'solid 2px #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '5px',
                    background: 'white',
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
                    dispatchViewPosition();
                }}
                onResizeStop={dispatchViewPosition}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'content' }}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                const wv = document.getElementById(id) as WebviewTag;
                                if (wv.canGoBack()) {
                                    wv.goBack();
                                }
                            }}
                        >
                            {`<`}
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                const wv = document.getElementById(id) as WebviewTag;
                                wv.goForward();
                            }}
                        >
                            {`>`}
                        </Button>
                    </div>

                    <TextField
                        type='url'
                        value={urlValue}
                        variant='outlined'
                        onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === 'Enter') {
                                // Do code here
                                ev.preventDefault();
                                const prefix = 'https://';
                                let temp;
                                if (urlValue.substr(0, prefix.length) !== prefix) {
                                    temp = prefix + urlValue;
                                }
                                setShownUrl(temp);
                            }
                        }}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Button variant='contained' color='primary' onClick={cropView}>
                        Crop
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            const wv = document.getElementById(id) as WebviewTag;
                            wv.openDevTools();
                        }}
                    >
                        Dev Tools View
                    </Button>
                    <Button variant='contained' color='primary' onClick={dispatchDelete}>
                        X{' '}
                    </Button>
                </div>
                <Webview id={id} url={shownUrl} />
                <div>Footnote</div>
            </Rnd>
        </div>
    );
};
export { DraggableView };

import React, { useState } from 'react';
import { WebviewTag } from 'electron';
import { TextField, Button } from '@material-ui/core';
import { Rnd } from 'react-rnd';
import { ViewConfig } from '@types';
import { useDispatch } from 'react-redux';
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

const DraggableView: React.FunctionComponent<ViewConfig> = (prop) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = prop.id;
    const [urlValue, setUrl] = useState(prop.url);
    const [shownUrl, setShownUrl] = useState('https://soundcloud.com');
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

    const dispatchDelete = () => {
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
                    display: 'flex',
                    flexDirection: 'column',
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
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => {
                                        const wv = document.getElementById('webview1');
                                        (wv as WebviewTag).goBack();
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => {
                                        const wv = document.getElementById('webview1');
                                        (wv as WebviewTag).goForward();
                                    }}
                                >
                                    Forward
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <TextField
                                    label='Standard'
                                    type='text'
                                    value={urlValue}
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
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Button variant='contained' color='primary' onClick={dispatchDelete}>
                                    Delete View
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <webview id='webview1' style={{ width: '100%', height: '100%', minHeight: '100px' }} src={shownUrl} />
                <div>Footnote</div>
            </Rnd>
        </div>
    );
};
export { DraggableView };

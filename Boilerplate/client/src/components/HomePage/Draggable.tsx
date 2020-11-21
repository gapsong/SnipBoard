import React from 'react';
import { Rnd } from 'react-rnd';

interface Props {
    children?: React.ReactNode;
}

interface State {
    width: number | string;
    height: number | string;
    x: number;
    y: number;
}

const updateViewPosition = (viewport: State) => {
    // eslint-disable-next-line no-underscore-dangle
    // @ts-ignore
    window.api.request('updateViewPosition', JSON.stringify(viewport));
};



class Draggable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            width: 1000,
            height: 200,
            x: 10,
            y: 10,
        };
    }

    render() {
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'solid 2px #ddd',
                    }}
                    size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={(e, d) => {
                        this.setState({ x: d.x, y: d.y }, () => updateViewPosition(this.state));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState(
                            {
                                width: ref.style.width,
                                height: ref.style.height,
                                ...position,
                            },
                            () => updateViewPosition(this.state)
                        );
                    }}
                >
                    {this.props.children}{' '}
                </Rnd>
            </div>
        );
    }
}

export { Draggable };

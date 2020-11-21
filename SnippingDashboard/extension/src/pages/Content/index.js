import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Rnd } from 'react-rnd';

if (document.getElementById('app-container') == null) {
  const viewport = document.createElement('div');
  viewport.id = 'app-container';
  document.body.appendChild(viewport);
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
      x: 10,
      y: 10,
    };
  }

  postViewport = (rect) => {
    console.log(rect)
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
    console.log(body);

    fetch('http://localhost:4000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

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
        <button onClick={() => this.postViewport(this.state)}>Fetch</button>{' '}
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
            console.log(d)
            this.setState({ x: d.x, y: d.y });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            console.log(delta)
            this.setState({
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            });
          }}
        >
          Viewport
        </Rnd>
      </div>
    );
  }
}

render(<App />, window.document.querySelector('#app-container'));

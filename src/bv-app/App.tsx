import React from 'react';
import './App.css';
import { DashboardActionTypes } from '@src/app/store/view/types';


function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.{DashboardActionTypes.CREATE_VIEW}
                </p>
                <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;

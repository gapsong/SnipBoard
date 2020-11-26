import React from 'react';
import { render, screen } from 'test-utils';
import Dashboard from '../Dashboard';

describe('Test Home Page Component', () => {
    it('can render without crashing', () => {
        render(<Dashboard />);
        expect(screen.getByText('Welcome to the Boilerplate of React/Express/Electron Application')).toBeInTheDocument();
    });
});

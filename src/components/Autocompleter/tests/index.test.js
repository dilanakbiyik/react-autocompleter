import React from 'react';
import ReactDOM from 'react-dom';
import Autocompleter from "../Autocompleter";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Autocompleter />, div);
});

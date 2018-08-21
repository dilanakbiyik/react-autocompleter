import React from 'react';

import './Loader.css';

class Loader extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="loader">
                <div className="loader-area">
                    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
                        <circle id="loading-inner" cx="75" cy="75" r="60"/>
                    </svg>
                </div>
            </div>
        );
    }
}

export default Loader;
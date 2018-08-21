import React from 'react';
import {
    MdSearch
} from 'react-icons/md/index';

import './style.css';

class Autocompleter extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="Autocompleter">
                <div className="search-area">
                    <form>
                        <input type="text" placeholder={'Zoeken'} />
                    </form>
                    <MdSearch size={25} />
                </div>
            </div>
        );
    }
}

export default Autocompleter;
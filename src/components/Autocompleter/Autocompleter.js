import React from 'react';
import {
    MdSearch
} from 'react-icons/md/index';

import './style.css';

class Autocompleter extends React.Component {
    componentDidMount(){
        this.searchInput.focus();
    }
    render() {
        return (
            <div className="Autocompleter">
                <div className="search-area">
                    <form>
                        <input ref={(input) => { this.searchInput = input; }} type="text" placeholder={'Zoeken'} />
                    </form>
                    <MdSearch size={25} />
                </div>
            </div>
        );
    }
}

export default Autocompleter;
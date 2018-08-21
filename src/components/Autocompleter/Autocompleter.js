import React from 'react';
import {
    MdSearch,
    MdClear
} from 'react-icons/md/index';

import './style.css';

class Autocompleter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            showClearButton: false
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }
    handleSearchChange(event) {
        this.setState({
            search: event.target.value,
            showClearButton: !!event.target.value
        });
    }
    clearInput(){
        this.setState({
            search: '',
            showClearButton: false
        });
    }
    componentDidMount(){
        this.searchInput.focus();
    }
    render() {
        const { showClearButton, search } = this.state;
        let clearButton = null;
        if(showClearButton === true){
            clearButton = <MdClear onClick={this.clearInput} size={25} />
        }
        return (
            <div className="Autocompleter">
                <div className="search-area">
                    <form>
                        <input ref={(input) => { this.searchInput = input; }}
                               value={search}
                               onChange={this.handleSearchChange}
                               type="text"
                               placeholder={'Zoeken'} />
                    </form>
                    {clearButton}
                    <MdSearch size={25} />
                </div>
            </div>
        );
    }
}

export default Autocompleter;
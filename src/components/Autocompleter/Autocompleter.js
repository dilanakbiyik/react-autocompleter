import React from 'react';
import {
    MdSearch,
    MdClear
} from 'react-icons/md/index';

import './style.css';

const URL = 'http://localhost:5000/search';

class Autocompleter extends React.Component {
    timer = null;
    constructor(props){
        super(props);
        this.state = {
            search: '',
            showClearButton: false,
            loading: false,
            data: null
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
    }
    handleSearchChange(event) {
        clearTimeout(this.timer);
        if(this.state.search.length > 1){
            this.setState({
                search: event.target.value,
                showClearButton: !!event.target.value
            });
            this.timer = setTimeout(this.loadFromServer, 1000);
        }else{
            this.setState({
                search: event.target.value,
                showClearButton: !!event.target.value,
                data: null,
                loading: false
            });
        }
    }
    clearInput(){
        this.setState({
            search: '',
            showClearButton: false,
            data: null,
            loading: false
        });
    }
    componentDidMount(){
        this.searchInput.focus();
    }
    loadFromServer(){
        fetch(`${URL}?q=${this.state.search}`)
            .then(response => response.json())
            .then(data => this.setState({ ...this.state, data, loading: false }));
    }
    showData(){
        if(this.state.data && this.state.data.suggestions){
            return (
                <ul>
                    {this.state.data.suggestions
                        .filter((val) => val.searchterm.indexOf(this.state.search) > -1)
                        .map((val, i)=> <li key={`sug${i}`}>{this.splitSearchterm(val.searchterm)}  (<b>{val.nrResults}</b>)</li>)}
                </ul>
            )
        }
        return null;
    }
    splitSearchterm(term){
        const terms = term.split(this.state.search);
        return (
            <label>
                {terms[0]}
                <span>{this.state.search}</span>
                {terms[1]}
            </label>
        )
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
                {this.showData()}
            </div>
        );
    }
}

export default Autocompleter;
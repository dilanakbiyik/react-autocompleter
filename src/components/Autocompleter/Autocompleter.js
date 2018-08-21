import React from 'react';
import {
    MdSearch,
    MdClear
} from 'react-icons/md/index';

import './style.css';
import Loader from "../Loader/Loader";

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
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleKeyUp(){
        clearTimeout(this.timer);
        if(this.state.search.length > 2){
            this.timer = setTimeout(this.loadFromServer, 1000);
        }
    }
    handleSearchChange(event) {
        if(event.target.value.length > 2){
            this.setState({
                search: event.target.value,
                showClearButton: !!event.target.value
            });
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
        this.setState({
            loading: true,
            data: null
        });
        fetch(`${URL}?q=${this.state.search}`)
            .then(response => response.json())
            .then(data => this.setState({ ...this.state, data, loading: false }));
    }
    showData(){
        if(this.state.data && this.state.data.suggestions){
            const datas = this.state.data.suggestions
                .filter((val) => val.searchterm.indexOf(this.state.search) > -1);
            if(datas.length > 0){
                return (
                    <ul>
                        {
                            datas.map((val, i)=> <li key={`sug${i}`}>{this.splitSearchterm(val.searchterm)}  (<b>{val.nrResults}</b>)</li>)}
                    </ul>
                )
            }else{
                return (
                    <ul>
                        <li>There is no match!</li>
                    </ul>
                )
            }
        }
        return null;
    }
    showLoading(){
        if(this.state.loading === true){
            return <Loader />
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
                               onKeyUp={this.handleKeyUp}
                               type="text"
                               placeholder={'Zoeken'} />
                    </form>
                    {clearButton}
                    <MdSearch size={25} />
                </div>
                {this.showData()}
                {this.showLoading()}
            </div>
        );
    }
}

export default Autocompleter;
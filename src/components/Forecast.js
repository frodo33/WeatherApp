import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import Today from './forecast/Today';
import Week from './forecast/Week';
import Error from './forecast/Error';

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isoCodes: [],
            selected: '',
            inputVal: '',
            code: '',
            forecast: null,
            city: '',
            ok: true,
            more: false,
            buttonText: 'Load More'
        }

    }

    componentDidMount() {
        const db = firebase.database();

        db.ref('/isocodes').on('value', (snap) => {
            const data = snap.val();

            this.setState({
                isoCodes: this.state.isoCodes.concat(data)
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            selected: e.currentTarget.value
        })
        this.state.isoCodes.map(el => {
            if (el.name === e.currentTarget.value) {
                this.setState({
                    code: el['alpha-2']
                })
            }
        })
    }

    handleInputChange = (e) => {
        this.setState({
            inputVal: e.currentTarget.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        axios.get(`https://api.aerisapi.com/forecasts/${this.state.inputVal},${this.state.code}?client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=ivUH2JTtotXlCJa9xnEn19f7rK43x75wDaHFjWic`)
            .then(res => {
                this.setState({
                    forecast: res.data.success == false ? null : res.data.response,
                    city: this.state.inputVal,
                    ok: res.data.success == false ? false : true,
                    inputVal: '',
                })
            })
    }

    loadMore = () => {
        this.setState({
            more: this.state.more ? false : true,
            buttonText: 'Hide'
        })
    }

    render() {
        const options = this.state.isoCodes.map((e, i) => {
            return <option key={i}>{e.name}</option>
        })

        return (
            <div>
                <h1 className='title'>Check the weather in:</h1>
                <form>
                    <div className='search-input'>
                        <input value={this.state.inputVal} onChange={this.handleInputChange} type="text"
                               placeholder='Your city'/>
                    </div>
                    <div className='form-select'>
                        <select value={this.state.selected} onChange={this.handleChange}>
                            {options}
                        </select>
                    </div>
                    <div className='submit-button'>
                        <button onClick={this.handleClick}>Search</button>
                    </div>
                </form>
                {
                    !this.state.forecast
                        ? this.state.ok ? null : <Error />
                        : <div className='cards-container'>
                            <Today data={this.state.forecast[0].periods[0]} city={this.state.city}/>
                            <button className='load-more' onClick={this.loadMore}>{this.state.buttonText}</button>
                            {this.state.more ? <Week data={this.state.forecast} city={this.state.city}/> : null}

                        </div>
                }
            </div>
        )
    }
}

export default Forecast;
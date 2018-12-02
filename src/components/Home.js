import React from 'react';
import axios from "axios";
import firebase from "firebase";
import DayCard from './forecast/DayCard';
import NightCard from './forecast/NightCard';
import Error from './forecast/Error';
import NextDays from './forecast/NextDays';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            long: null,
            lat: null,
            dayForecast: null,
            nightForecast: null,
            city: null,
            isoCodes: [],
            selected: '',
            inputVal: '',
            code: '',
            checkQuery: true,
            forecast: null,
        }
    }

    render() {
        const date = new Date().getHours();
        const options = this.state.isoCodes.map((e, i) => {
            return <option key={i}>{e.name}</option>
        })

        return (
            <div className='home-container'>
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
                    this.state.dayForecast !== null && this.state.nightForecast !== null
                        ? <>
                            <section className='cards'>
                                {
                                    date > 7 && date < 19
                                        ? <>
                                            <DayCard city={this.state.city} data={this.state.dayForecast}/>
                                            <NightCard city={this.state.city} data={this.state.nightForecast}/>
                                        </>
                                        : <>
                                            <NightCard city={this.state.city} data={this.state.nightForecast}/>
                                            <DayCard city={this.state.city} data={this.state.dayForecast}/>
                                        </>
                                }
                            </section>
                            <NextDays day={this.state.dayForecast} night={this.state.nightForecast} />
                        </>


                        : this.state.checkQuery
                        ? <div className='loader-asd'>
                            {
                                date > 7 && date < 19
                                    ? <div><img src={require("../images/001-sunny.svg")} alt=""/></div>
                                    : <div><img src={require("../images/moon.svg")} alt=""/></div>
                            }
                        </div>
                        : <Error/>
                }
            </div>
        )
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                long: pos.coords.longitude,
                lat: pos.coords.latitude
            })
            axios.get(`https://api.aerisapi.com/forecasts/${this.state.lat},${this.state.long}?filter=daynight&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=ivUH2JTtotXlCJa9xnEn19f7rK43x75wDaHFjWic`)
                .then(res => {
                    this.setState({
                        dayForecast: res.data.response[0].periods.filter(el => el.isDay),
                        nightForecast: res.data.response[0].periods.filter(el => el.isDay == false),
                        city: res.data.response[0].profile.tz.split('/')[1].replace('_', ' ')
                    })
                })

        }, err => {
            this.setState({
                lat: 40.7142700,
                long: -74.0059700
            })

            axios.get(`https://api.aerisapi.com/forecasts/${this.state.lat},${this.state.long}?filter=daynight&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=ivUH2JTtotXlCJa9xnEn19f7rK43x75wDaHFjWic`)
                .then(res => {
                    this.setState({
                        dayForecast: res.data.response[0].periods.filter(el => el.isDay),
                        nightForecast: res.data.response[0].periods.filter(el => el.isDay == false),
                        city: res.data.response[0].profile.tz.split('/')[1].replace('_', ' ')
                    })
                })

        })
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
        axios.get(`https://api.aerisapi.com/forecasts/${this.state.inputVal},${this.state.code}?filter=daynight&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=ivUH2JTtotXlCJa9xnEn19f7rK43x75wDaHFjWic`)
            .then(res => {
                console.log(res);
                this.setState({
                    dayForecast: res.data.success == false ? null : res.data.response[0].periods.filter(el => el.isDay),
                    nightForecast: res.data.success == false ? null : res.data.response[0].periods.filter(el => el.isDay == false),
                    city: res.data.success == false ? null : res.data.response[0].profile.tz.split('/')[1].replace('_', ' '),
                    checkQuery: res.data.success == false ? false : true,
                    //
                    // long: res.data.response[0].loc.long,
                    // lat: res.data.response[0].loc.lat,
                    inputVal: ''
                })
            })
    }

}

export default Home;
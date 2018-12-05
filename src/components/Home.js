import React from 'react';
import axios from "axios";
import DayCard from './forecast/DayCard';
import NightCard from './forecast/NightCard';
import Error from './forecast/Error';
import NextDays from './forecast/NextDays';
const apiGeocode = process.env.REACT_APP_GEO_KEY;
const apiWeather = process.env.REACT_APP_WEATHER_KEY;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            long: null,
            lat: null,
            dayForecast: null,
            nightForecast: null,
            city: null,
            inputVal: '',
            checkQuery: true,
            forecast: null,
            more: false,
            buttonText: 'Load More'
        }
    }

    render() {
        let date = this.state.dayForecast !== null && eval(new Date().getUTCHours() + this.state.dayForecast[0].dateTimeISO.slice(19,20) + Number(this.state.dayForecast[0].dateTimeISO.slice(20,22)));
        date = date > 24 ? date - 24 : date;

        return (
            <div className='home-container'>
                <h1 className='title'>Check the weather in:</h1>
                <form>
                    <div className='search-input'>
                        <input value={this.state.inputVal} onChange={this.handleInputChange} type="text"
                               placeholder='Your city'/>
                    </div>
                    <div className='submit-button'>
                        <button onClick={this.handleClick}>Search</button>
                    </div>
                </form>

                {
                    (this.state.dayForecast !== null && this.state.nightForecast !== null)
                        ? <>
                            <section className='cards'>
                                {
                                    (date > 7 && date < 19)
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
                            <button className='load-more' onClick={this.loadMore}>{this.state.buttonText}</button>
                            {this.state.more ? <NextDays day={this.state.dayForecast} night={this.state.nightForecast} /> : null}
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
            axios.get(`https://api.aerisapi.com/forecasts/${this.state.lat},${this.state.long}?filter=daynight&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=${apiWeather}`)
                .then(res => {
                    this.setState({
                        dayForecast: res.data.response[0].periods.filter(el => el.isDay),
                        nightForecast: res.data.response[0].periods.filter(el => el.isDay == false)
                    })

                    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.lat}+${this.state.long}&key=${apiGeocode}`)
                })
                .then(res => {
                    this.checkCity(res)
                })

        }, err => {
            this.setState({
                lat: 40.7142700,
                long: -74.0059700
            })

            axios.get(`https://api.aerisapi.com/forecasts/${this.state.lat},${this.state.long}?filter=daynight&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=${apiWeather}`)
                .then(res => {
                    this.setState({
                        dayForecast: res.data.response[0].periods.filter(el => el.isDay),
                        nightForecast: res.data.response[0].periods.filter(el => el.isDay == false),
                        city: 'New York'
                    })
                })

        })
    }

    handleClick = (e) => {
        e.preventDefault();
        axios.get(`https://api.aerisapi.com/forecasts/${this.state.inputVal},?filter=daynight&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=${apiWeather}`)
            .then(res => {
                this.setState({
                    dayForecast: res.data.success == false ? null : res.data.response[0].periods.filter(el => el.isDay),
                    nightForecast: res.data.success == false ? null : res.data.response[0].periods.filter(el => el.isDay == false),
                    checkQuery: res.data.success == false ? false : true,
                    long: res.data.success == true ? res.data.response[0].loc.long : this.state.long,
                    lat: res.data.success == true ? res.data.response[0].loc.lat : this.state.lat,
                    inputVal: ''
                })
                return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.lat}+${this.state.long}&key=${apiGeocode}`)
            })
            .then(res => {
                this.checkCity(res);
            })
    }

    handleInputChange = (e) => {
        this.setState({
            inputVal: e.currentTarget.value
        })
    }

    loadMore = () => {
        this.setState({
            more: this.state.more ? false : true,
            buttonText: this.state.more ? 'Load More' : 'Hide'
        })
    }

    checkCity = (p) => {
        const data = p.data.results[0].components;
        if(data.hasOwnProperty('city')) {
            this.setState({
                city: data.city
            })
        }

        else if (data.hasOwnProperty('town')) {
            this.setState({
                city: data.town
            })
        }

        else if (data.hasOwnProperty('village')) {
            this.setState({
                city: data.village
            })
        }
    }
}

export default Home;
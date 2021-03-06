import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
const apiMap = process.env.REACT_APP_GOOGLE_KEY;
const apiWeather = process.env.REACT_APP_WEATHER_KEY;

const AnyReactComponent = () => (
    <div><img style={{width: '15px'}} src={require('../images/lightning.svg')} alt='+'/></div>
)
class Africa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightnings: []
        }

    }

    static defaultProps = {
        center: {
            lat: 11.99435,
            lng: 8.51381
        },
        zoom: 4
    };

    render() {
        console.log(this.props.mapKeye);
        const markers = this.state.lightnings.map((el,i) => {
            return <AnyReactComponent key={i} lat={el.loc.lat} lng={el.loc.long}/>
        })

        return (
            <div className='maps-container'>
                <div className='maps'>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: `${apiMap}` }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {markers}
                    </GoogleMapReact>
                    <button className='load-more' onClick={() => window.location.reload(true)}>Refresh</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        axios.get(`https://api.aerisapi.com/lightning/kano,ng?radius=999999miles&limit=1000&sort=dt:-1&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=${apiWeather}`)
            .then(res => {
                this.setState({
                    lightnings: res.data.response
                })
            })
    }
}

export default Africa;
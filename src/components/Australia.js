import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
const apiMap = process.env.REACT_APP_GOOGLE_KEY;
const apiWeather = process.env.REACT_APP_WEATHER_KEY;

const AnyReactComponent = ({ text }) => (
    <div><img style={{width: '15px'}} src={require('../images/lightning.svg')} alt='+'/></div>
)

class Australia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightnings: []
        }

    }
    static defaultProps = {
        center: {
            lat: -34.93333,
            lng: 138.6
        },
        zoom: 4
    };

    render() {
        const markers = this.state.lightnings.map((el,i) => {
            return <AnyReactComponent key={el.id} lat={el.loc.lat} lng={el.loc.long} />
        });

        return (

            // Important! Always set the container height explicitly
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
        axios.get(`https://api.aerisapi.com/lightning/adelaide,au?radius=999999miles&limit=1000&sort=dt:-1&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=${apiWeather}`)
            .then(res => {
                this.setState({
                    lightnings: res.data.response
                })
            })
    }

}

export default Australia;
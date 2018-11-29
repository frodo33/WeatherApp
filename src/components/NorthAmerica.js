import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const AnyReactComponent = ({ text }) => (
    <div><img style={{width: '15px'}} src={require('../images/lightning.svg')} alt='+'/></div>
)

class NorthAmerica extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightnings: []
        }

    }
    static defaultProps = {
        center: {
            lat: 44.9778,
            lng: -93.265
        },
        zoom: 4
    };

    render() {
        const markers = this.state.lightnings.map((el,i) => {
            return <AnyReactComponent key={i} lat={el.loc.lat} lng={el.loc.long} />
        })

        return (

            // Important! Always set the container height explicitly
            <div className='maps'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyC69x3P_HQ73tuA4WZk6QzNUbXHGAjNrmc' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {markers}
                </GoogleMapReact>
                <button className='load-more' onClick={() => window.location.reload(true)}>Refresh</button>
            </div>
        );
    }

    componentDidMount() {
        axios.get('https://api.aerisapi.com/lightning/minneapolis,mn?radius=999999miles&limit=1000&sort=dt:-1&client_id=acDZUrrq2VrlSb3gOoAnG&client_secret=ivUH2JTtotXlCJa9xnEn19f7rK43x75wDaHFjWic')
            .then(res => {
                this.setState({
                    lightnings: res.data.response
                })
            })
    }

}

export default NorthAmerica;
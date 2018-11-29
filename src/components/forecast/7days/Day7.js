import React from "react";

class Day7 extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card_top">
                    <div className="card_loc">
                        <span className="card_loc-place">{this.props.city.charAt(0).toUpperCase() + this.props.city.slice(1)}</span>
                        <span>{this.props.data[0].periods[6].validTime.slice(0,10)}</span>
                    </div>
                    <div className="card_header">
                        <span className="card_header-temp">{this.props.data[0].periods[6].maxTempC}&deg;</span>
                        <div className="card_header-text">
                            <span>{this.props.data[0].periods[6].weatherPrimary}</span>
                            <span className="card_header-feel">Real feel {this.props.data[0].periods[6].feelslikeC}</span>
                        </div>
                    </div>
                    <div className="card_sun">
                        <div className="card_sunrise-container">
                            <div className="card-icon"><img src={require('../../../images/sunrise.png')} alt=""/></div>
                            <span>Sunrise</span>
                            <span><strong>{this.props.data[0].periods[6].sunriseISO.slice(11, 16)}</strong></span>
                        </div>
                        <div className="card_sunrise-container">
                            <div className="card-icon"><img src={require('../../../images/sunset.png')} alt=""/></div>
                            <span>Sunset</span>
                            <span><strong>{this.props.data[0].periods[6].sunsetISO.slice(11, 16)}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="card_bottom">

                    <div className="card_winds">
                        <span>Winds from the <strong>{this.props.data[0].periods[6].windDir}</strong></span>
                        <span><strong>{this.props.data[0].periods[6].windSpeedKPH}km/h</strong></span>
                    </div>
                    <div className="card_clouds">
                        <span>Cloud cover <strong>{this.props.data[0].periods[6].sky}%</strong></span>
                    </div>
                    <div className="card_precip">
                        <span>Rain <strong>{this.props.data[0].periods[6].precipMM}mm</strong></span>
                        <span>Snow <strong>{this.props.data[0].periods[6].snowCM}cm</strong></span>
                    </div>
                    <div className="card_details">
                        <span>Pressure <strong>{this.props.data[0].periods[6].pressureMB}hpa</strong></span>
                        <span>Humidity <strong>{this.props.data[0].periods[6].humidity}%</strong></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Day7;
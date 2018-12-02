import React from 'react';

class DayCard extends React.Component {
    render() {
        return (
            <div className='card-dn'>
                <div>
                    <div className='card-dn_sun'><img src={require('../../images/001-sunny.svg')}/></div>
                    <div className='card-dn_cloud-top'><img src={require('../../images/003-cloud.svg')}/></div>
                    <div className='card-dn_cloud-bottom'><img src={require('../../images/003-cloud.svg')}/>
                    </div>
                    <div className='card-dn_bg-cloud'><img src={require('../../images/003-cloud.svg')}/></div>
                    <div className='card-dn_bg-cloud2'><img src={require('../../images/003-cloud.svg')}/></div>
                </div>
                <div className='card-content'>
                    <div className='card-content_top'>
                        <div className='card-content_place'>
                            <p>{this.props.city}</p>
                        </div>
                        <div className='card-content_sunrise'>
                            <p>{this.props.data[0].dateTimeISO.slice(0, 10)}</p>
                        </div>
                    </div>

                    <div className='card-content_middle'>
                        <div className="card-content_temp">
                            <p>{this.props.data[0].avgTempC}&deg;</p>
                        </div>
                        <div className="card-content_descr">
                            <p className='card-content_descr-text'>{this.props.data[0].weatherPrimary}</p>
                            <p>Real feel {this.props.data[0].feelslikeC}&deg;</p>
                        </div>
                    </div>
                    <div className="card-content_bottom">
                        <div className="card-content_winds">
                            <p>Winds from the <span>{this.props.data[0].windDir}</span></p>
                            <p><span>{this.props.data[0].windSpeedKPH}km/h</span></p>
                            <p>Pressure <span>{this.props.data[0].pressureMB}hpa</span></p>
                            <p>Humidity <span>{this.props.data[0].humidity}%</span></p>
                        </div>
                        <div className="card-content_clouds">
                            <p>Cloud cover <span>{this.props.data[0].sky}%</span></p>
                            <p>Rain <span>{this.props.data[0].precipMM}mm</span></p>
                            <p>Snow <span>{this.props.data[0].snowCM}cm</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DayCard;
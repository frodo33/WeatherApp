import React from 'react';

class NextDays extends React.Component {
    showDetails = (e) => {
        e.currentTarget.children[e.currentTarget.children.length-1].style.bottom = '-130px';
    }

    hideDetails = (e) => {
        e.currentTarget.children[e.currentTarget.children.length-1].style.bottom = '-20px';
    }

    createBoxes = () => {
        let boxes = [];
        for (let i=1; i<7; i++) {
            boxes = [
                ...boxes,
                <div className="box">
                    <div onMouseLeave={this.hideDetails} onMouseEnter={this.showDetails} className='box_main'>
                        <div className='box_day-info'>
                            <span className='box_date'>{this.props.day[i].validTime.slice(0,10)}</span>
                            <span className='box_icon'><img src={require('../../images/001-sunny.svg')} alt=""/></span>
                            <span className='box_temp'>{this.props.day[i].avgTempC}&deg;</span>
                            <span className='box_text'>{this.props.day[i].weatherPrimary}</span>
                        </div>

                        <div className='box_night-info'>
                            <span className='box_date'>{this.props.night[i].validTime.slice(0,10)}</span>
                            <span className='box_icon'><img src={require('../../images/moon.svg')} alt=""/></span>
                            <span className='box_temp'>{this.props.night[i].avgTempC}&deg;</span>
                            <span className='box_text'>{this.props.night[i].weatherPrimary}</span>
                        </div>
                        <div className='box_sub'>
                            <div className='box_day-info radius-day'>
                                <span>{this.props.day[i].windSpeedKPH}km/h {this.props.day[i].windDir}</span>
                                <span>{this.props.day[i].pressureMB}hpa</span>
                                <span>Rain: {this.props.day[i].precipMM}mm</span>
                                <span>Snow: {this.props.day[i].snowCM}cm</span>
                            </div>
                            <div className='box_night-info radius-night'>
                                <span>{this.props.night[i].windSpeedKPH}km/h {this.props.night[i].windDir}</span>
                                <span>{this.props.night[i].pressureMB}hpa</span>
                                <span>Rain: {this.props.night[i].precipMM}mm</span>
                                <span>Snow: {this.props.night[i].snowCM}cm</span>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        }
        return boxes;
    }

    render() {
        return (
            <div className='boxes'>
                {this.createBoxes()}
            </div>
        )
    }
}

export default NextDays;
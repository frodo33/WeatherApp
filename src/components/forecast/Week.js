import React from 'react';
import Day2 from './7days/Day2';
import Day3 from './7days/Day3';
import Day4 from './7days/Day4';
import Day5 from './7days/Day5';
import Day6 from './7days/Day6';
import Day7 from './7days/Day7';

class Week extends React.Component {
    render() {
        return (
            <div>
                <Day2 data={this.props.data} city={this.props.city} />
                <Day3 data={this.props.data} city={this.props.city} />
                <Day4 data={this.props.data} city={this.props.city} />
                <Day5 data={this.props.data} city={this.props.city} />
                <Day6 data={this.props.data} city={this.props.city} />
                <Day7 data={this.props.data} city={this.props.city} />
            </div>
        )
    }
}

export default Week;
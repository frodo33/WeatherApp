import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='footer'>
                <h2>copyrights</h2>
                <div className='footer_socials'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}

export default Footer;
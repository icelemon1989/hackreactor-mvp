import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="Footer">
                <ul>
                    <li>
                        <img src="http://vincent.billey.me/talks/react-putting-js-in-your-face/assets/react-logo.png" alt="React"/>
                    </li>
                    <li>
                        <img src="https://www.keizu.co.jp/ksvc/img/portfolio/ksvc/nodejs-logo_0.png" alt="NodeJS" />
                    </li>
                    <li>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" alt="mongodb" />
                    </li>
                </ul>
            </footer>   
        )
    }
}

export default Footer;
import React from 'react'

const Footer = () => {
    return (
        <footer className="footer-bs" id="footer-bs">
                <div className="col-md-4 footer-brand">
                    <p></p>
                    <p>© 2021 <strong>Code Fever</strong>, All rights reserved</p>
                    <p style={{opacity:'0.7', letterSpacing:'2px'}}>I have no idea<br /> what to write here <br /> so im just leaving it<br /> like this xD</p>
                </div>

                <div className="col-md-3 footer-social">
                    <h4>Follow Us</h4>
                    <ul className='mt-4'>
                        <li><a href='https://facebook.com/' target="blank">Facebook</a></li>
                        <li><a href='https://www.youtube.com/channel/UCW-PbaFDlH5Ugu694JaKTRw' target="blank">Youtube</a></li>
                        <li><a href='https://instagram.com/codefever.exe' target="blank">Instagram</a></li>
                    </ul>
                </div>
                <div className="col-md-2 footer-ns">
                    <p>Contact Developers:</p>
                    <h4 style={{opacity:"0.8", letterSpacing:'2px'}}>Shreyansh</h4>
                    <a href='https://github.com/shreyanshshri' target='blank'>github/shreyanshshri</a>
                    <h4 style={{opacity:"0.8", letterSpacing:'2px'}}>Aditya</h4>
                    <a href='https://github.com/aditya2111' target='blank'>github/aditya2111</a>
                </div>
        </footer>
    )
}

export default Footer

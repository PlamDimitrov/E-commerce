import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {

    fetch("https://trueway-directions2.p.rapidapi.com/FindDrivingRoute?stops=40.629041%252C-74.025606%253B40.630099%252C-73.993521%253B40.644895%252C-74.013818%253B40.627177%252C-73.980853", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-directions2.p.rapidapi.com",
            "x-rapidapi-key": "1e608236cemsh90663fbb0522f45p197398jsn81b2f735f743"
        }
    })
        .then(response => {
            console.log(response.url);
        })
        .catch(err => {
            console.log(err);
        });

    return <div id="contact-page" className="container">
        <div className="bg">
            <div className="row">
                <div className="col-sm-12">
                    <h2 className="title text-center">Contact <strong>Us</strong></h2>
                    <div id="gmap" className="contact-map">
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">
                    <div className="contact-form">
                        <h2 className="title text-center">Get In Touch</h2>
                        <form id="main-contact-form" className="contact-form row" name="contact-form" method="post">
                            <div className="form-group col-md-6">
                                <input type="text" name="name" className="form-control" required="required" placeholder="Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="email" name="email" className="form-control" required="required" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" name="subject" className="form-control" required="required" placeholder="Subject" />
                            </div>
                            <div className="form-group col-md-12">
                                <textarea name="message" id="message" required="required" className="form-control" rows="8" placeholder="Your Message Here"></textarea>
                            </div>
                            <div className="form-group col-md-12">
                                <input type="submit" name="submit" className="btn btn-primary pull-right" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="contact-info">
                        <h2 className="title text-center">Contact Info</h2>
                        <address>
                            <p>E-Shopper Inc.</p>
                            <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
                            <p>Newyork USA</p>
                            <p>Mobile: +2346 17 38 93</p>
                            <p>Fax: 1-714-252-0026</p>
                            <p>Email: info@e-shopper.com</p>
                        </address>
                        <div className="social-networks">
                            <h2 className="title text-center">Social Networking</h2>
                            <ul>
                                <li>
                                    <Link to="/"><i className="fa fa-facebook"></i></Link>
                                </li>
                                <li>
                                    <Link to="/"><i className="fa fa-twitter"></i></Link>
                                </li>
                                <li>
                                    <Link to="/"><i className="fa fa-google-plus"></i></Link>
                                </li>
                                <li>
                                    <Link to="/"><i className="fa fa-youtube"></i></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Contact;
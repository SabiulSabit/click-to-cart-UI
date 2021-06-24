import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'
                                  

const Footer = () => {
  return (
    <div className="footerDiv">
      <hr />
      <footer className="text-lg-start text-muted footer">
        
        <h3 className="text-left ml-5">Encodemy</h3>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                <FontAwesomeIcon icon={faHome} /> New York, NY 10012, US
                </p>
                <p>
                <FontAwesomeIcon icon={faEnvelope} />
                   info@example.com
                </p>
                <p>
                <FontAwesomeIcon icon={faPhone} /> + 01 234 567 88
                </p>
                <p>
                <FontAwesomeIcon icon={faPhone} /> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
         
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://encodemy.com/">
           Encodemy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

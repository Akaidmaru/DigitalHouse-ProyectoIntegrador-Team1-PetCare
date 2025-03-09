import React from "react";
import { PiWhatsappLogo } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import {
  FaRegCopyright,
  FaTiktok,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import "../styles/Footer.css";
import petCareLogo from "../images/pet-care-logo-v2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-logo-container">
          <img src={petCareLogo} alt="Pet Care Logo" className="footer-logo" />
        </div>
        <div className="footer-info">
          {/* Versión Desktop */}
          <div className="desktop-only">
            <div className="contact-info">
              <h4>
                HABLEMOS <PiWhatsappLogo />
              </h4>
              <p>Whatsapp: 57+ 111222333</p>
              <p>Email: info@outstanding11.com</p>
            </div>
            <div className="location-info">
              <h4>
                ENCUÉNTRANOS <IoLocationOutline />
              </h4>
              <p>Calle Digital House #10</p>
            </div>
          </div>

          {/* Versión Mobile */}
          <div className="mobile-only">
            <div className="mobile-info">
              <div className="mobile-section">
                <h4>HABLEMOS</h4>
                <div className="mobile-icons">
                  <HiOutlineMail className="info-icon" />
                  <PiWhatsappLogo className="info-icon" />
                </div>
              </div>
              <div className="mobile-section">
                <h4>ENCUÉNTRANOS</h4>
                <IoLocationOutline className="info-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="copyright-wrapper">
          <div className="copyright-text">
            <FaRegCopyright style={{ fontSize: "14px", marginRight: "15px" }} />
            2025 Todos los derechos reservados Pet Care
          </div>
          <div className="social-icons">
            <FaTiktok style={{ color: 'white', fontSize: '16px' }} />
            <FaFacebook style={{ color: 'white', fontSize: '16px' }} />
            <FaInstagram style={{ color: 'white', fontSize: '16px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
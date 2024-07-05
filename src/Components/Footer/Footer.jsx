import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>CLOTHE'S</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>ABOUT</li>
        <li><Link to="/contact">Contact</Link></li> {/* Ajouter le lien vers la page de contact */}
      </ul>
      <div className="footer-social-icon">
        <div className="footer_icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer_icons-container">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="footer_icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 All Right Reserved .</p>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5 mt-4" style={{ background: "#050505", borderTop: "1px solid #1f1f1f" }}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h3 className="navbar-brand-custom fs-2 mb-2">MY</h3>
            </Link>
            <p className="text-secondary small mb-3">Premium men's accessories crafted for the modern icon. Personalized designs, unmatched quality.</p>
            <div className="d-flex gap-3 mt-2">
              <Link to="#" className="social-icon"><i className="bi bi-instagram"></i></Link>
              <Link to="#" className="social-icon"><i className="bi bi-facebook"></i></Link>
              <Link to="#" className="social-icon"><i className="bi bi-twitter-x"></i></Link>
              <Link to="#" className="social-icon"><i className="bi bi-tiktok"></i></Link>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="gold-text fw-semibold mb-3">EXPLORE</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="footer-link small">New Arrivals</Link></li>
              <li className="mb-2"><Link to="/" className="footer-link small">Best Sellers</Link></li>
              <li className="mb-2"><Link to="/" className="footer-link small">Personalized Gifts</Link></li>
              <li className="mb-2"><Link to="/" className="footer-link small">Offers</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="gold-text fw-semibold mb-3">CONTACT US</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center gap-2"><i className="bi bi-whatsapp text-success"></i><Link to="https://wa.me/923704931949" className="footer-link small">+92 370 4931949</Link></li>
              <li className="mb-3 d-flex align-items-center gap-2"><i className="bi bi-telephone-fill gold-text"></i><span className="text-secondary small">+92 370 4931949</span></li>
              <li className="mb-2 d-flex align-items-center gap-2"><i className="bi bi-geo-alt-fill text-secondary"></i><span className="text-secondary small">Pakistan, Lahore.</span></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="gold-text fw-semibold mb-3">BUSINESS HOURS</h5>
            <p className="text-secondary small mb-1">Mon - Fri: 24 hours (Online Support)</p>
            <p className="text-secondary small mb-3">Sat - Sun: 2:00 PM – 10:00 PM</p>
            <p className="text-muted small mt-2"><i className="bi bi-shield-check"></i> 100% Authentic</p>
          </div>
        </div>
        <hr className="my-4" style={{ background: "#222" }} />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-secondary small">© 2026 MY ACCESSORIES STORE — Firebase Live | Responsive Nav</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <p className="mb-0 text-secondary small"><i className="bi bi-credit-card me-1"></i> Secure payments | <i className="bi bi-truck ms-2 me-1"></i> Express shipping</p>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
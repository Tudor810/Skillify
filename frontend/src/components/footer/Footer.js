import React from "react";

import { Link } from "react-router-dom";

import "../../css/footer.css";
export default function Footer() {
  return (
    <>
      <footer className="app-footer m-lr-100">
        <div className="footer-content">
          <div className="footer-logo d--flex align--center justify--center">
            <div className="logo">
              <Link to="/">
                <p translate="no">Skillify<span>.</span></p>
              </Link>
            </div>
          </div>
          <nav className="footer-nav mt-30">
            <ul className="d--flex">
              <li
                className="footer-link gapY-20 d--flex align--center justify--center footer-links"
                id="contact-footer"
              >
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Services</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
            </ul>
          </nav>
          <div className="about-text">
            <p>
              Skillify Ai is helping people around the world learn their desired
              skills 3 times faster!
            </p>
          </div>
          <div className="social-icons d--flex justify--center align--center">
            <ul className="d--flex align--center">
              <li className="social-link">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/skillify_ai/"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li className="social-link">
                <a
                  target="_blank"
                  href="https://discord.gg/KZeXgW3ZXB"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-discord"></i>
                </a>
              </li>
              <li className="social-link">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.tiktok.com/@skillify_ai"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li className="social-link">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/profile.php?id=100091545584529&is_tour_dismissed=true"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li className="social-link">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/skillify-ai-ba371b271/"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="copyright-text d--flex align--center justify--center">
            <p>
              Copyright © 2020 -2023 <Link to="/">Skillify</Link> All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

    </>
  );
}

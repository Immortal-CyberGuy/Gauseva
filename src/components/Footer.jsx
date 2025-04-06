import { Github, Youtube, Twitter, Mail } from "lucide-react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-title">GauSeva</h3>
            <p className="footer-description">
              Empowering Cattle Farmers with AI-Driven Solutions.
            </p>
            <div className="footer-icons">
              <a href="#" className="footer-icon"><Twitter size={16} /></a>
              <a href="#" className="footer-icon"><Youtube size={16} /></a>
              <a href="#" className="footer-icon"><Github size={16} /></a>
            </div>
          </div>

          {/* Features Section */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Features</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">CowPedia</a></li>
              <li><a href="#" className="footer-link">Breed Matching</a></li>
              <li><a href="#" className="footer-link">Marketplace</a></li>
              <li><a href="#" className="footer-link">Smart Vet Locator</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Resources</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">API</a></li>
              <li><a href="#" className="footer-link">Tutorials</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <div className="footer-contact">
              <Mail size={14} />
              <a href="gargshubham2411@gmail.com" className="footer-link">
                support@GauSeva.app
              </a>
            </div>
            <a href="https://youtu.be/r6zIGXun57U?si=lovBUerOq9lnRzs6" className="footer-link">
              Easter Egg
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-text">© 2025 GauSeva. All rights reserved.</p>
          <div className="footer-policy">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

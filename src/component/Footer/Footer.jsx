import React from "react";
import "../../styles/Footer/_footer.scss";

function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-bottom">
        <p>&copy; 2026 FILMIAGI PRODUCTION. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

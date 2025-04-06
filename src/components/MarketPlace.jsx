import React, { useEffect } from "react";
import "../style/MarketPlace.css";
import { PiRocketLaunchBold } from "react-icons/pi";

const Marketplace = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="marketplace-overlay" onClick={onClose}>
      <div className="marketplace-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2 className="marketplace-title">Coming Soon 🚀</h2>
        <p className="marketplace-description">
          A smarter way to buy & sell cattle is on its way.
        </p>
        <p className="marketplace-subtext">
          Stay tuned for something big!  
        </p>
        <div className="rocket-container">
          <PiRocketLaunchBold className="rocket-icon" />
        </div>
        <button className="got-it-button" onClick={onClose}>Got it! 🚀</button>
      </div>
    </div>
  );
};

export default Marketplace;

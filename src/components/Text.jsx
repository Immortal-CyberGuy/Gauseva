import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import TypewriterEffect from "./TypewriterEffect";
import "../style/Text.css";

const features = [
  "AI-Powered Breed Matching",
  "Smart Vet Locator",
  "Intelligent CowPedia",
  "Upcoming Marketplace"
];

const Text = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200); // Delay to make it feel smoother
  }, []);

  return (
    <div className={`text-container ${loaded ? "fade-in" : ""}`}>
      <h1>
        AI-DRIVEN <span className="glow-text">COW CARE & BREEDING</span>
      </h1>
      <p className="sub-heading">SMART BREEDING | HEALTH | SUSTAINABILITY</p>
      <p className="description">
        <strong>GauSeva</strong> is revolutionizing Indian cow care with{" "}
        <strong>
          AI-powered breed matching, smart vet locators, and an intelligent CowPedia.
        </strong>{" "}
        Our mission is to make breeding smarter, veterinary care accessible, and
        cow knowledge widespread.
      </p>

      {/* Typewriter Effect */}
      <TypewriterEffect words={features} />

      <div className="buttons">
        <Link to="/login" className="cta-button">
          <FiLogIn className="icon" /> Get Started
        </Link>
        <button className="learn-more" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
          ↓ Learn More
        </button>
      </div>
    </div>
  );
};

export default Text;

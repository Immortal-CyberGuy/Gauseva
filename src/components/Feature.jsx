import React, { useEffect, useState } from "react";
import "../style/Feature.css";
import { FaRobot, FaBookOpen, FaMapMarkerAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Chatbot",
    description: "Get instant answers to all your cow-related queries.",
  },
  {
    icon: <FaBookOpen />,
    title: "CowPedia",
    description: "An encyclopedia of Indian cow breeds and their benefits.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Smart Vet Locator",
    description: "Find the nearest vet for your cattle with ease.",
  },
];

const Feature = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the component is in the viewport
    );

    const featureSection = document.querySelector(".feature-section");
    observer.observe(featureSection);

    return () => {
      if (featureSection) {
        observer.unobserve(featureSection);
      }
    };
  }, []);

  return (
    <div className={`feature-section ${isVisible ? "animate" : ""}`}>
      <h2 className="feature-heading">
        Our <span>Powerful Features</span>
      </h2>
      <div className="feature-container">
        {features.map((feature, index) => (
          <div
            className={`feature-box ${isVisible ? "slide-up" : ""}`}
            key={index}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;

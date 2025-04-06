import React, { useState, useEffect } from "react";

const TypewriterEffect = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (visibleText.length < words[currentIndex].length) {
        timeout = setTimeout(() => {
          setVisibleText(words[currentIndex].slice(0, visibleText.length + 1));
        }, 100);
      } else {
        setTimeout(() => setIsTyping(false), 1000); // Wait before deletion
      }
    } else {
      if (visibleText.length > 0) {
        timeout = setTimeout(() => {
          setVisibleText(visibleText.slice(0, -1));
        }, 50);
      } else {
        setIsTyping(true);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [visibleText, isTyping, currentIndex, words]);

  return (
    <div className="typewriter">
      {visibleText}
      <span className="cursor">|</span>
    </div>
  );
};

export default TypewriterEffect;

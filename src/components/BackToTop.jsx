import React, { useEffect, useState } from "react";
import "../styles/scss/back_to_top.scss";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 0) {
      setIsVisible(true);
      setIsFading(false);
    } else {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`scroll-button ${isVisible ? "visible" : ""} ${
        isFading ? "fade-out" : ""
      }`}
    >
      <span className="scroll-button-text">Back to Top</span>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  );
}

export default BackToTop;

import React, { useEffect, useState } from "react";
import "../styles/scss/back_to_top.scss";

/**
 * BackToTop component displays a button to scroll back to the top of the page.
 *
 * @returns {JSX.Element} The rendered back-to-top button.
 */
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Toggles the visibility of the button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 0) {
      setIsVisible(true);
      setIsFading(false);
    } else {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  // Smoothly scrolls the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop} // Scroll to top on click
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

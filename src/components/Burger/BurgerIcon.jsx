import React from "react";
import PropTypes from "prop-types";

/**
 * BurgerIcon component renders a hamburger menu icon.
 *
 * @param {Object} props - Component properties.
 * @param {function} props.onClick - Callback function to handle click events.
 * @param {boolean} props.isOpen - Indicates if the menu is open.
 * @returns {JSX.Element} The rendered BurgerIcon component.
 */
function BurgerIcon(props) {
  const { onClick, isOpen } = props;

  return (
    <div className={`burger-icon ${isOpen ? "open" : ""}`} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

// Define PropTypes for the component
BurgerIcon.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BurgerIcon;

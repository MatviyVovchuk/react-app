import React from "react";

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

export default BurgerIcon;

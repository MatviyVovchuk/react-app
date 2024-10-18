import React from "react";

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

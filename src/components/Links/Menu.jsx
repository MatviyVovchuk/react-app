import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Service from "../../services/Service";

/**
 * Menu component renders navigation links for the header menu.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isBurgerOpen - Indicates if the burger menu is open.
 * @param {React.ReactNode} props.children - Child components to be rendered within the menu.
 * @returns {JSX.Element|null} The rendered Menu or null if the burger menu is open.
 */
function Menu(props) {
  const { children, isBurgerOpen } = props;
  const [menuLinks, setMenuLinks] = useState([]);

  useEffect(() => {
    // Fetch menu links from the service
    const fetchMenuLinks = async () => {
      try {
        const links = await Service.getMenuLink();
        if (links) {
          setMenuLinks(links.data);
        }
      } catch (error) {
        console.error("Error fetching menu links:", error);
      }
    };

    fetchMenuLinks();
  }, []);

  // Render the menu links if the burger menu is not open
  return (
    !isBurgerOpen && (
      <div className="header-menu-links">
        {children}
        <div className={`menu-links ${isBurgerOpen ? "open" : ""}`}>
          {menuLinks.map((link, index) => (
            <a
              key={index}
              href={link.link.uri}
              className={`menu-link menu-link-${link.title} ${
                link.title === "Blog" ? "active" : ""
              }`}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    )
  );
}

// Define PropTypes for the component
Menu.propTypes = {
  isBurgerOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default Menu;

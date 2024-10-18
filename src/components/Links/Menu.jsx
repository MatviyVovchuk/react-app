import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

function Menu(props) {
  const { children, isBurgerOpen } = props;
  const [menuLinks, setMenuLinks] = useState([]);

  useEffect(() => {
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

  return (
    <div className="header-menu-links ">
      {children}
      <div className={"menu-links " + (isBurgerOpen ? "open" : "")}>
        {menuLinks.map((link, index) => {
          return (
            <a
              key={index}
              href={link.link.uri}
              className={
                `menu-link menu-link-${link.title} ` +
                (link.title === "Blog" ? "active" : "")
              }
            >
              {link.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;

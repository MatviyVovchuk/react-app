import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

function Menu(props) {
  const { children } = props;
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
    <div className="header-menu-links col-lg-9 col-md-6 col-6">
      {children}
      {menuLinks.map((link, index) => {
        return (
          <a
            key={index}
            href={link.link.uri}
            className={
              link.title === "Blog"
                ? `menu-link active menu-link-${link.title}`
                : `menu-link menu-link-${link.title}`
            }
          >
            {link.title}
          </a>
        );
      })}
    </div>
  );
}

export default Menu;

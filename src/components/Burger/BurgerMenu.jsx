import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

function BurgerMenu(props) {
  const { isBurgerOpen } = props;
  const [menu, setMenu] = useState({ menuLinks: [], socialLinks: [] });

  useEffect(() => {
    const fetchBurgerMenuLinks = async () => {
      try {
        const menuLinks = await Service.getMenuLink();
        const socialLinks = await Service.getSocialLink();

        if (menuLinks && socialLinks) {
          setMenu({
            menuLinks: menuLinks.data,
            socialLinks: socialLinks.data.field_social_links,
          });
        }
      } catch (error) {
        console.error("Error fetching menu links (BurgerMenu):", error);
      }
    };

    fetchBurgerMenuLinks();
  }, []);

  return (
    isBurgerOpen && (
      <div className={"header-burger-menu " + (isBurgerOpen ? "open" : "")}>
        <div className="burger-menu-links">
          {menu.menuLinks.map((link, index) => (
            <a
              href={link.link.uri}
              key={index}
              className={
                "menu-link menu-link-" +
                link.title.toLowerCase() +
                (link.title === "Blog" ? " active" : "")
              }
            >
              {link.title}
            </a>
          ))}

          {menu.socialLinks.map((social, index) => (
            <a
              href={social.field_link.uri}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "social-link social-link-" +
                social.field_icon_svg.meta.alt.toLowerCase()
              }
            >
              {social.field_icon_svg.meta.alt}
            </a>
          ))}
        </div>
      </div>
    )
  );
}

export default BurgerMenu;

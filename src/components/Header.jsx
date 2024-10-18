import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import Menu from "./Links/Menu";
import SocialMedia from "./Links/SocialMedia";
import BurgerIcon from "./BurgerIcon";

function Header() {
  const [logo, setLogo] = useState(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logoData = await Service.getLogo();
        if (logoData) {
          setLogo({
            image: Service.getImageUrl(logoData.data.field_image.uri.url),
            alt: logoData.data.field_image.meta.alt,
          });
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);

  const toggleBurger = () => {
    setIsBurgerOpen((prevState) => {
      console.log("Header isBurgerOpen:", !prevState);
      return !prevState;
    });
  };

  return (
    <header className="header-container row">
      <div className="header-menu-container col-lg-9 col-md-6 col-6">
        <Menu isBurgerOpen={isBurgerOpen}>
          {logo && <img src={logo.image} alt={logo.alt} className="logo" />}
        </Menu>
      </div>
      <BurgerIcon onClick={toggleBurger} isOpen={isBurgerOpen} />
      <div className="header-social-container col-lg-3 col-md-6 col-6">
        <SocialMedia isBurgerOpen={isBurgerOpen}></SocialMedia>
      </div>
    </header>
  );
}

export default Header;

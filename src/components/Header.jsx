import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import Menu from "./Links/Menu";
import SocialMedia from "./Links/SocialMedia";

function Header() {
  const [logo, setLogo] = useState(null);

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

  return (
    <header className="header-container row">
      <Menu>
        {logo && <img src={logo.image} alt={logo.alt} className="logo" />}
      </Menu>
      <SocialMedia></SocialMedia>
    </header>
  );
}

export default Header;

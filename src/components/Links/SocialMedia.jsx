import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

function SocialMedia(props) {
  const [socialLinks, setSocialLinks] = useState([]);
  const { isBurgerOpen } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socialLinksResponse = await Service.getSocialLink();

        if (
          socialLinksResponse &&
          socialLinksResponse.data &&
          socialLinksResponse.data.field_social_links
        ) {
          const socialLinksData = socialLinksResponse.data.field_social_links;

          const socialImagesData = socialLinksData.map((item) => {
            const imageUrl = Service.getImageUrl(item.field_icon_svg.uri.url);
            return {
              ...item,
              imageUrl: imageUrl,
            };
          });

          setSocialLinks(socialImagesData);
        }
      } catch (error) {
        console.error("Error fetching social links and images:", error);
      }
    };

    fetchData();
  }, []);

  return (
    !isBurgerOpen && (
      <div className={"header-social-links " + (isBurgerOpen ? "open" : "")}>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.field_link.uri}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link social-link-${link.field_icon_svg.meta.alt}`}
          >
            <img src={link.imageUrl} alt={link.field_icon_svg.meta.alt} />
          </a>
        ))}
      </div>
    )
  );
}

export default SocialMedia;

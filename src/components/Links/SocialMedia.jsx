import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

function SocialMedia() {
  const [socialLinks, setSocialLinks] = useState([]);

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
    <div className="header-social-links col-lg-3 col-md-6 col-6">
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
  );
}

export default SocialMedia;

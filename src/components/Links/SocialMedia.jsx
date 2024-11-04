import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Service from "../../services/Service";

/**
 * SocialMedia component displays social media links with icons.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isBurgerOpen - Indicates if the burger menu is open.
 * @returns {JSX.Element|null} The rendered social media links or null if the burger menu is open.
 */
function SocialMedia(props) {
  const { isBurgerOpen } = props;
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    // Fetch social media links and icons from the service
    const fetchData = async () => {
      try {
        const response = await Service.getSocialLink();

        // Ensure the response contains the necessary data
        if (response?.data?.field_social_links) {
          const socialLinksData = response.data.field_social_links;

          // Map social links to include image URLs
          const socialImagesData = socialLinksData.map((item) => ({
            ...item,
            imageUrl: Service.getImageUrl(item.field_icon_svg.uri.url),
          }));

          setSocialLinks(socialImagesData);
        }
      } catch (error) {
        console.error("Error fetching social links and images:", error);
      }
    };

    fetchData();
  }, []);

  // Render the social links if the burger menu is not open
  return (
    !isBurgerOpen && (
      <div className="header-social-links">
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

// Define PropTypes for the component
SocialMedia.propTypes = {
  isBurgerOpen: PropTypes.bool,
};

export default SocialMedia;

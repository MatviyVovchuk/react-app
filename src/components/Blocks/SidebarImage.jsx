import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

/**
 * SidebarImage component fetches and displays an image for the sidebar.
 *
 * @returns {JSX.Element} The rendered SidebarImage component.
 */
function SidebarImage() {
  const [sidebarImage, setSidebarImage] = useState({ url: "", alt: "" });

  useEffect(() => {
    // Function to fetch the sidebar image
    const fetchSidebarImage = async () => {
      try {
        const data = await Service.getSidebarImage();

        if (data) {
          // Set the sidebar image URL and alt text
          setSidebarImage({
            url: Service.getImageUrl(data.data.field_image.uri.url),
            alt: data.data.field_image.meta.alt,
          });
        }
      } catch (error) {
        console.error("Error fetching sidebar image:", error);
      }
    };

    fetchSidebarImage();
  }, []);

  return (
    <div className="sidebar-image">
      <img src={sidebarImage.url} alt={sidebarImage.alt} />
    </div>
  );
}

export default SidebarImage;

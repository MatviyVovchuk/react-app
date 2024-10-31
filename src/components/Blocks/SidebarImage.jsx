import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

function SidebarImage() {
  const [sidebarImage, setSidebarImage] = useState({ sidebarImage: [] });

  useEffect(() => {
    const fetchSidebarImage = async () => {
      try {
        const data = await Service.getSidebarImage();

        if (data) {
          setSidebarImage({
            sidebarImage: {
              url: Service.getImageUrl(data.data.field_image.uri.url),
              alt: data.data.field_image.meta.alt,
            },
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
      <img
        src={sidebarImage.sidebarImage.url}
        alt={sidebarImage.sidebarImage.alt}
      />
    </div>
  );
}

export default SidebarImage;

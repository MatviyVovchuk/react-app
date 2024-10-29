import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import ArticleSlider from "../../Article/ArticleSlider";

function IndustriDesign() {
  const [industriDesign, setIndustriDesign] = useState({ industriDesign: [] });
  const blockTitle = "Industri Design";

  useEffect(() => {
    const fetchIndustriDesign = async () => {
      try {
        const data = await Service.getLatestArcticles();

        if (data) {
          const dataImageUrls = await Promise.all(
            data.map((item) => {
              return Service.getImageUrl(item.field_image_1);
            })
          );
          setIndustriDesign({
            industriDesign: data.map((item, index) => ({
              articleTitle: item.title_1.replace(/<\/?[^>]+>/gi, ""),
              articleBody: item.body.replace(/<\/?[^>]+>/gi, ""),
              articleDate: item.field_date,
              articleImage: dataImageUrls[index],
              articleLink: item.title_1.match(/href="([^"]*)"/)
                ? item.title_1.match(/href="([^"]*)"/)[1]
                : null,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching tutorial design:", error);
      }
    };

    fetchIndustriDesign();
  }, []);

  return (
    <ArticleSlider
      articles={industriDesign.industriDesign.slice(1, -1)}
      blockTitle={blockTitle}
      containerClass="industri-design-container"
      titleClass="industri-design-title"
      sliderClass="industri-design-slider-container row g-0"
    />
  );
}

export default IndustriDesign;

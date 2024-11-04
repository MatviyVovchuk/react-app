import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import ArticleSlider from "../../Article/ArticleSlider";

/**
 * IndustriDesign component to fetch and display articles related to industrial design.
 *
 * @returns {JSX.Element} The rendered IndustriDesign component.
 */
function IndustriDesign() {
  const [industriDesign, setIndustriDesign] = useState({ industriDesign: [] });
  const blockTitle = "Industri Design";

  useEffect(() => {
    // Function to fetch the latest articles for industrial design
    const fetchIndustriDesign = async () => {
      try {
        // Fetch articles data
        const data = await Service.getLatestArticles();

        if (data) {
          // Fetch image URLs concurrently
          const dataImageUrls = await Promise.all(
            data.map((item) => Service.getImageUrl(item.field_image_1))
          );

          // Process articles and update state
          const processedArticles = data.map((item, index) => ({
            // Remove HTML tags from title and body
            articleTitle: item.title_1.replace(/<\/?[^>]+>/gi, ""),
            articleBody: item.body.replace(/<\/?[^>]+>/gi, ""),
            articleDate: item.field_date,
            articleImage: dataImageUrls[index],
            articleLink: item.title_1.match(/href="([^"]*)"/)
              ? item.title_1.match(/href="([^"]*)"/)[1]
              : null,
          }));

          setIndustriDesign({ industriDesign: processedArticles });
        }
      } catch (error) {
        console.error("Error fetching industrial design articles:", error);
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

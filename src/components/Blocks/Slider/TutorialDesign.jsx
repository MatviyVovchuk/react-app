import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import ArticleSlider from "../../Article/ArticleSlider";

/**
 * TutorialDesign component to fetch and display tutorial design articles.
 *
 * @returns {JSX.Element} The rendered TutorialDesign component.
 */
function TutorialDesign() {
  const [designArticle, setDesignArticle] = useState({ designArticle: [] });
  const blockTitle = "Tutorial design";

  useEffect(() => {
    // Function to fetch tutorial design articles
    const fetchTutorialDesign = async () => {
      try {
        // Fetch articles data
        const data = await Service.getTutorialDesign();

        if (data) {
          // Fetch image URLs concurrently
          const dataImageUrls = await Promise.all(
            data.map((item) => Service.getImageUrl(item.field_image_1))
          );

          // Process articles and update state
          const processedArticles = data.map((item, index) => ({
            articleTitle: item.title_1,
            articleDate: item.field_date,
            articleLink: item.view_node,
            articleImage: dataImageUrls[index],
          }));

          setDesignArticle({ designArticle: processedArticles });
        }
      } catch (error) {
        console.error("Error fetching tutorial design articles:", error);
      }
    };

    fetchTutorialDesign();
  }, []);

  return (
    <ArticleSlider
      articles={designArticle.designArticle}
      blockTitle={blockTitle}
      containerClass="tutorial-design-container"
      titleClass="tutorial-design-title"
      sliderClass="tutorial-design-slider-container row g-0"
    />
  );
}

export default TutorialDesign;

import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import Slider from "react-slick";
import Article from "../../Article/Article";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArticleSlider from "../../Article/ArticleSlider";

function TutorialDesign() {
  const [designArticle, setDesignArticle] = useState({ designArticle: [] });

  const blockTitle = "Tutorial design";

  useEffect(() => {
    const fetchTutorialDesign = async () => {
      try {
        const data = await Service.getTutorialDesign();

        if (data) {
          const dataImageUrls = await Promise.all(
            data.map((item) => {
              return Service.getImageUrl(item.field_image_1);
            })
          );
          setDesignArticle({
            designArticle: data.map((item, index) => ({
              articleTitle: item.title_1,
              articleDate: item.field_date,
              articleLink: item.view_node,
              articleImage: dataImageUrls[index],
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching tutorial design:", error);
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

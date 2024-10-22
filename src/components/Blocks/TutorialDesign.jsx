import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Slider from "react-slick";
import Article from "./Article/Article";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TutorialDesign() {
  const [designArticle, setDesignArticle] = useState({ designArticle: [] });

  const title = "Tutorial design";

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

        console.log(designArticle);
      } catch (error) {
        console.error("Error fetching tutorial design:", error);
      }
    };

    fetchTutorialDesign();
  }, []);

  if (designArticle.designArticle.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tutorial-design-container">
      <div className="tutorial-design-title">{title}</div>
      <div className="tutorial-design-slider-container row g-0">
        <Slider {...sliderSettings}>
          {designArticle.designArticle.map((article, index) => (
            <div key={index}>
              <Article
                articleLink={article.articleLink}
                articleImageUrl={article.articleImage}
                articleImageAlt={article.articleTitle}
                articleDate={article.articleDate}
                articleTitle={article.articleTitle}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TutorialDesign;

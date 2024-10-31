import React from "react";
import Article from "./Article";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ArticleSlider(props) {
  const { containerClass, titleClass, blockTitle, sliderClass, articles } =
    props;

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
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

  return (
    <div className={containerClass}>
      <div className={titleClass}> {blockTitle} </div>
      <div className={sliderClass}>
        <Slider {...sliderSettings}>
          {articles.map((article, index) => (
            <div key={index}>
              <Article
                articleLink={article.articleLink}
                articleImageUrl={article.articleImage}
                articleImageAlt={article.articleTitle}
                articleDate={article.articleDate}
                articleTitle={article.articleTitle}
                articleBody={article.articleBody}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ArticleSlider;

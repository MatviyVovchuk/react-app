import React from "react";
import Article from "./Article";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * ArticleSlider component to display a slider of articles.
 *
 * @param {Object} props - The component props.
 * @param {string} props.containerClass - The class for the container.
 * @param {string} props.titleClass - The class for the title.
 * @param {string} props.blockTitle - The title of the slider block.
 * @param {string} props.sliderClass - The class for the slider.
 * @param {Array} props.articles - An array of article objects to display in the slider.
 * @returns {JSX.Element} The rendered ArticleSlider component.
 */
function ArticleSlider(props) {
  const { containerClass, titleClass, blockTitle, sliderClass, articles } =
    props;

  // Slider settings for react-slick
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

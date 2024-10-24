import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Slider from "react-slick";
import Article from "./Article/Article";

function PilihanEditor() {
  const [pilihanEditor, setPilihanEditor] = useState({ pilihanEditor: [] });
  const blockTitle = "Pilihan Editor";

  useEffect(() => {
    const fetchPilihanEditor = async () => {
      try {
        const data = await Service.getPilihanEditor();

        if (data) {
          const dataImageUrls = await Promise.all(
            data.map((item) => {
              return Service.getImageUrl(item.field_image_1);
            })
          );
          setPilihanEditor({
            pilihanEditor: data.map((item, index) => ({
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

    fetchPilihanEditor();
  }, []);

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

  console.log(pilihanEditor);

  return (
    <div className="pilihan-editor-container">
      <div className="pilihan-editor-title"> {blockTitle} </div>
      <div className="pilihan-editor-slider-container row g-0">
        <Slider {...sliderSettings}>
          {pilihanEditor.pilihanEditor.slice(1, -1).map((article, index) => (
            <div key={index}>
              <Article
                articleLink={article.articleLink}
                articleImageUrl={article.articleImage}
                articleImageAlt={article.articleTitle}
                articleDate={article.articleDate}
                articleTitle={article.articleTitle}
                articleBody={article.articleBody}
              />
              {/* {article.articleImage} */}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default PilihanEditor;

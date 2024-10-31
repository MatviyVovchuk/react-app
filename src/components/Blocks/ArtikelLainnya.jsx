import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "../Article/Article";

function ArtikelLainnya() {
  const [artikelLainnya, setArtikelLainnya] = useState({ artikelLainnya: [] });
  const blockTitle = "Artikel Lainnya";

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
          setArtikelLainnya({
            artikelLainnya: data.map((item, index) => ({
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
        console.error("Error fetching artikel lainnya:", error);
      }
    };

    fetchIndustriDesign();
  }, []);

  return (
    <div className="artikel-lainnya-container">
      <div className="artikel-lainnya-title"> {blockTitle} </div>
      <div className="artikel-lainnya-articles">
        {artikelLainnya.artikelLainnya.slice(1, 7).map((article, index) => (
          <Article
            key={index}
            articleLink={article.articleLink}
            articleImageUrl={article.articleImage}
            articleImageAlt={article.articleTitle}
            articleDate={article.articleDate}
            articleTitle={article.articleTitle}
            articleBody={article.articleBody}
            articleImageClass="col-lg-5 col-4"
            articleDataClass="col-lg-7 col-8"
          />
        ))}
      </div>
    </div>
  );
}

export default ArtikelLainnya;

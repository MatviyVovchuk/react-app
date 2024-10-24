import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "./Article/Article";

function ArtikelTerbaru() {
  const [artikelTerbaru, setArtikelTerbaru] = useState({ artikelTerbaru: [] });
  const blockTitle = "Artikel Terbaru";

  useEffect(() => {
    const fetchPilihanEditor = async () => {
      try {
        const data = await Service.getArtikelTerbaru();

        if (data) {
          const dataImageUrls = await Promise.all(
            data.map((item) => {
              return Service.getImageUrl(item.field_image_1);
            })
          );
          setArtikelTerbaru({
            artikelTerbaru: data.map((item, index) => ({
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

  return (
    <div className="artikel-terbaru-container">
      <div className="artikel-terbaru-title"> {blockTitle} </div>
      <div className="artikel-terbaru-articles row">
        {artikelTerbaru.artikelTerbaru.slice(1, 7).map((article, index) => (
          <div
            key={index}
            className="articles-container col-md-6 col-lg-4 col-sm-6"
          >
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
      </div>
    </div>
  );
}

export default ArtikelTerbaru;

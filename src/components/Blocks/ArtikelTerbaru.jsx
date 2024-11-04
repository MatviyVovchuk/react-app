import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "../Article/Article";

/**
 * ArtikelTerbaru component fetches and displays the latest articles.
 *
 * @returns {JSX.Element} The rendered ArtikelTerbaru component.
 */
function ArtikelTerbaru() {
  const [artikelTerbaru, setArtikelTerbaru] = useState({ artikelTerbaru: [] });
  const blockTitle = "Artikel Terbaru";

  useEffect(() => {
    // Function to fetch the latest articles
    const fetchLatestArticles = async () => {
      try {
        const data = await Service.getLatestArticles();

        if (data) {
          // Fetch image URLs for all articles concurrently
          const dataImageUrls = await Promise.all(
            data.map((item) => Service.getImageUrl(item.field_image_1))
          );

          // Process articles and update state
          const processedArticles = data.map((item, index) => ({
            articleTitle: item.title_1.replace(/<\/?[^>]+>/gi, ""),
            articleBody: item.body.replace(/<\/?[^>]+>/gi, ""),
            articleDate: item.field_date,
            articleImage: dataImageUrls[index],
            articleLink: item.title_1.match(/href="([^"]*)"/)
              ? item.title_1.match(/href="([^"]*)"/)[1]
              : null,
          }));

          setArtikelTerbaru({ artikelTerbaru: processedArticles });
        }
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <div className="artikel-terbaru-container">
      <div className="artikel-terbaru-title">{blockTitle}</div>
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

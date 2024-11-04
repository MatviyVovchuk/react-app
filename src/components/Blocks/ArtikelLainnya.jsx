import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "../Article/Article";

/**
 * ArtikelLainnya component to fetch and display a list of related articles.
 *
 * @returns {JSX.Element} The rendered ArtikelLainnya component.
 */
function ArtikelLainnya() {
  const [artikelLainnya, setArtikelLainnya] = useState({ artikelLainnya: [] });
  const blockTitle = "Artikel Lainnya";

  useEffect(() => {
    // Function to fetch the latest articles
    const fetchArticles = async () => {
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

          setArtikelLainnya({ artikelLainnya: processedArticles });
        }
      } catch (error) {
        console.error("Error fetching artikel lainnya:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="artikel-lainnya-container">
      <div className="artikel-lainnya-title">{blockTitle}</div>
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

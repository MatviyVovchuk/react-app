import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "../Article/Article";

/**
 * Arsip component to fetch and display archived articles from 2021.
 *
 * @returns {JSX.Element} The rendered Arsip component.
 */
function Arsip() {
  const [arsip, setArsip] = useState({ arsip: [] });
  const blockTitle = "Arsip 2021";

  useEffect(() => {
    // Function to fetch archived articles
    const fetchArsip = async () => {
      try {
        // Fetch articles data
        const data = await Service.getArsip();
        const trimmedData = data.slice(1);

        if (trimmedData.length) {
          // Process articles and update state
          const processedArticles = trimmedData.map((item) => ({
            articleTitle: item.title.replace(/<\/?[^>]+>/gi, ""),
            articleDate: item.field_date,
            articleLink: item.title.match(/href="([^"]*)"/)
              ? item.title.match(/href="([^"]*)"/)[1]
              : null,
          }));

          setArsip({ arsip: processedArticles });
        }
      } catch (error) {
        console.error("Error fetching archived articles:", error);
      }
    };

    fetchArsip();
  }, []);

  return (
    <div className="arsip-container row">
      <div className="arsip-title">{blockTitle}</div>
      <div className="arsip-articles">
        {arsip.arsip.map((article, index) => (
          <Article
            key={index}
            articleLink={article.articleLink}
            articleDate={article.articleDate}
            articleTitle={article.articleTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default Arsip;

import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "../Article/Article";

function Arsip() {
  const [arsip, setArsip] = useState({ arsip: [] });
  const blockTitle = "Arsip 2021";

  useEffect(() => {
    const fetchArsip = async () => {
      try {
        const data = await Service.getArsip();
        const trimmedData = data.slice(1);

        if (trimmedData) {
          setArsip({
            arsip: trimmedData.map((item, index) => ({
              articleTitle: item.title.replace(/<\/?[^>]+>/gi, ""),
              articleDate: item.field_date,
              articleLink: item.title.match(/href="([^"]*)"/)
                ? item.title_1.match(/href="([^"]*)"/)[1]
                : null,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching tutorial design:", error);
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

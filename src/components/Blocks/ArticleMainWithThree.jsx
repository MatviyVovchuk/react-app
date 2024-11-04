import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import Article from "../Article/Article";

/**
 * ArticleMainWithThree component to fetch and display an important article
 * along with other related articles.
 *
 * @returns {JSX.Element} The rendered ArticleMainWithThree component.
 */
function ArticleMainWithThree() {
  const [articles, setArticles] = useState({
    importantArticle: {},
    otherArticles: [],
  });

  useEffect(() => {
    // Function to fetch articles and their images
    const fetchTeasers = async () => {
      try {
        // Fetch important and other articles
        const responseImportant = await Service.getImportantTeaser();
        const responseOther = await Service.getOtherTeasers();

        // Get image URL for the important article
        const importantImageUrl = await Service.getImageUrl(
          responseImportant[0].field_image_1
        );

        // Get image URLs for other articles concurrently
        const otherImageUrls = await Promise.all(
          responseOther.map((item) => Service.getImageUrl(item.field_image_1))
        );

        // Check if responses are valid before setting state
        if (responseImportant && responseOther) {
          setArticles({
            importantArticle: {
              articleImages: importantImageUrl,
              articleDate: responseImportant[0].field_date,
              articleBody: responseImportant[0].body.replace(
                /<\/?[^>]+>/gi,
                ""
              ),
              articleTitle: responseImportant[0].title_1,
              articleLink: responseImportant[0].view_node,
            },
            otherArticles: responseOther.map((item, index) => ({
              articleImages: otherImageUrls[index],
              articleDate: item.field_date,
              articleTitle: item.title_1,
              articleLink: item.view_node,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching teasers (ArticleMainWithThree):", error);
      }
    };

    fetchTeasers();
  }, []);

  return (
    <div className="feature-article row">
      <div className="important-article col-lg-6 col-md-12">
        <Article
          articleLink={articles.importantArticle.articleLink}
          articleImageUrl={articles.importantArticle.articleImages}
          articleImageAlt={articles.importantArticle.articleTitle}
          articleDate={articles.importantArticle.articleDate}
          articleTitle={articles.importantArticle.articleTitle}
          articleBody={articles.importantArticle.articleBody}
          articleImageClass="col-lg-12 col-md-6"
          articleDataClass="col-lg-12 col-md-6"
        />
      </div>
      <div className="other-article col-lg-6 col-md-12">
        {articles.otherArticles.map((article, index) => (
          <Article
            key={index}
            articleLink={article.articleLink}
            articleImageUrl={article.articleImages}
            articleImageAlt={article.articleTitle}
            articleDate={article.articleDate}
            articleTitle={article.articleTitle}
            articleBody={article.articleBody}
            articleImageClass="col-lg-5 col-md-3"
            articleDataClass="col-lg-7 col-md-9 col-sm-7 col-7"
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleMainWithThree;

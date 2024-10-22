import React from "react";

function Article(props) {
  const {
    articleLink,
    articleImageUrl,
    articleImageAlt,
    articleDate,
    articleTitle,
    articleBody,
    articleImageClass,
    articleDataClass,
  } = props;

  return (
    <div className="article-container">
      <a href={articleLink}>
        <div className="article row">
          <div
            className={
              "article-image " + (articleImageClass ? articleImageClass : "")
            }
          >
            <img src={articleImageUrl} alt={articleImageAlt} />
          </div>
          <div
            className={
              "article-data " + (articleDataClass ? articleDataClass : "")
            }
          >
            <div className="article-data-date">{articleDate}</div>
            <div className="article-data-title">{articleTitle}</div>
            <div className="article-data-body">{articleBody}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Article;

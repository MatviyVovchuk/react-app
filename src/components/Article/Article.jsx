import React from "react";
import PropTypes from "prop-types";

/**
 * Article component to display an article with an image, title, date, and body.
 *
 * @param {Object} props - The component props.
 * @param {string} props.articleLink - The link to the article.
 * @param {string} props.articleImageUrl - The URL of the article image.
 * @param {string} props.articleImageAlt - The alt text for the article image.
 * @param {string} props.articleDate - The date the article was published.
 * @param {string} props.articleTitle - The title of the article.
 * @param {string} props.articleBody - The body content of the article.
 * @param {string} [props.articleImageClass] - Optional additional classes for the image.
 * @param {string} [props.articleDataClass] - Optional additional classes for the data container.
 * @returns {JSX.Element} The rendered Article component.
 */
function Article(props) {
  const {
    articleLink,
    articleImageUrl,
    articleImageAlt,
    articleDate,
    articleTitle,
    articleBody,
    articleImageClass = "",
    articleDataClass = "",
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

// Define PropTypes for the component
Article.propTypes = {
  articleLink: PropTypes.string,
  articleImageUrl: PropTypes.string,
  articleImageAlt: PropTypes.string,
  articleDate: PropTypes.string,
  articleTitle: PropTypes.string,
  articleBody: PropTypes.string,
  articleImageClass: PropTypes.string,
  articleDataClass: PropTypes.string,
};

export default Article;

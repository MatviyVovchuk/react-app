import React from "react";

function Teaser(props) {
  const {
    teaserLink,
    teaserImageUrl,
    teaserImageAlt,
    teaserDate,
    teaserTitle,
    teaserBody,
    teaserImageClass,
    teaserDataClass,
  } = props;

  return (
    <div className="teaser-container">
      <a href={teaserLink}>
        <div className="teaser row">
          <div
            className={
              "teaser-image " + (teaserImageClass ? teaserImageClass : "")
            }
          >
            <img src={teaserImageUrl} alt={teaserImageAlt} />
          </div>
          <div
            className={
              "teaser-data " + (teaserDataClass ? teaserDataClass : "")
            }
          >
            <div className="teaser-data-date">{teaserDate}</div>
            <div className="teaser-data-title">{teaserTitle}</div>
            <div className="teaser-data-body">{teaserBody}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Teaser;

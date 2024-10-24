import React from "react";

function StaticBlock(props) {
  const {
    blockTitle,
    blockImageUrl,
    blockImageAlt,
    blockBody,
    blockLink,
    blockLinkUrl,
  } = props;

  return (
    <div className="static-block-container row">
      <div className="static-block-data col-lg-6 col-md-12">
        <div className="static-block-data-title">{blockTitle}</div>
        <div className="static-block-data-body">{blockBody}</div>
        <div className="static-block-data-read-more">
          <a className="read-more" href={blockLinkUrl}>
            {blockLink}
          </a>
        </div>
      </div>
      <div className="static-block-image col-lg-6 col-md-12">
        <img src={blockImageUrl} alt={blockImageAlt} />
      </div>
    </div>
  );
}

export default StaticBlock;

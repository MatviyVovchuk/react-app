import React from "react";
import PropTypes from "prop-types";

/**
 * StaticBlock component displays a block with a title, body, an image, and a link.
 *
 * @param {Object} props - The props object.
 * @param {string} props.blockTitle - The title of the block.
 * @param {string} props.blockImageUrl - The URL of the block image.
 * @param {string} props.blockImageAlt - The alt text for the block image.
 * @param {string} props.blockBody - The body text of the block.
 * @param {string} props.blockLink - The text for the read more link.
 * @param {string} props.blockLinkUrl - The URL for the read more link.
 * @returns {JSX.Element} The rendered StaticBlock component.
 */
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

// Define PropTypes for the component
StaticBlock.propTypes = {
  blockTitle: PropTypes.string,
  blockImageUrl: PropTypes.string,
  blockImageAlt: PropTypes.string,
  blockBody: PropTypes.string,
  blockLink: PropTypes.string,
  blockLinkUrl: PropTypes.string,
};

export default StaticBlock;

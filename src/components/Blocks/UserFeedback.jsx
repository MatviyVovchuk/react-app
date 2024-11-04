import React from "react";
import PropTypes from "prop-types";

/**
 * UserFeedback component displays feedback from a user.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.userFeedbackImageUrl - URL of the user's feedback image.
 * @param {string} props.userFeedbackImageAlt - Alt text for the feedback image.
 * @param {string} props.userFeedbackRemember - The name or identifier of the user providing feedback.
 * @param {string} props.userFeedbackBody - The content of the feedback.
 * @returns {JSX.Element} The rendered UserFeedback component.
 */
function UserFeedback(props) {
  const {
    userFeedbackImageUrl,
    userFeedbackImageAlt,
    userFeedbackRemember,
    userFeedbackBody,
  } = props;

  return (
    <div className="feedback-container">
      <div className="feedback row">
        <div className={"feedback-image"}>
          <img src={userFeedbackImageUrl} alt={userFeedbackImageAlt} />
        </div>
        <div className={"feedback-data"}>
          <div className="feedback-data-body">{userFeedbackBody}</div>
          <div className="feedback-data-remember">{userFeedbackRemember}</div>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes for the component
UserFeedback.propTypes = {
  userFeedbackImageUrl: PropTypes.string,
  userFeedbackImageAlt: PropTypes.string,
  userFeedbackRemember: PropTypes.string,
  userFeedbackBody: PropTypes.string,
};

export default UserFeedback;

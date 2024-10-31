import React from "react";

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

export default UserFeedback;

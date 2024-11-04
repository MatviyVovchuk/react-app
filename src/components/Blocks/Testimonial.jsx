import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import UserFeedback from "./UserFeedback";

/**
 * Testimonial component fetches and displays user testimonials.
 *
 * @returns {JSX.Element} The rendered Testimonial component.
 */
function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const blockTitle = "Testimonial";

  useEffect(() => {
    // Fetch testimonials from the service
    const fetchTestimonials = async () => {
      try {
        const data = await Service.getTestimonials();

        if (data) {
          const formattedTestimonials = data.map((item) => ({
            testimonialImageUrl: Service.getImageUrl(item.field_image_1),
            testimonialRemember: item.field_remember,
            testimonialBody: item.body.replace(/<\/?[^>]+>/gi, ""),
          }));

          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonial-container row">
      <div className="testimonial-title">{blockTitle}</div>
      <div className="testimonial-user-feedback">
        {testimonials
          .slice()
          .reverse()
          .map((feedback, index) => (
            <UserFeedback
              key={index}
              userFeedbackImageUrl={feedback.testimonialImageUrl}
              userFeedbackImageAlt={feedback.testimonialRemember}
              userFeedbackRemember={feedback.testimonialRemember}
              userFeedbackBody={feedback.testimonialBody}
            />
          ))}
      </div>
    </div>
  );
}

export default Testimonial;

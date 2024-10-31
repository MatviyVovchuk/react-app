import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import UserFeedback from "./UserFeedback";

function Testimonial() {
  const [testimonial, setTestimonial] = useState({ testimonial: [] });
  const blockTitle = "Testimonial";

  useEffect(() => {
    const fetchSidebarImage = async () => {
      try {
        const data = await Service.getTestimonials();

        if (data) {
          setTestimonial({
            testimonial: data.map((item, index) => ({
              testimonialImageUrl: Service.getImageUrl(item.field_image_1),
              testimonialRemember: item.field_remember,
              testimonialBody: item.body.replace(/<\/?[^>]+>/gi, ""),
            })),
          });

          console.log(testimonial);
        }
      } catch (error) {
        console.error("Error fetching sidebar image:", error);
      }
    };

    fetchSidebarImage();
  }, []);

  return (
    <div className="testimonial-container row">
      <div className="testimonial-title">{blockTitle}</div>
      <div className="testimonial-user-feedback">
        {testimonial.testimonial
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

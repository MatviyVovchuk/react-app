import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import Teaser from "./Teaser";

function TeaserMainWithThree() {
  const [teasers, setTeasers] = useState({
    importantTeaser: null,
    otherTeasers: [],
  });

  useEffect(() => {
    const fetchTeasers = async () => {
      try {
        const responseImportant = await Service.getImportantTeser();
        const responseOther = await Service.getOtherTeasers();

        const importantImageUrl = await Service.getImageUrl(
          responseImportant[0].field_image_1
        );

        const otherImageUrls = await Promise.all(
          responseOther.map((item) => {
            return Service.getImageUrl(item.field_image_1);
          })
        );

        if (responseImportant && responseOther) {
          setTeasers({
            importantTeaser: {
              teaserImages: importantImageUrl,
              teasereDate: responseImportant[0].field_date,
              teaserBody: responseImportant[0].body.replace(/<\/?[^>]+>/gi, ""),
              teaserTitle: responseImportant[0].title_1,
              teaserLink: responseImportant[0].view_node,
            },
            otherTeasers: responseOther.map((item, index) => ({
              teaserImages: otherImageUrls[index],
              teasereDate: item.field_date,
              teaserTitle: item.title_1,
              teaserLink: item.view_node,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching teasers (TeaserMainWithThree):", error);
      }
    };

    fetchTeasers();
  }, []);

  if (!teasers.importantTeaser || teasers.otherTeasers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teaser-main-w3 row">
      <div className="important-teaser col-lg-6 col-md-12">
        <Teaser
          teaserLink={teasers.importantTeaser.teaserLink}
          teaserImageUrl={teasers.importantTeaser.teaserImages}
          teaserImageAlt={teasers.importantTeaser.teaserTitle}
          teaserDate={teasers.importantTeaser.teasereDate}
          teaserTitle={teasers.importantTeaser.teaserTitle}
          teaserBody={teasers.importantTeaser.teaserBody}
        />
      </div>
      <div className="other-teaser col-lg-6 col-md-12">
        {teasers.otherTeasers.map((teaser, index) => (
          <Teaser
            key={index}
            teaserLink={teaser.teaserLink}
            teaserImageUrl={teaser.teaserImages}
            teaserImageAlt={teaser.teaserTitle}
            teaserDate={teaser.teasereDate}
            teaserTitle={teaser.teaserTitle}
            teaserBody={teaser.teaserBody}
            teaserImageClass="col-lg-5 col-md-3"
            teaserDataClass="col-lg-7 col-md-9 col-sm-7 col-7"
          />
        ))}
      </div>
    </div>
  );
}

export default TeaserMainWithThree;

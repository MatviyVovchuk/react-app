import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import ArticleSlider from "../../Article/ArticleSlider";

function PilihanEditor() {
  const [pilihanEditor, setPilihanEditor] = useState({ pilihanEditor: [] });
  const blockTitle = "Pilihan Editor";

  useEffect(() => {
    const fetchPilihanEditor = async () => {
      try {
        const data = await Service.getPilihanEditor();

        if (data) {
          const dataImageUrls = await Promise.all(
            data.map((item) => {
              return Service.getImageUrl(item.field_image_1);
            })
          );
          setPilihanEditor({
            pilihanEditor: data.map((item, index) => ({
              articleTitle: item.title_1.replace(/<\/?[^>]+>/gi, ""),
              articleBody: item.body.replace(/<\/?[^>]+>/gi, ""),
              articleDate: item.field_date,
              articleImage: dataImageUrls[index],
              articleLink: item.title_1.match(/href="([^"]*)"/)
                ? item.title_1.match(/href="([^"]*)"/)[1]
                : null,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching tutorial design:", error);
      }
    };

    fetchPilihanEditor();
  }, []);

  return (
    <ArticleSlider
      articles={pilihanEditor.pilihanEditor.slice(1, -1)}
      blockTitle={blockTitle}
      containerClass="pilihan-editor-container"
      titleClass="pilihan-editor-title"
      sliderClass="pilihan-editor-slider-container row g-0"
    />
  );
}

export default PilihanEditor;

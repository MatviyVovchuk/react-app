import React, { useEffect, useState } from "react";
import Service from "../../../services/Service";
import ArticleSlider from "../../Article/ArticleSlider";

/**
 * PilihanEditor component to fetch and display articles selected by the editor.
 *
 * @returns {JSX.Element} The rendered PilihanEditor component.
 */
function PilihanEditor() {
  const [pilihanEditor, setPilihanEditor] = useState({ pilihanEditor: [] });
  const blockTitle = "Pilihan Editor";

  useEffect(() => {
    // Function to fetch the selected articles by the editor
    const fetchPilihanEditor = async () => {
      try {
        // Fetch articles data
        const data = await Service.getPilihanEditor();

        if (data) {
          // Fetch image URLs concurrently
          const dataImageUrls = await Promise.all(
            data.map((item) => Service.getImageUrl(item.field_image_1))
          );

          // Process articles and update state
          const processedArticles = data.map((item, index) => ({
            // Remove HTML tags from title and body
            articleTitle: item.title_1.replace(/<\/?[^>]+>/gi, ""),
            articleBody: item.body.replace(/<\/?[^>]+>/gi, ""),
            articleDate: item.field_date,
            articleImage: dataImageUrls[index],
            articleLink: item.title_1.match(/href="([^"]*)"/)
              ? item.title_1.match(/href="([^"]*)"/)[1]
              : null,
          }));

          setPilihanEditor({ pilihanEditor: processedArticles });
        }
      } catch (error) {
        console.error("Error fetching editor's choice articles:", error);
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

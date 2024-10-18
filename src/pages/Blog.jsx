import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import Header from "../components/Header";
import TeaserMainWithThree from "../components/Blocks/Teaser/TeaserMainWithThree";

function Blog() {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const titleData = await Service.getPageTitle();
        if (titleData) {
          const rawHtmlTitle = titleData?.data?.[0]?.body?.value;
          if (rawHtmlTitle) {
            const cleanTitle = rawHtmlTitle.replace(/<\/?[^>]+>/gi, "");
            setPageTitle(cleanTitle);
          }
        }
      } catch (error) {
        console.error("Error fetching page title:", error);
      }
    };
    fetchTitle();
  }, []);

  return (
    <div className="blog-container background-dark">
      <h1 className="title blog-page-title">{pageTitle}</h1>
      <TeaserMainWithThree />
    </div>
  );
}

export default Blog;

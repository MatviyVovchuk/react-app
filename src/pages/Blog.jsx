import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import Header from "../components/Header";
import ArticleMainWithThree from "../components/Blocks/Article/ArticleMainWithThree";
import TutorialDesign from "../components/Blocks/TutorialDesign";
import StaticBlock from "../components/Blocks/StaticBlock";
import PilihanEditor from "../components/Blocks/PilihanEditor";
import ArtikelTerbaru from "../components/Blocks/ArtikelTerbaru";

function Blog() {
  const [pageTitle, setPageTitle] = useState("");
  const [firstStaticBlock, setFirstStaticBlock] = useState({
    staticBlockData: [],
    staticBlockBody: "",
    staticBlockImageUrl: "",
  });

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

  useEffect(() => {
    const fetchFirstStaticBlock = async () => {
      try {
        const fStaticBlockData = await Service.getFirstStaticBlock();

        if (fStaticBlockData) {
          const blockDataImageUrl = await Service.getImageUrl(
            fStaticBlockData.data.field_image.uri.url
          );
          setFirstStaticBlock({
            staticBlockData: fStaticBlockData.data,
            staticBlockBody: fStaticBlockData.data.body.processed.replace(
              /<\/?[^>]+>/gi,
              ""
            ),
            staticBlockImageUrl: blockDataImageUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching first static block:", error);
      }
    };
    fetchFirstStaticBlock();
  }, []);

  return (
    <div className="blog-container">
      <div className="dark">
        <Header />
        <h1 className="title blog-page-title">{pageTitle}</h1>
        <ArticleMainWithThree />
      </div>
      <div className="whitearea">
        <TutorialDesign />
      </div>
      <div className="dark">
        <StaticBlock
          blockTitle={firstStaticBlock.staticBlockData.field_title}
          blockImageUrl={firstStaticBlock.staticBlockImageUrl}
          blockImageAlt={firstStaticBlock.staticBlockData.field_title}
          blockBody={firstStaticBlock.staticBlockBody}
          blockLink={
            firstStaticBlock.staticBlockData.field_link &&
            firstStaticBlock.staticBlockData.field_link.title
          }
          blockLinkUrl={
            firstStaticBlock.staticBlockData.field_link &&
            firstStaticBlock.staticBlockData.field_link.uri
          }
        />
      </div>
      <div className="whitearea">
        <PilihanEditor />
      </div>
      <div className="whitearea">
        <ArtikelTerbaru />
      </div>
    </div>
  );
}

export default Blog;

import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import Header from "../components/Header";
import ArticleMainWithThree from "../components/Blocks/ArticleMainWithThree";
import TutorialDesign from "../components/Blocks/Slider/TutorialDesign";
import StaticBlock from "../components/Blocks/StaticBlock";
import PilihanEditor from "../components/Blocks/Slider/PilihanEditor";
import ArtikelTerbaru from "../components/Blocks/ArtikelTerbaru";
import IndustriDesign from "../components/Blocks/Slider/IndustriDesign";
import ArtikelLainnya from "../components/Blocks/ArtikelLainnya";
import Arsip from "../components/Blocks/Arsip";
import Testimonial from "../components/Blocks/Testimonial";
import SidebarImage from "../components/Blocks/SidebarImage";
import BackToTop from "../components/BackToTop";

/**
 * Blog component renders the main structure of the blog page.
 *
 * @returns {JSX.Element} The rendered blog component.
 */
function Blog() {
  const [pageTitle, setPageTitle] = useState(""); // State to hold the page title
  const [firstStaticBlock, setFirstStaticBlock] = useState({}); // State for the first static block
  const [secondStaticBlock, setSecondStaticBlock] = useState({}); // State for the second static block

  // Fetch the page title from the service
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const titleData = await Service.getPageTitle();
        if (titleData) {
          const rawHtmlTitle = titleData?.data?.[0]?.body?.value;
          const cleanTitle = rawHtmlTitle
            ? rawHtmlTitle.replace(/<\/?[^>]+>/gi, "")
            : "";
          setPageTitle(cleanTitle); // Set the cleaned title
        }
      } catch (error) {
        console.error("Error fetching page title:", error);
      }
    };
    fetchTitle();
  }, []);

  // Fetch the first static block data
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

  // Fetch the second static block data
  useEffect(() => {
    const fetchSecondStaticBlock = async () => {
      try {
        const fStaticBlockData = await Service.getSecondStaticBlock();
        if (fStaticBlockData) {
          const blockDataImageUrl = await Service.getImageUrl(
            fStaticBlockData.data.field_image.uri.url
          );
          setSecondStaticBlock({
            staticBlockData: fStaticBlockData.data,
            staticBlockBody: fStaticBlockData.data.body.processed.replace(
              /<\/?[^>]+>/gi,
              ""
            ),
            staticBlockImageUrl: blockDataImageUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching second static block:", error);
      }
    };
    fetchSecondStaticBlock();
  }, []);

  return (
    <div className="blog-container container">
      <div className="dark">
        <Header />
        <h1 className="title blog-page-title">{pageTitle}</h1>
        <ArticleMainWithThree />
      </div>
      <div className="whitearea">
        <TutorialDesign />
      </div>
      <div className="dark static-block-padding">
        <StaticBlock
          blockTitle={firstStaticBlock.staticBlockData?.field_title}
          blockImageUrl={firstStaticBlock.staticBlockImageUrl}
          blockImageAlt={firstStaticBlock.staticBlockData?.field_title}
          blockBody={firstStaticBlock.staticBlockBody}
          blockLink={firstStaticBlock.staticBlockData?.field_link?.title}
          blockLinkUrl={firstStaticBlock.staticBlockData?.field_link?.uri}
        />
      </div>
      <div className="whitearea">
        <PilihanEditor />
      </div>
      <div className="yellow static-block-padding">
        <StaticBlock
          blockTitle={secondStaticBlock.staticBlockData?.field_title}
          blockImageUrl={secondStaticBlock.staticBlockImageUrl}
          blockImageAlt={secondStaticBlock.staticBlockData?.field_title}
          blockBody={secondStaticBlock.staticBlockBody}
          blockLink={secondStaticBlock.staticBlockData?.field_link?.title}
          blockLinkUrl={secondStaticBlock.staticBlockData?.field_link?.uri}
        />
      </div>
      <div className="whitearea">
        <ArtikelTerbaru />
      </div>
      <div className="dark">
        <IndustriDesign />
      </div>
      <div className="whitearea">
        <div className="other-blocks-container row">
          <div className="left-container col-lg-8">
            <ArtikelLainnya />
          </div>
          <div className="right-container col-lg-4">
            <Arsip />
            <SidebarImage />
            <Testimonial />
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}

export default Blog;

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

function Blog() {
  const [pageTitle, setPageTitle] = useState("");
  const [firstStaticBlock, setFirstStaticBlock] = useState({
    staticBlockData: [],
    staticBlockBody: "",
    staticBlockImageUrl: "",
  });
  const [secondStaticBlock, setSecondStaticBlock] = useState({
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
      <div className="yellow">
        <StaticBlock
          blockTitle={secondStaticBlock.staticBlockData.field_title}
          blockImageUrl={secondStaticBlock.staticBlockImageUrl}
          blockImageAlt={secondStaticBlock.staticBlockData.field_title}
          blockBody={secondStaticBlock.staticBlockBody}
          blockLink={
            secondStaticBlock.staticBlockData.field_link &&
            secondStaticBlock.staticBlockData.field_link.title
          }
          blockLinkUrl={
            secondStaticBlock.staticBlockData.field_link &&
            secondStaticBlock.staticBlockData.field_link.uri
          }
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
    </div>
  );
}

export default Blog;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import agent from "../../../../api/Agent";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import Checkbox from "../../../utilities/checkbox/Checkbox";
import "./ManagementUploadImages.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale-subtle.css";

import {
  setCopiedImagesLinks,
  setUploadedImagesLinks,
} from "./UploadImageSlice";

const ManagementUploadImages = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.uploadedImages);
  //select all image links
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  // const [uploadedImageLink, setUploadedImageLink] = useState<
  //   { id: string; name: string }[]
  // >([]);
  // const [list, setList] = useState([]);
  //upload image and their preview
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState<string[]>();
  const OpenFileRef = useRef<HTMLInputElement>(null);
  const showOpenFileDialog = () => {
    OpenFileRef.current?.click();
  };
  const onFileChange = (event: any) => {
    const images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setSelectedImageFiles(event.target.files);
    setPreviewImages(images);
  };
  useEffect(() => {
    localStorage.setItem("CopiedImages", JSON.stringify([]));
  }, []);

  const uploadImagesHandler = async () => {
    const formData = new FormData();
    formData.append("PathDir", "Images");
    // formData.append("user-file", selectedImageFiles[0]);

    for (let i = 0; i < selectedImageFiles.length; i++) {
      formData.append(`file-${i}`, selectedImageFiles[i]);
    }
    try {
      const response = await agent.Product.uploadImages(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      let array: any = [];
      response.result.map((link: any, index: number) => {
        if (
          link.error === 0 &&
          link.exist === "true" &&
          link.extension_error === "false" &&
          link.max_size_error === "false"
        ) {
          const temp = {
            id: JSON.stringify(index),
            name: link.save_result.success,
          };

          array.push(temp);
        }
      });
      // setUploadedImageLink(array);
      dispatch(setUploadedImagesLinks(array));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectAll = (e: any) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(selector.uploadedImages!.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: any) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck!, id]);
    if (!checked) {
      setIsCheck(isCheck!.filter((item) => item !== id));
    }
  };

  const copyLinksHandler = () => {
    let array: string[] = [];
    if (isCheck.length > 0 && selector.uploadedImages.length > 0) {
      selector.uploadedImages.map((i, index) =>
        i.id === isCheck[index] ? array.push(i.name) : null
      );
      dispatch(setCopiedImagesLinks(array));
      localStorage.setItem("CopiedImages", JSON.stringify(array));
    }
  };

  const catalog = selector.uploadedImages!.map(({ id, name }) => {
    return (
      <div className="d-flex align-items-center" key={id}>
        <Checkbox
          key={id}
          name={name}
          id={id}
          handleClick={handleClick}
          isChecked={isCheck!.includes(id)}
        />
        {name}
      </div>
    );
  });

  return (
    <>
      <div>
        <h6 className="MANPmainTitle border-bottom">
          بارگذاری تصاویر
          <span className="fs-6 fw-light">(تصاویر را یکجا انتخاب کنید) </span>
        </h6>
      </div>
      <div className="d-flex justify-content-start flex-wrap border-bottom pb-2">
        <input
          type="file"
          multiple
          onChange={(e) => onFileChange(e)}
          ref={OpenFileRef}
          style={{ display: "none" }}
        />
        <a
          type="file"
          onClick={() => showOpenFileDialog()}
          className="d-flex justify-content-center align-items-center MUIuploadBtn"
        >
          + تصویر
        </a>
        {previewImages && (
          <>
            {previewImages.map((img, index) => {
              return (
                <div
                  key={index}
                  className="img-thumbnail   d-flex justify-content-center align-items-center MUIimageBorder"
                >
                  <img src={img} alt={"image-" + index} key={index} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <button
        className="btn btn-sm  MUIbuttonStyle my-2"
        onClick={() => uploadImagesHandler()}
      >
        بارگذاری
      </button>

      <div className="border-top">
        <p className="MUITitle">لینک تصاویر بارگذاری شده</p>

        <div>
          {selector.uploadedImages.length > 0 && (
            <div className="MUIlinkList">
              <div className="d-flex align-items-center mb-2">
                <Checkbox
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
                انتخاب همه
                <Tippy
                  content="کپی شد!"
                  placement="top"
                  animation="scale-subtle"
                  theme="material"
                  arrow={false}
                  duration={200}
                  trigger="click"
                  delay={[0, 1000]}
                >
                  <i
                    className="bi bi-stickies ms-5 me-1 cursorPointer"
                    onClick={copyLinksHandler}
                  ></i>
                </Tippy>
                کپی لینک&zwnj;های انتخاب شده
              </div>
              {catalog}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ManagementUploadImages;

import React, { useState, useEffect } from "react";
import { CallGPT } from "./components/api/APIConnect";

function Transform(props) {
  const [imgList, setImgList] = useState([]);
  let files = props.files;
  let items = JSON.stringify(props.items);
  let lang = props.lang;
  let formData = JSON.stringify(props.formData);
  let fileNameResultList = [];

  const transform = async () => {
    const nowImageURLList = [];
    props.tabEvent("B");
    props.transformEvent(["파일명 생성중입니다"]);
    for (let i = 0; i < files.length; i++) {
      const index = files[i].type.indexOf("/");
      const filetype =
        index !== -1 ? files[i].type.substring(0, index) : files[i].type;
      if (filetype == "image") {
        try {
          // const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
          const convertedFile = await convertToBase64(files[i]);
          nowImageURLList.push(convertedFile);
        } catch (error) {
          console.error("서버로 파일 전송 중 오류가 발생했습니다:", error);
        }
      } else if (files[i].type == "application/pdf") {
      }
    }
    setImgList([...nowImageURLList]);
  };

    // OpenAI API호출
    useEffect(() => {
      const callGtpAPI = async (imgList) => {
        for (let imgUrl of imgList) {
          await CallGPT(imgUrl).then((res) => {
            console.log("***********");
            console.log("res>", res)
            fileNameResultList.push(res);
            console.log(fileNameResultList);
            props.transformEvent(fileNameResultList);
            console.log("***********");
  
          });
        }
      };
      callGtpAPI(imgList);
    }, [imgList]);

  //base64로 파일 변경
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="header">
      <h2>변환 옵션</h2>
      <button className="convert-button" onClick={transform}>
        변환하기
      </button>
    </div>
  );
}

export default Transform;

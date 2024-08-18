import React, { useState, useEffect }from "react";
import { CallGPT } from "./components/api/APIConnect";
import FileBase64 from 'react-file-base64';

function Transform(props) {
  const [imgList, setImgList] = useState([]);
  
    const transform = async () =>{
      let files = props.files;
      let items = props.items;
      let lang = props.lang;
      let formData = props.formData;

      const nowImageURLList = [];
      alert(JSON.stringify(items));
      alert(lang);
      alert(JSON.stringify(formData));
      for(let i = 0; i < files.length; i++){
        const index = files[i].type.indexOf('/');
        const filetype = index !== -1 ? files[i].type.substring(0, index) : files[i].type;
        if(filetype == 'image'){
          try {
            // const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
            const convertedFile = await convertToBase64(files[i]);
            nowImageURLList.push(convertedFile);
          } catch (error) {
            console.error("서버로 파일 전송 중 오류가 발생했습니다:", error);
          }
        }
        else if(files[i].type == 'application/pdf'){
          
        }
      }
      setImgList([...nowImageURLList]);
    }
  // OpenAI API호출
  useEffect(() => {
    for (let imgUrl of imgList){
      handleClickAPICall(imgUrl);
    }
  },[imgList]);

  //base64로 파일 변경
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  
      reader.readAsDataURL(file);
    });
  }

    const handleClickAPICall = async (imgUrl) => {
      await CallGPT(imgUrl);
    };

    return (
      <div className="header">
        <h2>변환 옵션</h2>
        <button className="convert-button" onClick={transform}>변환하기</button>
      </div>
    );
}

export default Transform;
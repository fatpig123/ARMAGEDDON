import React from "react";
import { CallGPT } from "./components/api/APIConnect";

function Transform(props) {
    const transform = async () =>{
      let files = props.files;
      let items = props.items;
      let lang = props.lang;
      let formData = props.formData;

      alert(JSON.stringify(items));
      alert(lang);
      alert(JSON.stringify(formData));
      for(let i = 0; i < files.length; i++){
        const index = files[i].type.indexOf('/');
        const filetype = index !== -1 ? files[i].type.substring(0, index) : files[i].type;
        if(filetype == 'image'){
          try {
            const formData = new FormData();
            formData.append('file', files[i]);
            console.log(files[i]);
            const response = await fetch("http://localhost:5000/ask", {
              method: "POST",
              body: formData,
            });

            const data = await response.json(); // JSON 응답을 파싱
            alert(data.answer)

          } catch (error) { 
            console.error("서버로 파일 전송 중 오류가 발생했습니다:", error);
          }
        }
        else if(files[i].type == 'application/pdf'){
          
        }
      } 
    }

    return (
      <div className="header">
        <h2>변환 옵션</h2>
        <button className="convert-button" onClick={transform}>변환하기</button>
      </div>
    );
}

export default Transform;
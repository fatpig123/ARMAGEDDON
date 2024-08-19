import React from "react";

export default class transform extends React.Component {
  
    transform = async () =>{
      let files = this.props.files;
      let items = this.props.items;
      let lang = this.props.lang;
      let formData = this.props.formData;
      let filePaths = this.props.filePaths;

      for(let i = 0; i < files.length; i++){
        const index = files[i].type.indexOf('/');
        const filetype = index !== -1 ? files[i].type.substring(0, index) : files[i].type;
        if(filetype == 'image'){
          try {
            const sendData = new FormData();
            sendData.append('file', files[i]);
            sendData.append('type', files[i].type);
            for(let i = 0; i < items.length; i++){
              if(items[i].checked == true){
                
              }
            }
            const response = await fetch("http://43.203.228.172:5000/image", {
              method: "POST",
              body: sendData,
            });

            const data = await response.json(); // JSON 응답을 파싱
            alert(data.answer)
            console.log('Electron object:', window.electron);

            window.electron.renameFile(filePaths[i], data.answer);
          } catch (error) { 
            console.error("서버로 파일 전송 중 오류가 발생했습니다:", error);
          }
        }
        else if(files[i].type == 'application/pdf'){
          
        }
      } 
    }

  render() {
    return (
      <div className="header">
        <h2>변환 옵션</h2>
        <button className="convert-button" onClick={this.transform}>변환하기</button>
      </div>
    );
  }
}

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import "./style.css";
import Transform from "./transform";
import CopyIcon from "./assets/icon/copy.png";
import DownloadIcon from "./assets/icon/download.png";

const initialItems = [
  { id: "1", text: "날짜", checked: true },
  { id: "2", text: "플랫폼", checked: true },
  { id: "3", text: "상품명", checked: true },
  { id: "4", text: "이벤트", checked: true },
  { id: "5", text: "상품구성", checked: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [newFileName, setNewFileName] = useState([]);
  const [newFileNameList, setNewFileNameList] = useState([]);
  const [tabType, setTabType] = useState("A");

  const handleClickCopyButton = (name) => {
    navigator.clipboard.writeText(name);
    alert("클립보드에 복사되었습니다!");
  };

  const handleClickDownloadButton = (index, name) => {
    const element = document.createElement("a");

    let newFile = new Blob([files[index]], {
      type: "img/jpg",
    });

    element.href = URL.createObjectURL(newFile);
    element.download = name + ".jpg";
    document.body.appendChild(element);
    element.click();
  };

  const handleClickAllDownloadButton = () => {
    files.forEach((file, idx) => {
      const element = document.createElement("a");

      let newFile = new Blob([files[idx]], {
        type: "img/jpg",
      });

      element.href = URL.createObjectURL(newFile);
      element.download = newFileName[idx] + ".jpg";
      document.body.appendChild(element);
      element.click();
    });
  };

  const onSetNewFileName = (name) => {
    setNewFileName(name);

    setNewFileNameList(
      name.map((name, index) => (
        <div className="translated-file-item" key={index}>
          <p>{name}</p>
          <div className="translated-file-button-wrapper">
            <img
              src={CopyIcon}
              onClick={() => handleClickCopyButton(name)}
            ></img>
            <img
              src={DownloadIcon}
              onClick={() => handleClickDownloadButton(index, name)}
            ></img>
          </div>
        </div>
      ))
    );
  };

  const [formData, setFormData] = useState({
    specialInclude: false,
    underbarInclude: false,
    productName: "",
    eventName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  const handleCheckboxChange = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setIsDragActive(false);
  }, []);

  const onDragEnter = useCallback(() => {
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
  });

  const [selectedOption, setSelectedOption] = useState("eng");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container">
      <h1>파일명 변환기</h1>
      <div
        className="main-content"
        style={{ display: tabType == "B" ? "none" : "flex" }}
      >
        <div className="left-side">
          <h2>파일 리스트</h2>
          <div
            {...getRootProps({
              className: `dropzone ${isDragActive ? "active" : ""}`,
            })}
          >
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <p>
                <span role="img" aria-label="upload icon">
                  📂
                </span>{" "}
                여기에 파일을 드래그 앤 드롭하세요.
              </p>
            ) : (
              <>
                <div className="file-count">총 {files.length}개</div>
                <div className="file-list">
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="right-side">
          <Transform
            files={files}
            items={items}
            lang={selectedOption}
            formData={formData}
            transformEvent={onSetNewFileName}
            tabEvent={setTabType}
          />
          <div className="controls">
            <div className="leftbox">
              <div className="radio-group options">
                <div
                  className={`radio-option ${
                    selectedOption === "eng" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="option1"
                    name="radio-option"
                    value="eng"
                    checked={selectedOption === "eng"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option1">영어</label>
                </div>
                <div
                  className={`radio-option last-option ${
                    selectedOption === "kor" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="option2"
                    name="radio-option"
                    value="kor"
                    checked={selectedOption === "kor"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option2">한국어</label>
                </div>
              </div>
              <div className="options options2">
                <label>
                  상품명 입력{" "}
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  이벤트명 입력{" "}
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="options options-checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="specialInclude"
                    checked={formData.specialInclude}
                    onChange={handleChange}
                  />{" "}
                  특수문자 모두제외
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="underbarInclude"
                    checked={formData.underbarInclude}
                    onChange={handleChange}
                  />{" "}
                  언더바(_)만 허용
                </label>
              </div>
            </div>
            <div className="rightbox">
              <div className="containerset">
                <h3>
                  다음 정보를 포함하기 &<br></br> 드래그 해서 순서 바꾸기
                </h3>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="items">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="item"
                                style={{
                                  userSelect: "none",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() =>
                                      handleCheckboxChange(item.id)
                                    }
                                  />
                                  {item.text}
                                </label>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="translate-visual-wrapper"
        style={{ display: tabType == "A" ? "none" : "block" }}
      >
        <div className="translate-file-container">
          <div className="translate-file-wrapper">
            <p>변환 전 파일목록</p>
            <div className="translate-file-list">
              {files.map((file) => (
                <div className="file-item" key={file.name}>
                  {file.name}
                </div>
              ))}
            </div>
          </div>
          <div className="translate-file-wrapper">
            <p>변환 후 파일목록</p>
            <div className="translate-file-list">{newFileNameList}</div>
          </div>
        </div>
        <button
          className="convert-button"
          onClick={handleClickAllDownloadButton}
        >
          다운로드
        </button>
        <button
          className="convert-button"
          onClick={() => {
            window.location.reload();
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}

export default App;

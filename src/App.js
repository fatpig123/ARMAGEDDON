import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable, DroppableProps } from 'react-beautiful-dnd';
import './App.css';



const initialItems = [
  { id: '1', text: '날짜', checked: true },
  { id: '2', text: '플랫폼', checked: true },
  { id: '3', text: '상품명', checked: false },
  { id: '4', text: '이벤트', checked: false },
  { id: '5', text: '상품구성', checked: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  const handleCheckboxChange = (id) => {
    const updatedItems = items.map(item =>
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
  
  
  return (
    <div className="container">
      <h1>파일명 변환기</h1>
      <div className="main-content">
        <div className="left-side">
          <h2>파일 리스트</h2>
          <div
            {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}
          >
            <input {...getInputProps()} />
            <p>
              <span role="img" aria-label="upload icon">📂</span> 여기에 파일을 드래그 앤 드롭하세요.
            </p>
            {files.length > 0 && (
              <div className="file-list">
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="right-side">
          <div className="header">
            <h2>변환 옵션</h2>
            <button className="convert-button">변환하기</button>
          </div>
          <div className="controls">
            <div className="leftbox">
              <div className="radio-group options">
                <div className="radio-option selected">
                  <input type="radio" id="option1" name="options" value="eng" />
                  <label htmlFor="option1">영어</label>
                </div>
                <div className="radio-option">
                  <input type="radio" id="option2" name="options" value="kor" />
                  <label htmlFor="option2">한국어</label>
                </div>
              </div>
              <div className="options options2">
                <label>
                  상품명 입력 <input type="text" />
                </label>
                <label>
                  이벤트명 입력 <input type="text" />
                </label>
              </div>
              <div className="options">
                <label>
                  <input type="checkbox" /> 특수문자 모두제외
                </label>
                <label>
                  <input type="checkbox" /> 언더바(_)만 허용
                </label>
              </div>
            </div>
            <div className="rightbox">
              <div className="containerset">
                <h3>다음 정보를 포함하기 & 드래그 해서 순서 바꾸기</h3>
                <DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="items">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="item"
                style={{ userSelect: 'none', ...provided.draggableProps.style }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
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
    </div>
  );
}

export default App;

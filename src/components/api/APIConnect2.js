export const CallGPT = async () => {
  // test 세팅
  const org_file_name = "노트북 할인 메인 수정본";
  const file_keyword = "추석 할인, 이마트, ver.1";
  const file_date = new Date().toLocaleString();

  const message_list = [

    {
      role: "system",
      content:
        "너는 파일명을 만들어주는 기계야. 컴퓨터 지식이 전혀 없는 사람들 대신 컴퓨터 문법을 가진 파일명을 만들어줘.",
    },
    {
      role: "assistant",
      content: "파일명은 날짜, 파일명(프로젝트), 상세정보 순서로 기입합니다. 각 요소를 섞거나 쪼개쓰지 않습니다.",
    },
    {
      role: "assistant",
      content: "파일명은 무조건 영어로 지어야합니다.",
    },
    {
      role: "user",
      content: "파일명(프로젝트)은 실제 존재하는 고유명사인지 한번 확인해. 확인이 안 된다면 로마자 변환을 해서 써.",
    },
    {
      role: "user",
      content:
        "상세정보(키워드)에 대한 유의사항이 있어. 1)모든 상세정보는 숫자나 산술식이 아니라 그저 문자열이야. 2)각 키워드는 띄어쓰기를 하지말고 한 단어로 써줘. 3)각 키워드는 10바이트 이하로 줄여줘.",
    },
    {
      role: "user",
      content:
        "모든 단어가 고유명사인지 한번 확인해. 검색해보고 존재하는 회사명, 프로젝트 등 고유명사라면 검색된 단어를 써.",
    },
    {
      role: "user",
      content: "복사하기 쉽게 파일명만 답해줘."
    },
    {
      role: "user",
      content: "다음은 파일명의 예시야. 참고해서 결과를 내줘. [2024.05.23]computer_helloWorld_2+1sale  [2024.03.29]beerInfo_winenara_1+1_blackFriday  [2024.03.29]galaxySpec_danawa_newyearSale_membership",
    } 
  ]

  message_list.push({ role: "user", content: `파일명에 들어갈 날짜는 [${file_date}]이야.`})
  message_list.push({ role: "user", content: `파일명(프로젝트)은" + ${org_file_name} + "이야. 이것의 파일명을 만들어줘.`})
  message_list.push({ role: "user", content: "파일에 대한 상세 정보야. 상세정보는 키워드로 구성되어있고, 각 키워드는 쉼표로 구분되어있어. @상세정보(키워드) :" + file_keyword})
  // message_list.push({
  //   role: "user",
  //   content: [
  //   {
  //   "type": "text",
  //           "text" : "이 그림을 보고 파일명을 지어줘."   
  //   },    
  //   {
  //   "type": "image_url",
  //           "image_url" : { "url": `data:image/jpeg;base64,${base64_image}`}   
  //   }],
  // })


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: message_list,
      temperature: 0,
      max_tokens: 30,
    }),
  });

  const responseData = await response.json();
  console.log("responseData : ", responseData);
  console.log("responseData : ", responseData.choices[0].message.content);

  return responseData;
};

// export default APIConnect;

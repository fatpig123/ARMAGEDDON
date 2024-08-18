export const CallGPT = async (imgUrl) => {
  // test 세팅
  const file_date = new Date().toLocaleString();

  const message_list= [
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
    { role: "user", content: "파일명에 들어갈 날짜야:" + file_date },
    {
      role: "user",
      content: "파일명(프로젝트)은 실제 존재하는 고유명사인지 한번 확인해. 확인이 안 된다면 로마자 변환을 해서 써.",
    },
    {
      role: "user",
      content:
        "상세정보(키워드)에 대한 유의사항이 있어. 1)모든 상세정보는 숫자나 산술식이 아니라 그저 문자열이야. 2)각 키워드는 띄어쓰기를 하지말고 한 단어로 써줘. 3)각 키워드는 10바이트 이하로 줄여줘. 4)날짜 뒤에 구분자 혹은 특수문자가 있다면 띄어쓰기를 하지 않아도 돼.",
    },
    {
      role: "user",
      content:
        "모든 단어가 고유명사인지 한번 확인해. 검색해보고 존재하는 회사명, 프로젝트 등 고유명사라면 검색된 단어를 써.",
    },
    {
      role: "user",
      content: "복사하기 쉽게 파일명만 답해줘. 예=> [2024.05.23]hello_world_computer_2+1sale",
    },
  ];

  message_list.push({
    role: "user",
    content: [
    {
    "type": "text",
            "text" : "이 그림을 보고 파일명을 지어줘."   
    },    
    {
    "type": "image_url",
            "image_url" : { "url": `${imgUrl}`}   
    }]});

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
  console.log("imgUrl", imgUrl);
  console.log("responseData : ", responseData);
  console.log("responseDataContent : \n", responseData.choices[0].message.content);

  return responseData;
};

// export default APIConnect;

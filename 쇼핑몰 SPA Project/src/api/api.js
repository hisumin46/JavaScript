// http://localhost:8080 - cors-anywhere 서버를 이용하여 cors 오류 잡기
const API_URL = "http://localhost:8080/https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/";
export const request = async (url, options = {})  => {
  const fullUrl = `${API_URL}${url}`;
  let json; // 프로미스에서 함수 리턴 받기 위함
  // fetch로 api 호출
  await fetch(fullUrl, options)
  .then(async (response) => {
    json = await response.json();
    // return response.json(); // 여기서 return하면 다음 프로미스에서 받을 수 있는 리턴
  })
  .catch((error) => {
    console.error(`error: ${error}`);
    alert(error.message);
  })
  return json;
}


export const reqProductList = async () => await request("/products");
export const reqProduct = async (producId) => await request(`/products/${producId}`);
// 컴포넌트 추가 대상
const app = document.querySelector("#app");

// 상태
let state = {items: ["itme1", "itme2", "itme3", "itme4",]}

// render 함수
const render = () => {
  const {items} = state;
  app.innerHTML = `
    <ul>
      ${items.map(i => `<li>${i}</li>`).join('')}
    </ul>
    <button id="append">추가</button>
  `;
  
  // state 변경시 setState 호출
  document.querySelector("#append").addEventListener("click", () => {
    setState({items: [...items, `itme${items.length + 1}`]})
  })
}

// setState 함수 - state 변경시 render 함수 호출
const setState = (newState) => {
  // state 배열에 요소 추가
  state = {...state, ...newState} // state 배열, newState배열
  render();
}

render();
/**
 * HTML History API 를 이용한 새로고침 없이 다른 페이지로 이동 처리
 * 이동할 페이지 URL을 history.pushState를 통해 변경
 * App.js의 this.route 함수를 실행 
 */

const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';

// 커스텀 이벤트 생성 - ROUTE_CHANGE_EVENT
// onRouteChange 호출
export const init = (onRouteChange, param) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange(param);
    // onRouteChange();
  })
}

// URL을 업데이트 
// ROUTE_CHANGE_EVENT 호출
export const routeChange = (url, params) => {
  history.pushState(null, null, url)
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params ))
}

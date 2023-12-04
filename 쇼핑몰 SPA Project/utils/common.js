
/**
 * 10000 -> 10,000 원화표시
 */
function changeFormat(params) {
  return Number(params).toLocaleString("ko-KR");
}

export {changeFormat};
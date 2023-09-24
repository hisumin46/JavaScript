const { pathname } = location;
console.log(location);

if (pathname === '/') { // 상품목록

} else if (pathname.indexOf('/detail/') === 0) { // 상품상세
  const [, , productId] = pathname.split('/') // 가장마지막을 productId로 받기

} else if (pathname === '/cart') { // 장바구니
}


export default class ProductDetailPage {
  constructor($target, productId) {
    this.$target = $target;
    this.productId = productId;
    
    console.log(productId);
    console.log($target);
    
    const $page = document.createElement('div');
    $page.className = 'ProductDetailPage';
    $page.innerHTML = `<h1>${productId} 상품 정보</h1>`;
    this.render($page);
    
  }
  
  render($page) {
    this.$target.appendChild($page);
  }
}
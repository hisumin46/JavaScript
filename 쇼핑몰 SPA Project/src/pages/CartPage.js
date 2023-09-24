export default class CartPage {
  constructor($target) {
    this.$target = $target;
    
    const $page = document.createElement('div');
    $page.className = 'CartPage';
    $page.innerHTML = '<h1>장바구니</h1>';
    this.render($page);
    
  }
  
  render($page) {
    this.$target.appendChild($page);
  }
}
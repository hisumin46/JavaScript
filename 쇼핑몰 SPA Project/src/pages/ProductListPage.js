// export default function ProdcutListPage($target) {
//   const $page = document.querySelector(".ProductListPage");

//   $page.innerHTML = `<h1>상품 목록</h1>`;

//   this.render = () => {
//     $target.append($page);
//   }
// }

export default class ProdcutListPage {
  constructor($target) {
    this.$target = $target;
    
    const $page = document.createElement('div');
    $page.className = 'ProductListPage';
    $page.innerHTML = '<h1>상품 목록</h1>';
    this.render($page);
    
  }
  
  render($page) {
    this.$target.appendChild($page);
  }
}
import {reqProductList} from "../api/api.js"
import ProductList from "../components/ProductList.js"
// export default function ProdcutListPage($target) {
//   const $page = document.querySelector(".ProductListPage");

//   $page.innerHTML = `<h1>상품 목록</h1>`;

//   this.render = () => {
//     $target.append($page);
//   }
// }

export default class ProdcutListPage {
  constructor($target) {
    // setup
    this.$target = $target;

    // render
    const $page = document.createElement("div");
    $page.className = "ProductListPage";
    $page.innerHTML = "<h1>상품 목록</h1>";
    this.render($page);
    
    // api정보로 ProducList components 호출
    this.fetchProductList($page);
  }
  
  render($page) {
    this.$target.appendChild($page);
  }
  
  setState(nextState) {
    this.state = nextState
  }

  fetchProductList = async($page) => {
    const productListJson = await reqProductList(); // GET
    this.setState(productListJson); // state 변경
    
    // ProductList 호출
    new ProductList({$target: $page, state: this.state});
  }
}
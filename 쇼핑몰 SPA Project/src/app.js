import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";

export default class App {
  constructor($target) {
    this.$target = $target;
    console.log($target);
    // const $app = document.querySelector('.App');
    this.route($target);
  }
  
  route($target) {
    const { pathname } = location; // location오브젝트 존재값 바로 변수 설정 location.pathname과 같음
    if (pathname === "/") {
      new ProductListPage($target);
    } else if (pathname.indexOf("/products/") === 0){ 
      const [, , productId] = pathname.split('/');
      console.log(productId);
      new ProductDetailPage($target, productId);
    } else if(pathname === "/cart") {
      new CartPage($target);
    }
  }
}

new App();

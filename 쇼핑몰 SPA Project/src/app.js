import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import { init } from '../public/routes/router.js'

export default class App {
  constructor($target) {
    this.$target = $target;

    this.route = () => {
      const { pathname } = location; // location오브젝트 존재값 바로 변수 설정 location.pathname과 같음
      if (pathname === "/") {
        new ProductListPage($target);
      } else if (pathname.indexOf("/products/") === 0){ 
        const [, , productId] = pathname.split('/');
        new ProductDetailPage($target, productId);
      } else if(pathname === "/cart") {
        new CartPage($target);
      }
    }

    //  ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수 호출
    init(this.route, this.$target);
    this.route();
    window.addEventListener('popstate', this.route);
    // window.onbeforeunload = () => {
    //   init(this.ronte, this.$target);
    // }
  }
}

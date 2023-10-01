import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import { init } from '../router.js'

/*
  constructor($target) {
    this.$target = $target;
    //  ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수 호출
    // init(this.route, this.$target);
    init(this.route, this.$target);
    this.route(this.$target);
    
    // 뒤로가기, 앞으로가기 발생 시 popstate 이벤트가 발생
    window.addEventListener('popstate', this.route);
  }
  
  route($target) {
    console.log($target);
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
*/
export default class App {
  constructor($target) {
    this.$target = $target;

    this.ronte = () => {
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
    init(this.ronte, this.$target);
    this.ronte();
    window.addEventListener('popstate', this.ronte);
    // window.onbeforeunload = () => {
    //   init(this.ronte, this.$target);
    // }
  }
}

import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";

class App {
  constructor() {
    const $app = document.querySelector('.App');
    console.log($app);
    this.route($app);
  }
  
  route($app) {
    const { pathname } = location;
    console.log(pathname);
    if (pathname === "/") {
      new ProductListPage($app);
    } else if (pathname.indexOf("/products/") === 0){ 
      const [, , productId] = pathname.split('/');
      console.log(productId);
      new ProductDetailPage($app, productId);
    } else if(pathname === "/cart") {
      console.log(pathname);
      new CartPage($app);
    }
  }
}

new App();

import {reqProduct} from "../apis/api.js";
import ProductDetail from "../components/ProductDetail.js";

export default class ProductDetailPage {
  constructor($target, productId) {
    // setup
    this.state = {productId, product: null}
    this.$target = $target;
    this.productId = productId;
    
    // api - loading을 위한 setTimeout
    // setTimeout(() => {
    //   this.fetchProductInfo()}, 2000);
    this.fetchProductInfo();

    // render
    this.render();
  }
  
  render() {
    if (!this.state.product) { // 처음 render 시 api전 호출전
      this.$target.innerHTML = 'Loading..';
    } else { 
      this.$target.innerHTML = ``;
      const $page = document.createElement("div");
      $page.className = "ProductDetailPage";
      $page.innerHTML = `<h1>${this.state.product.name} 상품 정보</h1>`;

      this.$target.appendChild($page);

      // ProductDettail호출
      new ProductDetail({
        $target: $page, 
        state: { product: this.state.product, selectedOptions: [] }
      });
    }
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }

  fetchProductInfo = async() => {
    const productInfoJson = await reqProduct(this.productId); // GET Product Info
    this.setState({ product: productInfoJson });
  }
}

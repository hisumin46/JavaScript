/*
<div class="Cart">
  <ul>
    <li class="Cart__item">
      <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
      <div class="Cart__itemDesription">
        <div>커피잔 100개 번들 10,000원 10개</div>
        <div>100,000원</div>
      </div>
    </li>
    <li class="Cart__item">
      <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
      <div class="Cart__itemDesription">
        <div>커피잔 1000개 번들 15,000원 5개</div>
        <div>75,000원</div>
      </div>
    </li>
  </ul>
  <div class="Cart__totalPrice">
    총 상품가격 175,000원
  </div>
  <button class="OrderButton">주문하기</button>
</div>
*/

import { routeChange } from "../../public/routes/router.js";
import { storageUtil } from "../../utils/storage.js";
import { reqProduct } from "../apis/api.js";
import Cart from "../components/Cart.js";

export default class CartPage {
  constructor($target) {
    this.$target = $target;

    const storageObject = new storageUtil;
    const cartData = storageObject.getItem('products_cart');
    this.setState({product: cartData});

    this.fetchCartProducInfo();
  }
  
  render() {
    if (this.state.product.length === 0) {
      console.log("sss");
      alert('장바구니가 비어있습니다.');
      routeChange('/');
    } else {
      this.$target.innerHTML = "";
      const $page = document.createElement("div");
      $page.className = "CartPage";
      $page.innerHTML = "<h1>장바구니</h1>";
      this.$target.appendChild($page);
      
      new Cart({$target: $page, state: this.state});
    }
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }

  fetchCartProducInfo = async() => {
    // GET Cart Product Info 
    const product = await Promise.all(this.state.product.map(async (cartProduct) => { // promis 한번에 여러개 쓰기
      const productInfo = await reqProduct(cartProduct.productId);
      const optionInfo = productInfo.productOptions.find(option => option.id === cartProduct.optionId);
      return {
        imageUrl: productInfo.imageUrl,
        productName: productInfo.name,
        quantity: cartProduct.quantity,
        productPrice: productInfo.price,
        optionName: optionInfo.name,
        optionPrice: optionInfo.price
      };
    }));
    this.setState({ product: product });
  }
}
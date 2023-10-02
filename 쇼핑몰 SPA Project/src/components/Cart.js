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

export default class Cart {
  constructor({$target, state}) {
    this.$target = $target;
    this.state = state;

    this.setState({products: this.state});
  }

  template() {
    const getTotalPrice = () => {
      return this.state.product.reduce((acc, option) => acc + ((option.productPrice + option.optionPrice) * option.quantity), 0);
    }

    const $cart = document.createElement("div");
    $cart.className = "Cart";
    $cart.innerHTML = `
      <ul>
      ${this.state.product.map(productInfo => `
        <li class="Cart__item">
          <img src="${productInfo.imageUrl}">
          <div class="Cart__itemDesription">
            <div>${productInfo.productName} ${productInfo.optionName} ${productInfo.quantity}개</div>
            <div>${(productInfo.productPrice + productInfo.optionPrice)*productInfo.quantity}원</div>
          </div>
        </li> 
        `).join("")}
      </ul>
      <div class="Cart__totalPrice">
        총 상품가격 ${getTotalPrice()}원
      </div>
      <button class="OrderButton">주문하기</button>         
    `;
    return $cart;
  }

  render() {
    this.$target.appendChild(this.template());
    this.setEvent();
    
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }

  setEvent() {
    this.$target.querySelector(".OrderButton").addEventListener("click", () => {
      alert('주문 되었습니다!');
      const storageObject = new storageUtil;
      storageObject.removeItem('products_cart');
      routeChange('/');
    })
  }
}
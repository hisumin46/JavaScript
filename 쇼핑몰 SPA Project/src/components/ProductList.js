/*
<ul>
  <li class="Product">
    <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
    <div class="Product__info">
      <div>커피잔</div>
      <div>10,000원~</div>
    </div>
  </li>
</ul>`

  {
    "id": 1,
    "name": "커피 컵",
    "imageUrl": "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png",
    "price": 10000
  },

*/

import { routeChange } from "../../router.js"

export default class ProductListPage {
  constructor({ $target, state }) {
    //setup
    this.$target = $target;
    this.state = state;

    // state
    this.setState(this.state);
  }

  template() {
    const $productListUl = document.createElement("ul");
    const productInfo = this.state;

    $productListUl.innerHTML = `
      ${productInfo.map(product =>
        `
          <li class="Product" data-id="${product.id}">
            <img src="${product.imageUrl}">
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price}~</div>
            </div>
          </li>
        `
      ).join("")}`;
    return $productListUl;
  }

  render() {
    if (!this.state) return;
    this.$target.appendChild(this.template());
    this.setEvent();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  setEvent() {
    this.$target.addEventListener("click", e => {
    // $productListUl.addEventListenerㅇ"click", e => {
    const $li = e.target.closest("li");
      const productId = $li.dataset.id;
      
      // routeChange 로 url 변경
      if (productId) routeChange(`/products/${productId}`);
    })
  }
}

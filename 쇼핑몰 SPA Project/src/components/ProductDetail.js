/*
<div class="ProductDetailPage">
  <h1>커피잔 상품 정보</h1>

  <div class="ProductDetail">
    <img
      src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
    />
    <div class="ProductDetail__info">
      <h2>커피잔</h2>
      <div class="ProductDetail__price">10,000원~</div>
      <select>
        <option>선택하세요.</option>
        <option>100개 번들</option>
        <option>1000개 번들(+5,000)</option>
      </select>
      <div class="ProductDetail__selectedOptions">
        <h3>선택된 상품</h3>

        <ul>
          <li>
            커피잔 100개 번들 10,000원
            <div><input type="number" value="10" />개</div>
          </li>
          <li>
            커피잔 1000개 번들 15,000원
            <div><input type="number" value="5" />개</div>
          </li>
        </ul>
        <div class="ProductDetail__totalPrice">175,000원</div>

        <button class="OrderButton">주문하기</button>
      </div>
    </div>
  </div>
</div>
  

  {
  "id": 1,
  "name": "커피 컵",
  "price": 10000,
  "imageUrl": "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png",
  "productOptions": [
    {
      "id": 1,
      "name": "100개 묶음",
      "price": 0,
      "stock": 5,
      "created_at": "2021-08-23T22:52:17.634Z",
      "updated_at": "2021-08-23T22:52:17.638Z"
    },
    {
      "id": 2,
      "name": "200개 묶음",
      "price": 8000,
      "stock": 5,
      "created_at": "2021-08-23T22:52:34.248Z",
      "updated_at": "2021-08-23T22:52:34.252Z"
    },
    {
      "id": 24,
      "name": "10개 묶음",
      "price": 0,
      "stock": 555,
      "created_at": "2021-08-23T23:03:04.873Z",
      "updated_at": "2021-08-23T23:03:04.879Z"
    }
  ]
}
*/

import SelectOPtion from "./SelectOption.js";

export default class ProductDetail{
  constructor({$target, state}) {
    //setup
    this.$target = $target;
    this.state = state;
    this.isInit = true;

    // setState
    this.setState(this.state);
  }

  template() {
    const productInfo = this.state.product;
    const $productDiv = document.createElement("div");
    $productDiv.className = "ProductDetail";
    $productDiv.innerHTML = `
      <img src="${productInfo.imageUrl}" />
      <div class="ProductDetail__info">
        <h2>${productInfo.name}</h2>
        <div class="ProductDetail__price">${productInfo.price}원~</div>
        <select>
        <option>선택하세요.</option>
        ${productInfo.productOptions.map(option => 
          `<option value=${option.id} ${(option.stock === 0)?"disabled":""}>
            ${(option.stock === 0)?"품절":""} ${productInfo.name} ${option.name} ${(option.price > 0)?`(+${option.price}원)`:""}
          </option>`
        ).join("")}
        </select>
        <div class="ProductDetail__selectedOptions">
        </div>
      </div>
    `;

    
    return $productDiv;
  }
  
  render() {
    if (this.isInit) this.$target.appendChild(this.template());
    this.isInit = false;
    this.setEvent();

    // selecOption components
    new SelectOPtion({$target: this.$target.querySelector(".ProductDetail__selectedOptions"), state: this.state});
  }
  
  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }

  setEvent() {
    this.$target.addEventListener("change", e => {
      if (e.target.tagName === "SELECT") { // option 선택시
        const selectOptionId = parseInt(e.target.value);
        const option = this.state.product.productOptions.find(option => option.id === selectOptionId);
        // 이미 선택한 option
        const selectOption = this.state.selectedOptions.find(selectObject => selectObject.optionId === selectOptionId);

        if (option && !selectOption) {
          const selectOptionInfo = {
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1
          }
          
          // state 변경
          this.setState({selectedOptions: [...this.state.selectedOptions, selectOptionInfo]});
        }
      }
    });
  }
}

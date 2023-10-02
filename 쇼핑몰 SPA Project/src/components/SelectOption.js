/*
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

[
  {
    productId: "상품 id",
    optionId: "선택한 옵션의 id",
    quantity: "선택한 수량"
  }
]
*/

import { routeChange } from "../../public/routes/router.js";
import { storageUtil } from "../../utils/storage.js";
import ProductDetail from "./ProductDetail.js";

export default class SelectOPtion {
  constructor({$target, state}) {
    //setup
    this.$target = $target;
    this.state = state;
    
    // setState
    this.setState(this.state);
  }

  template() {
    // template의 내부함수로 가격의 총합을 구함
    const getTotalPrice = () => {
      const { price: productPrice } = this.state.product;
      
      return this.state.selectedOptions.reduce((acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity), 0);
    }
    
    // state 값이 있을때 
    const {product, selectedOptions=[]} = this.state;
    let $selectedOptionsTag;
    
    if (product && selectedOptions) {
      $selectedOptionsTag = `
        <h3>선택된 상품</h3>
        <ul>
          ${selectedOptions.map(selectedOption => `
            <li>
              ${selectedOption.optionName} ${product.price + selectedOption.optionPrice}원
              <input type="text" data-optionId="${selectedOption.optionId}" value="${selectedOption.quantity}">
              <button class="CancelButton">X</button>
            </li>
          `).join('')}
        </ul>
        <div class="ProductDetail__totalPrice">${getTotalPrice()}원</div>
        <button class="OrderButton">주문하기</button>
      `;
    }

    return $selectedOptionsTag;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }

  setEvent() {
    // input 타입으로 render 
    this.$target.addEventListener("change", (e) => {
      // input이 변경될때만
      if (e.target.tagName === "INPUT") {
        const quantity = parseInt(e.target.value);
        const {product, selectedOptions=[]} = this.state;
        
        if (typeof quantity === 'number' && selectedOptions.length != 0) { // 값이 number이며 selectedOptions이 값이 있을때
          const optionId = parseInt(e.target.dataset.optionid);

          // 번경한 input의 selectedOptions[index] 값
          const index = selectedOptions.findIndex(chageInput => chageInput.optionId === optionId);
          if (index === -1 ) return; // stated에 input 값이 없는 경우 바로 리턴
          
          // 변경한 input의 product.productOptions option 데이터
          const option = product.productOptions.find(chageOption => chageOption.id === optionId);

          // state의 input 입력값이 재고보다 많으면 재고값으로
          selectedOptions[index].quantity = (option.stock >= quantity)?quantity:option.stock;
          
          // 변경된 selectOptions 값 setState로 render
          this.setState({selectedOptions: selectedOptions});
        }
      }
    })
    
    // 주문하기 버튼 클릭시
    this.$target.querySelector(".OrderButton").addEventListener("click", () => {
        const { selectedOptions } = this.state;
        // localstroge 처리
        const storageObject = new storageUtil;
        // 장바구니에 있는 값가져오기
        const cartList = storageObject.getItem("products_cart");
        
        // 기존 데이터와 새로운 데이터 합치기
        storageObject.setItem("products_cart", 
          cartList.concat(selectedOptions.map(option => ({
            productId: option.productId,
            optionId: option.optionId,
            quantity: option.quantity
          })))
        );
        routeChange("/cart");
    })

    // 선택한 option 삭제
    this.$target.addEventListener("click", (e) => {
      if (e.target.className === "CancelButton") {
        // this.$target.querySelector(".CancelButton").addEventListener("click", (e) => {
          const optionId = e.target.previousElementSibling.dataset.optionid;
          const $targetLi = e.target.closest("li");
          $targetLi.remove();
          const newSelectOptions = this.state.selectedOptions.filter(option => option.optionId != optionId);
    
          this.setState({selectedOptions: newSelectOptions});
          // 상위 컴포넌트의 상태를 변경해야됨 - 삭제한 option의 상태를 전달하여 삭제한 option 선택시 다시 선택할 수 있도록 
          // new ProductDetail().setState({selectedOptions: newSelectOptions});
      }
      

      
    })
  }
}

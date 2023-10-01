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
*/

export default class SelectOPtion {
  constructor({$target, state}) {
    //setup
    this.$target = $target;
    this.state = state;
    
    // setState
    this.setState(this.state);
  }

  template() {
    const getTotalPrice = () => {
      const { price: productPrice } = this.state.product;

      return this.state.selectedOptions.reduce((acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity), 0);
    }

    const {product, selectedOptions=[]} = this.state;
    let selectedOptionsTag;
    if (product && selectedOptions) {
      debugger;
      selectedOptionsTag = `
        <h3>선택된 상품</h3>
        <ul>
          ${selectedOptions.map(selectedOption => `
            <li>
              ${selectedOption.optionName} ${product.price + selectedOption.optionPrice}원
              <input type="text" data-optionId="${selectedOption.optionId}" value="${selectedOption.quantity}">
            </li>
          `).join('')}
        </ul>
        <div class="ProductDetail__totalPrice">${getTotalPrice()}원</div>
        <button class="OrderButton">주문하기</button>
      `;
    }

    return selectedOptionsTag;
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
    this.$target.addEventListener("change", e => {
      if (e.target.tagName === "INPUT") {
        const quantity = parseInt(e.target.value);
        const {product, selectedOptions} = this.state;

        if (typeof quantity === 'number' && selectedOptions.length != 0) {
          const optionId = parseInt(e.target.dataset.optionid);
          // 변경된 input의 option과 index 값
          const index = selectedOptions.findIndex(chageInput => chageInput.optionId === optionId);
          const option = product.productOptions.find(chageOption => chageOption.id === optionId);
          
          // input 입력값이 재고보다 많으면 재고값으로
          selectedOptions[index].quantity = (option.stock >= quantity)?quantity:option.stock;
          this.setState({selectedOptions: selectedOptions});
        }
      }
    })
  }
}

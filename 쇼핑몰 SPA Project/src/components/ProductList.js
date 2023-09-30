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

export default class ProductListPage {
  constructor({ $target, state }) {
    console.log($target);
    //setup
    this.$target = $target;
    this.state = state;

    // state
    this.setState(this.state);

    // render
    this.render();
  }

  template() {
    const $productListUl = document.createElement("ul");
    
    const productInfo = this.state;
    productInfo.map(product => {
      const $productListli = document.createElement("li");
      const child =
      `<li class="Product">
        <img src="${product.imageUrl}">
        <div class="Product__info">
          <div>${product.name}</div>
          <div>${product.price}~</div>
        </div>
      </li>`;
      
      $productListli.innerHTML = child;
      $productListUl.appendChild($productListli);
    }).join('');
    
    return $productListUl;
  }

  render() {
    debugger;
    this.$target.appendChild(this.template());
  }

  setState(nextState) {
    this.state = nextState
    this.render();
  }
}

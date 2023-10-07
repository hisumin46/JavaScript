/*
  <div class="content_title">
    <h1> CardView / Hello, GreatPeoPle!</h1>
  </div>
*/

export default class ContentTitle {
  constructor($target, state) {
    this.$target = $target;
    this.setState(state);
  }

  render() {
    const $div = document.createElement("div");
    $div.classList.add("content_title");
    $div.innerHTML = `<h1>${this.state}</h1>`;
    this.$target.appendChild($div);
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }
}